import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

export type LatLng = { lat: number; lng: number };

export type PropertyMapProps = {
  center: LatLng;
  zoom: number;
  markerPosition: LatLng | null;
  onMarkerPositionChange?: (position: LatLng) => void;
  markerDraggable?: boolean;
  popupLabel?: string;
  className?: string;
};

function toTuple(pos: LatLng): LatLngExpression {
  return [pos.lat, pos.lng];
}

function MapViewSync({ center, zoom }: { center: LatLng; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(toTuple(center), zoom, { duration: 0.45 });
  }, [map, center.lat, center.lng, zoom]);

  return null;
}

function MapClickHandler({
  onMapClick,
}: {
  onMapClick?: (position: LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      onMapClick?.({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function DraggableMarker({
  position,
  draggable,
  onPositionChange,
  popupLabel,
}: {
  position: LatLng;
  draggable: boolean;
  onPositionChange?: (position: LatLng) => void;
  popupLabel?: string;
}) {
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker || !onPositionChange) return;

    const handleDragEnd = () => {
      const ll = marker.getLatLng();
      onPositionChange({ lat: ll.lat, lng: ll.lng });
    };

    marker.on("dragend", handleDragEnd);
    return () => {
      marker.off("dragend", handleDragEnd);
    };
  }, [onPositionChange]);

  return (
    <Marker
      ref={markerRef}
      position={toTuple(position)}
      draggable={draggable}
    >
      {popupLabel ? (
        <Popup>
          <span className="text-sm">{popupLabel}</span>
        </Popup>
      ) : null}
    </Marker>
  );
}

export default function Map({
  center,
  zoom,
  markerPosition,
  onMarkerPositionChange,
  markerDraggable = true,
  popupLabel = "Property location",
  className = "w-full h-96 my-5 rounded-md z-0",
}: PropertyMapProps) {
  return (
    <MapContainer
      center={toTuple(center)}
      zoom={zoom}
      className={className}
      scrollWheelZoom
    >
      <MapViewSync center={center} zoom={zoom} />
      <MapClickHandler onMapClick={onMarkerPositionChange} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markerPosition ? (
        <DraggableMarker
          position={markerPosition}
          draggable={Boolean(markerDraggable && onMarkerPositionChange)}
          onPositionChange={onMarkerPositionChange}
          popupLabel={popupLabel}
        />
      ) : null}
    </MapContainer>
  );
}
