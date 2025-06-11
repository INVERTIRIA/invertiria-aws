export function decodeJWT(token) {
  const [header, payload, signature] = token.split(".");
  /* const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload; */

  // Base64URL → Base64
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  const decodedPayload = JSON.parse(atob(padded));
  return decodedPayload;
}

export function parsePrice(price) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(price);
}
