/* eslint-disable import/no-extraneous-dependencies */

import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import pages from 'vite-plugin-pages';

const resolvePath = (pwd: string) => path.resolve(__dirname, pwd);

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		server: {
			port: Number(env.DEV_PORT || 3000),
		},
		build: {
			outDir: env.BUILD_DIR || 'dist',
		},
		plugins: [
			react(),
			pages({
<<<<<<< HEAD
				exclude: ['**/components/*.tsx'],
=======
				exclude: ['**/components/**/*'],
>>>>>>> main
			}),
		],
		resolve: {
			alias: {
				'@utils': resolvePath('./src/utils'),
				'@pages': resolvePath('./src/pages'),
				'@schemas': resolvePath('./src/schemas'),
				'@store': resolvePath('./src/store'),
				'@hooks': resolvePath('./src/hooks'),
				'@components': resolvePath('./src/components'),
				'@i18n': resolvePath('./src/i18n'),
				'~': resolvePath('./src'),
			},
		},
	};
});
