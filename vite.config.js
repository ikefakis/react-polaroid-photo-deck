import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(function (_a) {
    var command = _a.command;
    return ({
        base: command === 'build' ? '/react-polaroid-photo-deck/' : '/',
        plugins: [react()]
    });
});
