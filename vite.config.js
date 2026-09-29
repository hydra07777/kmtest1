import { defineConfig } from "vite";
import { resolve } from "node:path";

// Vite multi-pages : chaque HTML racine est une entrée indépendante.
// Chaque page peut avoir son entry CSS et son entry JS pour le code spécifique,
// et partager les styles/scripts communs via src/styles/ et src/scripts/.
export default defineConfig({
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:         resolve(__dirname, "index.html"),
        search:       resolve(__dirname, "search.html"),
        listing:      resolve(__dirname, "listing.html"),
        booking:      resolve(__dirname, "booking.html"),
        confirmation: resolve(__dirname, "confirmation.html")
      }
    }
  },
  server: {
    port: 4173,
    host: "127.0.0.1",
    open: false
  }
});