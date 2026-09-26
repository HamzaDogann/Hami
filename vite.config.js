import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import netlify from '@netlify/vite-plugin'

// https://vitejs.dev/config/
// The Netlify plugin serves netlify/functions during `npm run dev`, so the AI calls work locally too.
// Only functions are needed; the other emulations (edge functions need Deno and crash the dev server) are off.
const netlifyDevOptions = {
  edgeFunctions: { enabled: false },
  blobs: { enabled: false },
  database: { enabled: false },
  aiGateway: { enabled: false },
  images: { enabled: false },
  geolocation: { enabled: false },
  staticFiles: { enabled: false },
}

// Vite only exposes VITE_* variables, so the server-side HF_* values from .env are copied into
// process.env for the functions (they are never bundled into the browser code).
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'HF_')
  for (const [key, value] of Object.entries(env)) {
    process.env[key] ??= value
  }

  return {
    // Unit tests do not need the Netlify emulation.
    plugins: [react(), ...(process.env.VITEST ? [] : [netlify(netlifyDevOptions)])],
    test: {
      include: ['src/**/*.test.{js,jsx}', 'netlify/**/*.test.mjs'],
      // The first import of the lazy text page (markdown + syntax highlighter) is slow when tests run in parallel.
      testTimeout: 30000,
    },
  }
})
