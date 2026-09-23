import test from "node:test";
import assert from "node:assert/strict";
import { paymentRequired, validatePaywall } from "../dist/model.js";

const valid = { resource: "https://example.test/x", description: "x", network: "kite-testnet", asset: "0x0", amount: "1", payTo: "0x02dbBD83A83d86Bc4DBBdcc42f25bC52AeCAC764" };
test("validates a paywall and applies the timeout default", () => assert.equal(validatePaywall(valid).maxTimeoutSeconds, 300));
test("rejects malformed recipient addresses", () => assert.throws(() => validatePaywall({ ...valid, payTo: "not-an-address" }), /EVM address/));
test("builds an explicit 402 response", () => assert.equal(paymentRequired(validatePaywall(valid)).status, 402));
