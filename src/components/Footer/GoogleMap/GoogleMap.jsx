import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function GoogleMap(){
  const defaultProps = {
    center: {
      lat: 42.516667, 
      lng: 72.233333
    },
    zoom: 11
  };

  return (
    <div style={{ height: '100%', width: '100%', borderRadius:"30px" }}>
      <GoogleMapReact

        bootstrapURLKeys={{ key: "AIzaSyD28KY3Z_QawvntkpyaIbdbBDeJQoG-WJw" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={49.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}