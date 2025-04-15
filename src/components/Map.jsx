import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Componentes
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet'

const myIcon = new Icon({
    iconUrl: '/assets/images/location-marker.svg',
    iconSize: [38, 38]
})

// Mapa
function Map() {

    const { t } = useTranslation();

    // Coordenadas iniciales (Colombia)
    const initialPosition = [4.6415843, -74.0857995];

    const [position, setPosition] = useState(null);
    const [location, setLocation] = useState(null);
    const [message, setMessage] = useState("investment.click_on_the_map");
    const [locationLevels, setLocationLevels] = useState(null);

    // Obtener la ubicación actual
    useEffect(() => {
        // setPosition(initialPosition);
        // getLocation(initialPosition[0], initialPosition[1], setLocation);
    }, [])

    return (
        <div>
            <MapContainer center={initialPosition} zoom={6} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Pasa la función de actualización al componente LocationMarker */}
                <LocationMarker onPositionChange={changePosition} />

                {/* Muestra un marcador si hay coordenadas */}
                {position && location && (
                    <Marker position={position} icon={myIcon}>
                        <Popup>{location.label}</Popup>
                    </Marker>
                )}
            </MapContainer>

            {/* Mostrar ubicacion */}
            {location ? (
                <>
                    <p className="mx-auto mt-3 max-w-xl text-l/8 text-pretty text-cyan-50">{location.label}</p>
                    {console.log(location)}
                    {/* <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-cyan-50">
                        Latitud: {position.lat.toFixed(4)}, Longitud: {position.lng.toFixed(4)}
                    </p> */}
                </>
            ) : (
                <p className="mx-auto mt-3 max-w-xl text-l/8 text-pretty text-cyan-50">{t(message)}</p>
            )}
        </div>
    )

    // Función para actualizar las coordenadas
    function changePosition(position) {
        setPosition(position);
        getLocation(position.lat, position.lng)
    }

    // Funcion obtener la ubicación
    async function getLocation(lat, lng) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
        fetch(url, { headers: { 'User-Agent': 'testApp/0.1 (kevin@banderaonline.org)' } })
            .then(response => response.json())
            .then(data => {
                // Solo Bogota o Medellin
                if (data.features[0].properties.geocoding.city != "Bogotá" && data.features[0].properties.geocoding.city != "Medellín") {
                    setPosition(null);
                    setLocation(null);
                    setMessage("investment.location_not_permitted")
                } else {
                    setLocation(data.features[0].properties.geocoding);
                    getLocationLevels(data.features[0].properties.geocoding);
                }
            })
            .catch(error => {
                console.error(error);
            })
    }

    // Funcion obtener los niveles de ubicación
    function getLocationLevels(location) {
        let levels = {};
        levels.country = location.country;
        levels.city = location.city || location.state;
        levels.zone = location.district || location.locality || location.street || location.name
        switch (levels.zone) {
            case location.district:
                levels.subzone = location.locality || location.street || location.name
                break;
            case location.locality:
                levels.subzone = location.street || location.name
                break;
            default:
                levels.subzone = null
                break;
        }
        console.log("niveles: ", levels);
    }
}

export { Map }

//  Componente capturar coordenadas del clic
function LocationMarker({ onPositionChange }) {
    useMapEvents({
        click(e) { onPositionChange(e.latlng) }
    });
}
