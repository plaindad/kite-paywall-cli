# kite-paywall-cli

`kite-paywall` is a deliberately small operator tool for preparing and checking x402 paywall descriptors before wiring them into an HTTP service.

## Commands

```bash
npm install
npm test
npm run build
node dist/cli.js check examples/weather.json
node dist/cli.js response examples/weather.json
```

`check` validates the descriptor and `response` prints the JSON shape for a `402 Payment Required` response. The CLI does not hold keys or attempt settlement; it keeps configuration review separate from payment execution.
# Kite Paywall CLI

`amount` uses the asset's atomic unit and must be a positive integer string. For
example, use `1500000` rather than a decimal display value when defining a
payment requirement.
