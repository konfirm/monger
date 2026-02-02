#!/usr/bin/env node
/**
 * Run intercepted test scenarios against MongoDB
 *
 * Usage:
 *   docker run -d --name mongo-test -p 27017:27017 mongo:7.0
 *   node scripts/run-against-mongodb.js test-data/intercepted/concat_arrays.json
 *   docker stop mongo-test && docker rm mongo-test
 */

const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.MONGO_TEST_DB || "monger_test";

async function runTestScenario(specFile) {
	const spec = JSON.parse(fs.readFileSync(specFile, "utf8"));
	const client = new MongoClient(MONGO_URI);
	let results = null;

	try {
		await client.connect();

		// Get MongoDB version
		const admin = client.db("admin");
		const buildInfo = await admin.command({ buildInfo: 1 });
		const mongoVersion = buildInfo.version;
		console.log(`Connected to MongoDB ${mongoVersion}`);

		const db = client.db(DB_NAME);

		results = {
			source: spec.source,
			mongoVersion: mongoVersion,
			executedAt: new Date().toISOString(),
			mongoUri: MONGO_URI.replace(/\/\/[^:]+:[^@]+@/, "//***:***@"), // Hide credentials
			operations: [],
			errors: [],
		};

		// Clean up any previous test data
		await db.dropDatabase();

		// Step 1: Setup - Create collections and insert documents
		console.log("Setting up test data...");
		for (const [collName, documents] of Object.entries(
			spec.state?.collections || {},
		)) {
			const collection = db.collection(collName);

			if (Array.isArray(documents) && documents.length > 0) {
				await collection.insertMany(documents);
				console.log(
					`  Inserted ${documents.length} documents into ${collName}`,
				);
			}
		}

		// Step 2: Execute operations
		console.log("Executing operations...");
		const aggregates =
			spec.sequence?.filter((s) => s.type === "aggregate") || [];

		for (const op of aggregates) {
			try {
				const collName =
					op.collection ||
					Object.keys(spec.state?.collections || {})[0];
				const collection = db.collection(collName);
				const pipeline = op.pipeline;

				console.log(`  Running aggregate on ${collName}...`);

				const startTime = Date.now();
				const result = await collection.aggregate(pipeline).toArray();
				const duration = Date.now() - startTime;

				results.operations.push({
					type: "aggregate",
					collection: collName,
					pipeline: pipeline,
					result: result,
					duration: duration,
					success: true,
				});

				console.log(
					`    ✓ ${result.length} documents returned (${duration}ms)`,
				);
			} catch (e) {
				results.operations.push({
					type: "aggregate",
					collection: op.collection,
					pipeline: op.pipeline,
					error: { message: e.message, code: e.code },
					success: false,
				});

				results.errors.push({
					operation: "aggregate",
					message: e.message,
				});

				console.log(`    ✗ Error: ${e.message}`);
			}
		}

		console.log(`\nCompleted ${results.operations.length} operations`);
		console.log(`Errors: ${results.errors.length}`);
	} catch (e) {
		console.error("Failed to connect or run tests:", e.message);
		if (!results) {
			results = {
				source: spec.source,
				mongoVersion: "unknown",
				error: e.message,
				operations: [],
				errors: [{ fatal: true, message: e.message }],
			};
		} else {
			results.errors.push({ message: e.message, fatal: true });
		}
	} finally {
		await client.close();
	}

	return results;
}

// Main
async function main() {
	const specFile = process.argv[2];
	const outputFile = process.argv[3];

	if (!specFile) {
		console.error(
			"Usage: node run-against-mongodb.js <spec-file> [output-file]",
		);
		console.error(
			"Example: node run-against-mongodb.js test-data/intercepted/concat_arrays.json results.json",
		);
		process.exit(1);
	}

	console.log(`Running: ${specFile}`);
	console.log(`MongoDB: ${MONGO_URI}`);
	console.log("");

	const results = await runTestScenario(specFile);
	const json = JSON.stringify(results, null, 2);

	if (outputFile) {
		fs.writeFileSync(outputFile, json);
		console.log(`\nResults saved to: ${outputFile}`);
	} else {
		console.log("\n--- RESULTS ---");
		console.log(json);
	}
}

main().catch(console.error);
