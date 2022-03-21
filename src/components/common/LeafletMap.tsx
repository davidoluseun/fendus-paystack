import { Box } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefualtIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefualtIcon;

const LeafletMap = () => {
  const position: [number, number] = [6.6305522, 3.3436235];

  return (
    <Box
      h={{ base: "350px", lg: "100%" }}
      mx={{ base: "-4", md: "-6", lg: "0" }}
      mb={{ base: "-10", lg: "0" }}
    >
      <MapContainer
        center={position}
        zoom={12}
        scrollWheelZoom={false}
        dragging={false}
        style={{ height: "100%", marginBottom: "-40px" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <h3 style={{ fontWeight: "bold" }}>Fendus Varities</h3> <br />
            Shop D001 Ogba Multipurpose <br />
            Shopping Complex,
            <br />
            Ogba, Lagos.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default LeafletMap;
