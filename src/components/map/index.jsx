import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";
import React from "react";
class GoogleMap extends React.Component {
  render() {
    let { lat, lng } = this.props;
    console.log(this.defaultProps);
    if (lat == 0) {
      lat = 51.4921;
    }

    if (lng == 0) {
      lng = -0.1929;
    }

    const position = {
      lat: lat,
      lng: lng,
    };

    return (
      <div className="relative h-96 w-full">
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map
            defaultCenter={position}
            defaultZoom={15}
            mapId={import.meta.env.VITE_MAP_ID}
          >
            <Marker position={position} />
          </Map>
        </APIProvider>
      </div>
    );
  }
}
GoogleMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

GoogleMap.defaultProps = {
  lat: 51.4921,
  lng: -0.1929,
};

export default GoogleMap;
