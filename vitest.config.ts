import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        // Use jsdom environment for React component testing
        environment: 'jsdom',

        // Setup files to run before each test file
        setupFiles: ['./src/__tests__/setup.ts'],

        // Global test configuration
        globals: true,

        // Coverage configuration
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'src/__tests__/',
                '**/*.d.ts',
                '**/*.config.*',
                '**/mockData',
                'dist/'
            ],
            // Target coverage thresholds
            thresholds: {
                lines: 60,
                functions: 60,
                branches: 60,
                statements: 60
            }
        },

        // Include/exclude patterns
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: ['node_modules', 'dist', '.next'],

        // Test timeout
        testTimeout: 10000,
    },

    // Path aliases to match tsconfig.json
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})
