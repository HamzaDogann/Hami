// Image AI Configuration

// .env dosyanızdaki Hugging Face API token'ı
// (VITE_ARTPLES_API veya VITE_HF_API_TOKEN gibi bir isim kullanabilirsiniz)
const API_TOKEN = import.meta.env.VITE_FLUX_API; // veya VITE_ARTPLES_API FLUX OLMALI

// Replicate üzerinden kullanılacak modelin tam yolu
const REPLICATE_MODEL_PATH = "black-forest-labs/flux-dev";

async function runImage(prompts, quality, style) {
    // Replicate API'sine sorgu yapacak iç fonksiyon
    async function queryReplicate(data) {
        if (!API_TOKEN) {
            console.error("Hugging Face API Token (API_TOKEN) is not set in .env file!");
            throw new Error("API Token not configured.");
        }

        const endpoint = `https://router.huggingface.co/replicate/v1/models/${REPLICATE_MODEL_PATH}/predictions`;
        console.log("Sending request to Replicate endpoint:", endpoint);
        console.log("Payload:", JSON.stringify(data, null, 2));

        const response = await fetch(
            endpoint,
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json", // JSON gönderdiğimiz için bu header önemli
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Replicate API Error Response Text:", errorText);
            // Olası durumlar için daha detaylı hata mesajları eklenebilir.
            // Örneğin, Replicate'ten gelen spesifik hata kodları veya mesajları parse edilebilir.
            throw new Error(`Replicate API request failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        // Önemli Not: Replicate'in /predictions endpoint'i genellikle hemen bir resim blob'u döndürmez.
        // Standart Replicate akışı şöyledir:
        // 1. POST /predictions -> Yanıtta bir prediction ID'si ve durumu (örn: "starting", "processing") alınır.
        // 2. GET /predictions/{id} -> Periyodik olarak bu endpoint sorgulanarak durum takip edilir.
        // 3. Durum "succeeded" olduğunda, yanıtta output (genellikle resim URL'leri) bulunur.
        // 4. Bu URL'lerden resimler ayrıca fetch edilir.
        //
        // Ancak, Hugging Face'in `router.huggingface.co/replicate/...` endpoint'i bu süreci soyutlayıp
        // doğrudan sonucu (veya hata durumunda hatayı) döndürüyor OLABİLİR.
        // Senin verdiğin `response.blob()` örneği bunu ima ediyor.
        // Eğer bu endpoint senkron çalışıp doğrudan blob dönüyorsa, aşağıdaki kod doğrudur.
        // Eğer asenkron çalışıyorsa (yani önce bir ID dönüp sonra sorgulamak gerekiyorsa),
        // bu `queryReplicate` fonksiyonunun tamamen yeniden yazılması gerekir.
        // Şimdilik senin örneğindeki gibi doğrudan blob beklediğini varsayıyorum.
        const result = await response.blob();
        return result;
    }

    // Stilleri ve kaliteyi prompt'a ekleyelim.
    // FLUX modelinin bu eklemeleri nasıl yorumladığına bağlı olarak
    // bu kısım veya payload yapısı değişebilir.
    let finalPrompt = prompts;
    if (style && style.trim() !== "") {
        finalPrompt += `, ${style}`;
    }
    if (quality && quality.trim() !== "") {
        // Modelin "high quality" gibi ifadeleri mi, yoksa özel parametreleri mi
        // (örn: quality: 0.9) tercih ettiğini bilmek gerekir.
        // Şimdilik metin olarak ekliyoruz.
        finalPrompt += `, ${quality} quality`;
    }

    // Replicate için beklenen payload yapısı
    // Örnekte prompt değeri ekstra tırnaklar içindeydi: "\"Astronaut...\""
    // Bu genellikle prompt'un kendisinin de tırnak işaretleri içermesi istendiğinde olur.
    // Eğer sadece string bir prompt ise, doğrudan `finalPrompt` yeterli olmalı.
    // Şimdilik senin örneğindeki gibi (`"\"...\""`) değil, doğrudan string olarak gönderiyoruz.
    // Eğer hata alırsan, `prompt: JSON.stringify(finalPrompt)` veya `prompt: \`"${finalPrompt.replace(/"/g, '\\"')}"\``
    // gibi bir deneme yapabilirsin, ama bu genellikle gereksizdir.
    const payload = {
        input: {
            prompt: finalPrompt,
            // FLUX modelinin Replicate üzerinde desteklediği diğer parametreler varsa
            // buraya eklenebilir. Örneğin:
            // width: 1024,
            // height: 1024,
            // num_inference_steps: 20,
            // guidance_scale: 7.5,
            // Bu parametreler modelin Replicate sayfasındaki API dökümantasyonunda bulunur.
        },
        // Bazı Replicate modelleri webhook veya stream gibi ek seçenekler sunabilir.
        // webhook: "YOUR_WEBHOOK_URL",
        // stream: true
    };

    try {
        return await queryReplicate(payload);
    } catch (error) {
        console.error("Error in runImage calling queryReplicate:", error);
        // Hatanın yukarıya tekrar fırlatılması, çağıran kodun da haberdar olmasını sağlar.
        throw error;
    }
}

export default runImage;

// Örnek Kullanım (React bileşeni içinde veya başka bir yerde):
/*
async function handleGenerateImage() {
    try {
        const imageBlob = await runImage("A beautiful sunset over mountains", "high", "photorealistic");
        const imageUrl = URL.createObjectURL(imageBlob);
        // imageUrl'ı bir <img> etiketinin src'sine ata
        console.log("Generated image URL:", imageUrl);
    } catch (error) {
        console.error("Failed to generate image:", error);
        // Kullanıcıya hata mesajı göster
    }
}
*/
