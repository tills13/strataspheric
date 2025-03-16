"use client";

import { Map } from "leaflet";
import { useCallback } from "react";

import { LeafletMap } from "../LeafletMap";

interface Props {
  lat: number;
  long: number;
}

export function InfoWidgetMapEmbed({ lat, long }: Props) {
  const onMapInstance = useCallback(
    (mapInstance: Map) => {
      new window.L.Marker([lat, long]).addTo(mapInstance);

      mapInstance.setView([lat, long], 13);
      mapInstance.zoomControl.remove();
      mapInstance.touchZoom.disable();
      mapInstance.dragging.disable();
    },
    [lat, long],
  );

  return <LeafletMap onMapInstance={onMapInstance} />;
}
