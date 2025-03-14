"use client";

import * as styles from "./style.css";

import { Map } from "leaflet";
import Script from "next/script";
import { useCallback, useRef, useState } from "react";

interface Props {
  lat: number;
  long: number;
}

export function InfoWidgetMapEmbed({ lat, long }: Props) {
  const [leafletJsLoaded, setLeafletJsLoaded] = useState(false);
  const mapInstanceRef = useRef<Map>();

  const onRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = undefined;
      }

      if (!element || !leafletJsLoaded) {
        return;
      }

      const mapInstance = window.L.map(element, {
        zoomControl: false,
        center: [lat, long],
        zoom: 15,
        touchZoom: false,
        dragging: false,
      });

      new window.L.Marker([lat, long]).addTo(mapInstance);

      window.L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      ).addTo(mapInstance);

      mapInstanceRef.current = mapInstance;
    },
    [leafletJsLoaded, lat, long],
  );

  return (
    <>
      <Script
        crossOrigin=""
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        onLoad={() => setLeafletJsLoaded(true)}
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        strategy="afterInteractive"
      />

      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      <div className={styles.leafletMapContainer} ref={onRef} />
    </>
  );
}
