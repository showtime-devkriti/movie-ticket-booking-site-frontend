import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: "localhost",
  //   port: 5173,
  //   proxy: {
  //     "/socket.io": {
  //       target: "http://localhost:3000",
  //       ws: true
  //     }
  //   },
  //   hmr: {
  //     protocol: "ws",
  //     host: "localhost",
  //     port: 5173
  //   }
  // }
})
