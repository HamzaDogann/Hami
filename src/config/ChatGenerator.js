import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";


const API_KEY = import.meta.env.VITE_GEMINI_API;

// Kullanılacak modelin adı. Flash modeli için güncellendi.
// En güncel ve stabil Flash sürümünü kullanmak için "gemini-1.5-flash-latest" önerilir.
const MODEL_NAME = "gemini-2.0-flash"; // <--- DEĞİŞİKLİK BURADA

async function runChat(prompt) {
    try {
        // API anahtarı kontrolü (isteğe bağlı ama önerilir)
        if (!API_KEY) {
            console.error("API Anahtarı bulunamadı. Lütfen .env dosyasını kontrol edin.");
            return "Üzgünüm, yapılandırma hatası nedeniyle devam edilemiyor.";
        }

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const generationConfig = {
            temperature: 0.9, // Flash modeller genellikle daha düşük sıcaklıklarla da iyi çalışabilir, deneme yapabilirsiniz.
            topK: 1,          // Bu parametreler modele göre ayarlanabilir.
            topP: 1,
            maxOutputTokens: 2048, // Flash modellerin token limitleri farklı olabilir, dokümantasyonu kontrol edin.
        };

        // Güvenlik ayarları - Hassas içerikleri engellemek için.
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];

        // Sohbeti başlatıyoruz (geçmişi boş olarak başlatıyoruz, isteğe bağlı olarak doldurulabilir)
        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [
                // Örnek geçmiş girdisi:
                // {
                //   role: "user",
                //   parts: [{ text: "Merhaba" }],
                // },
                // {
                //   role: "model",
                //   parts: [{ text: "Merhaba! Size nasıl yardımcı olabilirim?" }],
                // },
            ],
        });

        // Kullanıcının prompt'unu gönderiyoruz.
        const result = await chat.sendMessage(prompt);
        const response = result.response;

        // Modelin cevabını metin olarak döndürüyoruz.
        // Cevap gelip gelmediğini kontrol etmek iyi bir pratiktir.
        if (response && response.text) {
             return response.text();
        } else {
             console.warn("Modelden geçerli bir metin yanıtı alınamadı:", response);
             return "Üzgünüm, modelden bir yanıt alamadım.";
        }

    } catch (error) {
        console.error("Gemini API ile iletişimde hata oluştu:", error);
        // Hata mesajını daha detaylı loglamak veya kullanıcıya göstermek faydalı olabilir.
        // Örneğin: console.error(error.message);
        // Belki de belirli API hatalarını yakalayıp farklı mesajlar verebilirsiniz.
        return "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
        // Veya hatayı yukarıya fırlatabilirsiniz: throw error;
    }
}

export default runChat;
