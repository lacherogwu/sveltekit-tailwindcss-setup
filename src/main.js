#!/usr/bin/env node

import { exec } from './child_process.js';
import { writeFile, readFile } from 'fs/promises';

function getStaticFilePath(path) {
	return new URL(`../static/${path}`, import.meta.url).pathname;
}

function installDependencies() {
	const command = 'npm install -D tailwindcss postcss autoprefixer svelte-preprocess';
	return exec(command);
}

function initTailwindCss() {
	const command = 'npx tailwindcss init tailwind.config.cjs -p';
	return exec(command);
}

async function rewriteStaticFile(filename, options = {}) {
	const { output = '.' } = options;

	const path = getStaticFilePath(filename);
	const content = await readFile(path, 'utf8');
	await writeFile(`${output}/${filename}`, content);
}

function createSvelteConfig() {
	return rewriteStaticFile('svelte.config.js');
}

function createTailwindConfig() {
	return rewriteStaticFile('tailwind.config.cjs');
}

function createCssFile() {
	return rewriteStaticFile('app.css', { output: './src' });
}

function createLayoutFile() {
	return rewriteStaticFile('__layout.svelte', { output: './src/routes' });
}

function main() {
	return Promise.all([installDependencies(), initTailwindCss(), createSvelteConfig(), createTailwindConfig(), createCssFile(), createLayoutFile()]);
}

await main();
console.log('Tailwindcss added successfully!');
