import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";
import React from "react";
/* 
  Making react component, extending this class
   in order to have property validation (with PropTypes)
    and not getting es linting error
 see GoogleMap.defaultProps

*/
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
        <APIProvider apiKey={"AIzaSyAY2tyOgEyJT3uZ2N259RzwG2iZHx0p9tU"}>
          <Map center={position} zoom={15}>
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
