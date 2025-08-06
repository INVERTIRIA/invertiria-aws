import { stepsQuestions } from "..";

export function decodeJWT(token) {
  const [_header, payload, _signature] = token.split(".");
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
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function determineSkippedQuestions(steps) {
  const skippedQuestions = new Set();

  for (const step of steps) {
    const { questions } = stepsQuestions.find((q) => q.step == step);

    for (const question of questions) {
      skippedQuestions.add(question);
    }
  }

  return Array.from(skippedQuestions);
}

export function formatCurrencyInput(field) {
  return (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    if (/^\d*$/.test(raw)) {
      field.onChange(Number(raw)); // actualiza el valor limpio en el form
    }
  };
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function formatFileSize(sizeInBytes) {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
}
