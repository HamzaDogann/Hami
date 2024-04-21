// Image AI Configuration

// Node.js and .env are important things but goal of this project is learning project management and provides product.
const API_TOKEN = "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";
async function runImage(prompts, quality, style) {
    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/Artples/LAI-ImageGeneration-vSDXL-2",
            {
                headers: { Authorization: `Bearer ${API_TOKEN}` },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.blob();
        return result;
    }

    const sendPrompts = `${prompts}, ${style} , ${quality} quality`;
    return query({ "inputs": sendPrompts });
}

export default runImage;