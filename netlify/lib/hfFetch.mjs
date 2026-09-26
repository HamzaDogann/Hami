import { Agent, fetch as undiciFetch } from "undici";

// Node waits 10 s per attempt for a TCP connection. Some networks drop connections to individual
// Hugging Face (CloudFront) IPs, so a short connect timeout lets a retry reach another IP quickly.
const CONNECT_TIMEOUT_MS = 4000;

const dispatcher = new Agent({ connect: { timeout: CONNECT_TIMEOUT_MS } });

export const hfFetch = (url, init) => undiciFetch(url, { ...init, dispatcher });
