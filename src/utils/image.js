const pad = (value) => String(value).padStart(2, "0");

// Hami-Image-20260926-153045.jpg
function buildFileName(mimeType) {
    const now = new Date();
    const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
    const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const extension = mimeType === "image/png" ? "png" : "jpg";
    return `Hami-Image-${date}-${time}.${extension}`;
}

// `url` may be an object URL or a data URL.
export function downloadImage(url, mimeType = "image/jpeg") {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = buildFileName(mimeType);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function getDataUrlMimeType(dataUrl) {
    return /^data:([^;,]+)/.exec(dataUrl)?.[1] ?? "image/jpeg";
}

export function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
