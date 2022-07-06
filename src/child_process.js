import child_process from 'child_process';
import promisify from './promisify.js';

export const exec = promisify(child_process.exec);
