
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  build : {
    outDir: '../core/dist',
  },
  server: {
      host: '127.0.0.1',
      port: 3000,

    proxy: {
      '/base_url': {
          //  target: 'https://fullstack-forecast-forge-03fcfb305bcd.herokuapp.com',
          target: 'https://fullstack-forecast-forge-03fcfb305bcd.herokuapp.com',

           changeOrigin: true,
           secure: false,      
           rewrite: (path) => path.replace(/^\/api/, ''),
       }
  }
  },
  plugins: [react()],

})
