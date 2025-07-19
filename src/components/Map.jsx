import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Componentes
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const myIcon = new Icon({
  iconUrl: "/assets/images/location-marker.svg",
  iconSize: [38, 38],
});

// Mapa
function Map({ className, setValue, projectPosition = null, initialSearch }) {
  const { _t } = useTranslation();

  // Coordenadas iniciales (centro de Colombia)
  const initialPosition = [4.6415843, -74.0857995];

  const [position, setPosition] = useState(null);

  const [location, setLocation] = useState(null);
  const [_message, setMessage] = useState("");
  const [locationLevels, setLocationLevels] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(getLocationSearch, 1000);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (locationLevels) {
      setValue({
        ...locationLevels,
        latitud: position.lat,
        longitud: position.lng,
      });
    }
  }, [locationLevels]);

  useEffect(() => {
    if (projectPosition) {
      const timeout = setTimeout(() => setPosition(projectPosition), 1000);
      return () => clearTimeout(timeout);
    }
  }, [projectPosition]);

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between mb-5 font-normal text-gray-600"
          >
            {search?.slice(0, 45) ||
              initialSearch ||
              "Busca una ubicación (Bogotá o Medellín)"}
            <SearchIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[90vw] lg:w-[680px]">
          <Command>
            <CommandInput
              placeholder="Buscar..."
              onValueChange={(value) => setSearch(value)}
            />
            <CommandList>
              <CommandEmpty>
                Sin resultados (solo Bogotá o Medellín)
              </CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.properties.geocoding.label}
                    value={option.properties.geocoding.label}
                    onSelect={(currentValue) => {
                      setSearch(currentValue === search ? "" : currentValue);
                      setPosition({
                        lat: option.geometry.coordinates[1],
                        lng: option.geometry.coordinates[0],
                      });

                      setLocation(option.properties.geocoding);
                      getLocationLevels(option.properties.geocoding);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        search === option.properties.geocoding.label
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.properties.geocoding.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <MapContainer
        center={initialPosition}
        zoom={6}
        style={{
          height: "300px",
          width: "100%",
          borderRadius: "15px",
          zIndex: "0",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Muestra un marcador si hay coordenadas */}
        {position && (
          <Marker position={position} icon={myIcon}>
            <Popup>{location?.label}</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Mostrar ubicacion */}
      {/* {location ? (
        <>
          <p className="mx-auto mt-3 max-w-xl text-sm text-pretty">
            {location.label}
          </p>
        </>
      ) : (
        <p className="mx-auto mt-3 max-w-xl text-sm text-pretty">
          {t(message)}
        </p>
      )} */}
    </div>
  );

  // Funcion obtener la ubicación por busqueda
  async function getLocationSearch() {
    // Verificar que la busqueda tenga al menos 3 caracteres
    if (search.length <= 3) {
      setPosition(null);
      setLocation(null);
      setMessage("investment.location_not_permitted");
      setFilteredOptions([]);
      return;
    }

    // Realizar la busqueda
    const url = `https://nominatim.openstreetmap.org/search?format=geocodejson&q=${encodeURIComponent(
      search
    )}&zoom=18&addressdetails=1&limit=3`;
    fetch(url, {
      headers: { "User-Agent": "testApp/0.1 (kevin@banderaonline.org)" },
    })
      .then((response) => response.json())
      .then((data) => {
        // Solo Bogota o Medellin
        if (
          data.features[0].properties.geocoding.city != "Bogotá" &&
          data.features[0].properties.geocoding.city != "Medellín"
        ) {
          setPosition(null);
          setLocation(null);
          setMessage("investment.location_not_permitted");
          setFilteredOptions([]);
        } else {
          setFilteredOptions(data.features.map((feature) => feature));
        }
      })
      .catch((_error) => {
        // console.error(error);
      });
  }

  // Funcion obtener los niveles de ubicación
  function getLocationLevels(location) {
    let levels = {};
    levels.country = location.country;
    levels.city = location.city || location.state;
    levels.zone =
      location.district ||
      location.locality ||
      location.street ||
      location.name;
    switch (levels.zone) {
      case location.district:
        levels.subzone = location.locality || location.street || location.name;
        break;
      case location.locality:
        levels.subzone = location.street || location.name;
        break;
      default:
        levels.subzone = null;
        break;
    }
    setLocationLevels(levels);
  }
}

export { Map };
