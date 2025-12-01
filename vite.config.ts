import { defineConfig } from 'vitest/config'
import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default mergeConfig(
  defineConfig({
    plugins: [react()],
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/vitest-setup.ts',
      // coverage: {
      //   reporter: ['text', 'json', 'html', 'json-summary'],
      // },
    },
  }),
)
