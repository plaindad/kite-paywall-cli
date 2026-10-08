import test from "node:test";
import assert from "node:assert/strict";
import { describePaywall, paymentRequired, validatePaywall } from "../dist/model.js";

const valid = { resource: "https://example.test/x", description: "x", network: "kite-testnet", asset: "0x0", amount: "1", payTo: "0x02dbBD83A83d86Bc4DBBdcc42f25bC52AeCAC764" };
test("validates a paywall and applies the timeout default", () => assert.equal(validatePaywall(valid).maxTimeoutSeconds, 300));
test("rejects malformed recipient addresses", () => assert.throws(() => validatePaywall({ ...valid, payTo: "not-an-address" }), /EVM address/));
test("rejects zero and decimal payment amounts", () => {
  assert.throws(() => validatePaywall({ ...valid, amount: "0" }), /positive atomic-unit integer/);
  assert.throws(() => validatePaywall({ ...valid, amount: "1.5" }), /positive atomic-unit integer/);
});
test("builds an explicit 402 response", () => assert.equal(paymentRequired(validatePaywall(valid)).status, 402));
test("describes the charge without exposing the recipient", () => assert.match(describePaywall(validatePaywall(valid)), /kite-testnet/));
