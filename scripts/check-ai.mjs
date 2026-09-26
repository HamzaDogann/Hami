// Smoke test for the AI functions: `npm run check:ai`
// Reads HF_TOKEN from .env, calls the chat and image handlers directly and reports the result.
// Costs a fraction of a cent of the Hugging Face free credit (one short chat + one 512px image).
import { readFileSync, writeFileSync, existsSync } from "node:fs";

if (existsSync(".env")) {
    for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
        const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
        if (match && !line.trim().startsWith("#")) process.env[match[1]] ??= match[2];
    }
}

// The functions run on Netlify, where a global `Netlify.env` exists.
globalThis.Netlify = { env: { get: (key) => process.env[key] } };

const call = (handler, body) =>
    handler(new Request("http://localhost/fn", { method: "POST", body: JSON.stringify(body) }));

const { default: chat } = await import("../netlify/functions/chat.mjs");
const { default: image } = await import("../netlify/functions/image.mjs");

let failed = false;

console.log("Chat...");
let res = await call(chat, { prompt: "Türkiye'nin başkenti neresidir? Tek cümleyle cevapla.", language: "tr" });
let data = await res.json();
if (res.ok) console.log(`  OK (${data.model}): ${data.text}`);
else { failed = true; console.log(`  FAILED ${res.status}:`, data.error); }

console.log("Image...");
res = await call(image, { prompt: "a small red fox in a forest", quality: "Low", style: "Cartoon" });
if (res.ok) {
    const buffer = Buffer.from(await res.arrayBuffer());
    const file = `check-ai-output.${res.headers.get("content-type")?.includes("png") ? "png" : "jpg"}`;
    writeFileSync(file, buffer);
    console.log(`  OK (${(buffer.length / 1024).toFixed(0)} KB) saved to ${file}`);
} else {
    failed = true;
    console.log(`  FAILED ${res.status}:`, (await res.json()).error);
}

process.exit(failed ? 1 : 0);
