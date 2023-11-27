import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
// import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    chunkSplitPlugin({
      strategy: 'default',
      customSplitting: {
        // `react` and `react-dom` will be bundled together in the `react-vendor` chunk (with their dependencies, such as object-assign)
        'react-vendor': [/node_modules\/react/, /node_modules\/react-dom/],
        // Any file that includes `utils` in src dir will be bundled in the `utils` chunk
        'utils': [/src\/utils/],
        'antd-vendor': [/node_modules\/antd/],
        'vendors': [/node_modules/],
      }
    })
  ],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: (id) => {
  //         // 如果模块的路径是以/node_modules/开头的，说明它是一个第三方依赖
  //         if (id.startsWith(path.sep + 'node_modules' + path.sep)) {
  //           // 我们把模块的路径分割成数组，以/为分隔符
  //           const segments = id.split(path.sep)
  //           // 我们取出数组的第三个元素，它通常是包的名称，例如'react'或'antd'
  //           const name = segments[2].startsWith('@') ? segments[3] : segments[2]
  //           // 我们定义一个数组，用来存放我们想要打包到单独文件的包的名称
  //           const include = ['react', 'react-dom', 'antd'].map(name => name + '@')
  //           // 我们判断这个包的名称是否在我们的包含数组中，如果是的话，我们就返回包的名称，表示把它打包到对应的文件中，例如'react'或'antd'
  //           if (include.some(prefix => name.startsWith(prefix))) {
  //             return name
  //           }
  //           // 否则，我们就返回'vendor'，表示把它打包到'vendor'文件中
  //           return 'vendor'
  //         }
  //       }
  //     }
  //   }
  // },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
})
