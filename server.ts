/* eslint-disable import/no-extraneous-dependencies */

import express from 'express';
import path from 'node:path';
import url from 'node:url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const resolvePath = (p: string) => path.resolve(__dirname, p);
const isTest = process.env.VITEST;
const isProduction = process.env.NODE_ENV === 'production';

interface TParams {
	hmrPort?: number;
	root?: string;
}
async function createServer(params?: TParams) {
	const hmrPort = params?.hmrPort;
	const root = params?.root ?? process.cwd();

	const app = express();

	const viteInstance = await createViteServer({
		appType: 'custom',
		root,
		logLevel: isTest ? 'error' : 'info',
		server: {
			middlewareMode: true,
			hmr: {
				port: hmrPort,
			},
			watch: {
				// During tests we edit the files too fast and sometimes chokidar
				// misses change events, so enforce polling for consistency
				usePolling: true,
				interval: 100,
			},
		},
	});

	// run on production
	if (isProduction) {
		app.use((await import('compression')).default());
		app.use(
			(await import('serve-static')).default(resolvePath('dist/client'), {
				index: false,
			}),
		);

		// run other than production
	} else {
		app.use(viteInstance.middlewares);
	}

	// app.use('*', async (req, res) => {});

	app.listen(Number(process.env.PORT || 3000));
}

createServer();
