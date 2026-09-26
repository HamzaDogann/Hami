// All user-facing text. Both languages must define the same keys (checked by translations.test.js).
// To add a language: add another entry here and to SUPPORTED_LANGUAGES.

export const SUPPORTED_LANGUAGES = ["en", "tr"];
export const DEFAULT_LANGUAGE = "en";

export const translations = {
    en: {
        // Common
        next: "Next",
        hey: "Hey",
        confirmDelete: "Delete",
        cancel: "Cancel",
        close: "Close",
        deleteDone: "The deletion completed successfully",
        switchLanguage: "Switch to Turkish",

        // Login
        loginInfoTitle: "Text and Image Generator",
        loginInfoReady: "Are you ready for a great AI experience?",
        loginInfoStart: "Start by choosing a username and avatar",
        usernamePlaceholder: "Please choose a username",
        chooseUsernameAndAvatar: "Please choose a username and avatar",

        // Menu
        textGenerator: "Text Generator",
        imageGenerator: "Image Generator",

        // Text generator
        newChat: "New Chat",
        favorites: "Favorites",
        noFavoriteChats: "No favorite chats",
        deleteAll: "Delete All",
        deleteChatConfirm: "Are you sure to delete this chat?",
        deleteAllChatsConfirm: "Are you sure to delete all chats?",
        aiDisclaimer: "Hami can show false information about different topics, including people. So, check whether his answers are correct or not.",
        welcomeTitle: "You can try asking these questions with Hami,",
        suggestion1: "What are the features that come with React 19?",
        suggestion2: "Practical ideas to make that time management",
        suggestion3: "Create a document about useState",
        suggestion4: "10 people who shaped the world with their inventions",
        messagePlaceholder: "Write your message here...",
        thanksForContribution: "Thanks for your contribution",
        favChatAdded: "A new favorite chat has been added",

        // Image generator
        promptPlaceholder: "Write your request, keywords and your imagination here...",
        promptRequired: "Please input a prompt.",
        qualityLow: "Low",
        qualityMedium: "Medium",
        qualityHigh: "High",
        styleRealistic: "Realistic",
        styleCinematic: "Cinematic",
        styleOrigami: "Origami",
        styleAnimation: "Animation",
        styleCartoon: "Cartoon",
        stylePixelArt: "Pixel Art",
        style3D: "3D",
        generateImage: "Generate Image",
        generating: "Generating...",
        imagePreparing: "Your image is being prepared. The processing time may vary depending on system load.",
        downloadImage: "Download Image",
        downloaded: "Downloaded",
        saveInFavorites: "Save In Favorites",
        saved: "Saved",
        yourFavoriteImages: "Your Favorite Images",
        stockImage1: "A cute cat with big eyes showing its cute paws.",
        stockImage2: "A tropical island sunset, a large ship approaching, high details.",
        stockImage3: "Black motorcycle passing on a highway, sea in the background, cinematic angle, ultra realistic.",
        stockImage4: "Close-up astronaut looking towards the screen, very charismatic pose, high details.",

        // Favorite images
        favoriteImages: "Favorite Images",
        searchFavorites: "Search in favorites...",
        deleteAllImages: "Delete All Images",
        deleteAllImagesConfirm: "Are you sure to delete all favorites",
        deleteImage: "Delete Image",
        deleteImageConfirm: "Are you sure to delete this image",
        noFavoriteImages: "Not found favorite images",
        prompts: "Prompts",
        storageFull: "Browser storage is full. Delete some favorites and try again.",

        // AI errors
        errorQuota: "The monthly free AI quota has been used up. It renews next month.",
        errorRateLimit: "Too many requests right now. Please wait a moment and try again.",
        errorConfig: "The AI service is not configured correctly.",
        errorNetwork: "Could not reach the AI service. Check your internet connection and try again.",
        errorGeneric: "An error occurred. Please try again.",
    },

    tr: {
        // Common
        next: "İlerle",
        hey: "Selam",
        confirmDelete: "Onayla",
        cancel: "İptal et",
        close: "Kapat",
        deleteDone: "Silme işlemi başarıyla tamamlandı",
        switchLanguage: "İngilizceye geç",

        // Login
        loginInfoTitle: "Yazı ve Resim Üretici",
        loginInfoReady: "Harika bir yapay zeka deneyimine hazır mısın?",
        loginInfoStart: "Bir kullanıcı adı ve avatar seçerek başla",
        usernamePlaceholder: "Kullanıcı adı belirleyin",
        chooseUsernameAndAvatar: "Lütfen bir kullanıcı adı ve avatar belirleyin",

        // Menu
        textGenerator: "Yazı Üret",
        imageGenerator: "Resim Üret",

        // Text generator
        newChat: "Yeni Sohbet",
        favorites: "Favoriler",
        noFavoriteChats: "Favori konuşmalar yok",
        deleteAll: "Tümünü Sil",
        deleteChatConfirm: "Bu sohbeti silmek üzeresin",
        deleteAllChatsConfirm: "Bütün sohbetleri silmek üzeresin",
        aiDisclaimer: "Hami, kişiler de dahil olmak üzere farklı konular hakkında yanlış bilgiler gösterebilir. Bu nedenle, verdiği yanıtların doğru olup olmadığını kontrol edin.",
        welcomeTitle: "Hami ile bunları sormayı deneyebilirsin,",
        suggestion1: "React 19 ile gelen özellikler nelerdir?",
        suggestion2: "Zaman yönetimi yapmak için pratik fikirler",
        suggestion3: "useState hakkında bir döküman hazırla",
        suggestion4: "İcatları ile dünyaya yön veren 10 insan",
        messagePlaceholder: "Mesajınızı buraya yazın...",
        thanksForContribution: "Katkın için teşekkürler",
        favChatAdded: "Yeni bir favori sohbet eklendi",

        // Image generator
        promptPlaceholder: "Buraya isteğinizi, anahtar kelimeleri ve hayal gücünüzü yazın...",
        promptRequired: "Lütfen bir istemde bulunun",
        qualityLow: "Düşük",
        qualityMedium: "Orta",
        qualityHigh: "Yüksek",
        styleRealistic: "Gerçekçi",
        styleCinematic: "Sinematik",
        styleOrigami: "Origami",
        styleAnimation: "Animasyon",
        styleCartoon: "Karikatür",
        stylePixelArt: "Piksel",
        style3D: "3B",
        generateImage: "Resim Oluştur",
        generating: "Oluşturuluyor...",
        imagePreparing: "Resminiz hazırlanıyor, bu işlemin süresi sistemin yoğunluğuna göre değişiklik gösterebilir.",
        downloadImage: "Resmi İndir",
        downloaded: "Resmi İndirildi",
        saveInFavorites: "Favorilere Kaydet",
        saved: "Favorilere Eklendi",
        yourFavoriteImages: "Favori Resimleriniz",
        stockImage1: "Sevimli, patilerini gösteren büyük gözleri olan tatlı bir kedi.",
        stockImage2: "Tropikal bir ada gün batımı, büyük bir gemi yaklaşıyor, yüksek detaylar.",
        stockImage3: "Bir otobandan geçen siyah renkli motorsiklet, arka plan deniz, sinematik bir açı, ultra gerçekçi.",
        stockImage4: "Ekrana doğru bakan yakın çekim astronot, çok karizmatik bir poz, yüksek detaylar.",

        // Favorite images
        favoriteImages: "Favori Resimler",
        searchFavorites: "Favorilerde ara...",
        deleteAllImages: "Bütün Resimleri Sil",
        deleteAllImagesConfirm: "Bütün favoriler silinmek üzere",
        deleteImage: "Resmi Sil",
        deleteImageConfirm: "Bu resmi silmek üzeresin",
        noFavoriteImages: "Favori resim bulunamadı",
        prompts: "İstemler",
        storageFull: "Tarayıcı depolama alanı dolu. Bazı favorileri silip tekrar deneyin.",

        // AI errors
        errorQuota: "Aylık ücretsiz yapay zeka kotası doldu. Gelecek ay yenilenecek.",
        errorRateLimit: "Şu an çok fazla istek var. Lütfen biraz bekleyip tekrar deneyin.",
        errorConfig: "Yapay zeka servisi doğru yapılandırılmamış.",
        errorNetwork: "Yapay zeka servisine ulaşılamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.",
        errorGeneric: "Bir hata meydana geldi. Lütfen tekrar deneyin.",
    },
};

// Used by the chat/image AI clients: maps an AIError code to a translation key.
export function aiErrorKey(code) {
    switch (code) {
        case "quota":
            return "errorQuota";
        case "rate_limit":
            return "errorRateLimit";
        case "network":
            return "errorNetwork";
        case "auth":
        case "config":
            return "errorConfig";
        default:
            return "errorGeneric";
    }
}
