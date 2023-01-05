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
			port: Number(env.PORT || 3000),
		},
		plugins: [
			react(),
			pages({
				exclude: ['**/components/*.tsx'],
			}),
		],
		resolve: {
			alias: {
				'~': resolvePath('./src'),
				'@utils': resolvePath('./src/utils'),
				'@pages': resolvePath('./src/pages'),
				'@store': resolvePath('./src/store'),
				'@hooks': resolvePath('./src/hooks'),
				'@components': resolvePath('./src/components'),
				'@base': resolvePath('./src/components/base'),
			},
		},
	};
});
