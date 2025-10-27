import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { exec } from 'child_process';

// 커맨드라인 인자에서 --genSitemap 옵션이 있는지 확인
const shouldGenerateSitemap = process.argv.includes('--genSitemap');

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), {
    name: 'generate-sitemap-in-build',
    apply: 'build', // in build mode only
    closeBundle() {
      if (!shouldGenerateSitemap) return;
      console.log('[vite-plugin] --genSitemap detected. Running generateSitemap.js...');
      const scriptPath = path.resolve(__dirname, 'scripts/generateSitemap.js');
      exec(`node "${scriptPath}"`, (err, stdout, stderr) => {
        if (err) {
          console.error('[vite-plugin] Error running generateSitemap.js:', err);
          return;
        }
        if (stderr) {
          console.error('[vite-plugin] generateSitemap.js stderr:', stderr);
        }
        console.log(stdout);
      });
    },
  }],
})
