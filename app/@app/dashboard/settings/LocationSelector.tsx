"use client";

import { LatLngTuple, LeafletMouseEvent, Map } from "leaflet";
import { useEffect, useState } from "react";

import { LeafletMap } from "../../../../components/LeafletMap";

interface Props {
  defaultCenter?: LatLngTuple;
}

export function LocationSelector({ defaultCenter }: Props) {
  const [mapInstance, setMapInstance] = useState<Map>();
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);

  useEffect(() => {
    if (!mapInstance) {
      return;
    }

    function onMapClick(e: LeafletMouseEvent) {
      setSelectedLocation([e.latlng.lat, e.latlng.lng]);
    }

    mapInstance.addEventListener("click", onMapClick);

    return () => {
      mapInstance.removeEventListener("click", onMapClick);
    };
  }, [mapInstance]);

  useEffect(() => {
    if (!mapInstance || !selectedLocation) {
      return;
    }

    mapInstance.setView(selectedLocation, 15);
    const marker = new window.L.Marker(selectedLocation).addTo(mapInstance);

    return () => {
      marker.removeFrom(mapInstance);
    };
  }, [mapInstance, selectedLocation]);

  return (
    <>
      <LeafletMap defaultZoom={10} onMapInstance={setMapInstance} />
      <input name="latitude" type="hidden" value={selectedLocation?.[0]} />
      <input name="longitude" type="hidden" value={selectedLocation?.[1]} />
    </>
  );
}
