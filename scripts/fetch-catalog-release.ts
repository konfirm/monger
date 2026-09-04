// Fetches the latest mongo-catalog release and vendors it into
// source/Test/catalog/*.json — committed, not fetched live at test time, so
// running tests never needs network access or a second repo checked out.
// Re-run this manually whenever you want to pick up new ground truth; the
// diff it produces is the record of what changed.

import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { readdir, rm, mkdir, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';

const REPO = 'rspieker/mongo-catalog';
const ASSET = 'catalog-release.tar.gz';
const vendorDir = resolve(__dirname, '..', 'source', 'Test', 'catalog');

async function main(): Promise<void> {
	const workDir = mkdtempSync(join(tmpdir(), 'mongo-catalog-'));

	try {
		console.log(`Fetching latest release from ${REPO}...`);
		execSync(`gh release download --repo ${REPO} --pattern '${ASSET}' --dir ${workDir} --clobber`, {
			stdio: 'inherit',
		});
		execSync(`tar -xzf ${join(workDir, ASSET)} -C ${workDir}`);

		await rm(vendorDir, { recursive: true, force: true });
		await mkdir(vendorDir, { recursive: true });

		const files = (await readdir(workDir)).filter((f) => f.endsWith('.json'));
		for (const file of files) {
			await copyFile(join(workDir, file), join(vendorDir, file));
		}

		console.log(`Vendored ${files.length} catalog files into ${vendorDir}`);
	} finally {
		rmSync(workDir, { recursive: true, force: true });
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
