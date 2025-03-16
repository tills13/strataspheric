import * as styles from "./style.css";

import { Map } from "leaflet";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  defaultZoom?: number;
  onMapInstance: (mapInstance: Map) => void;
}

export function LeafletMap({ defaultZoom = 15, onMapInstance }: Props) {
  const [leafletJsLoaded, setLeafletJsLoaded] = useState(
    typeof window !== "undefined" && !!window.L,
  );

  const onRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element || !leafletJsLoaded) {
        return;
      }

      const mMapInstance = window.L.map(element, {
        center: [48.4284, 123.3656],
        zoom: defaultZoom,
      });

      window.L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      ).addTo(mMapInstance);

      onMapInstance(mMapInstance);
    },
    [defaultZoom, leafletJsLoaded, onMapInstance],
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
