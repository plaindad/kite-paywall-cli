export type Paywall = {
  resource: string;
  description: string;
  network: string;
  asset: string;
  amount: string;
  payTo: `0x${string}`;
  maxTimeoutSeconds: number;
};

export function validatePaywall(value: unknown): Paywall {
  if (!value || typeof value !== "object") throw new Error("paywall must be an object");
  const p = value as Record<string, unknown>;
  const required = ["resource", "description", "network", "asset", "amount", "payTo"];
  for (const key of required) if (typeof p[key] !== "string" || !p[key]) throw new Error(`${key} is required`);
  if (!/^0x[0-9a-fA-F]{40}$/.test(p.payTo as string)) throw new Error("payTo must be an EVM address");
  if (!/^[1-9]\d*$/.test(p.amount as string)) throw new Error("amount must be a positive atomic-unit integer");
  const timeout = p.maxTimeoutSeconds ?? 300;
  if (!Number.isInteger(timeout) || (timeout as number) <= 0) throw new Error("maxTimeoutSeconds must be positive");
  return { resource: p.resource as string, description: p.description as string, network: p.network as string, asset: p.asset as string, amount: p.amount as string, payTo: p.payTo as `0x${string}`, maxTimeoutSeconds: timeout as number };
}

export function paymentRequired(paywall: Paywall): { status: 402; headers: Record<string, string>; body: Paywall } {
  return { status: 402, headers: { "content-type": "application/json", "x-payment-required": "true" }, body: paywall };
}

export function describePaywall(paywall: Paywall): string {
  return `${paywall.resource} → ${paywall.amount} on ${paywall.network} (timeout ${paywall.maxTimeoutSeconds}s)`;
}
