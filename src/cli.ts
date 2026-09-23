#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { paymentRequired, validatePaywall } from "./model.js";

function usage(): void { console.error("Usage: kite-paywall <check|response> <paywall.json>"); process.exit(2); }
const [command, file] = process.argv.slice(2);
if (!command || !file || !["check", "response"].includes(command)) usage();
try {
  const paywall = validatePaywall(JSON.parse(await readFile(file, "utf8")));
  if (command === "check") { console.log(`valid paywall: ${paywall.resource} (${paywall.network})`); }
  else console.log(JSON.stringify(paymentRequired(paywall), null, 2));
} catch (error) { console.error(`error: ${(error as Error).message}`); process.exit(1); }
