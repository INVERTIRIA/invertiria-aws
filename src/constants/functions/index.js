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

// Función para obtener la ubicación a partir de lat/lng
export async function getLocation(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;

  const headers = {
    "User-Agent": "invertira/1.0 (libardo@invertira.com)",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const locationData = data.features[0].properties.geocoding;
      return getLocationLevels(locationData);
    } else {
      console.warn("No se encontraron features en la respuesta");
      return {};
    }
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
}

// Función para determinar niveles de ubicación
function getLocationLevels(location) {
  console.log(location);

  const levels = {
    city: location.city || location.state,
    zone: null,
    subzone: null,
  };

  // Determinar la zona
  levels.zone =
    location.district || location.locality || location.street || location.name;

  // Determinar subzona
  if (levels.zone === location.district) {
    levels.subzone = location.locality || location.street || location.name;
  } else if (levels.zone === location.locality) {
    levels.subzone = location.street || location.name;
  } else {
    levels.subzone = null;
  }

  return levels;
}

export function getLocationGoogleMap(lat, lng) {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "OK") {
        console.log(data.results[0]); // Dirección más precisa
      } else {
        console.error("Error en geocoding:", data.status);
      }
    })
    .catch((err) => console.error(err));
}
