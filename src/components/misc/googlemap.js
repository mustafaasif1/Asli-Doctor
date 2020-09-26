import React, {useState, useCallback, useRef} from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';




export default function PickLocation(props){

  function Map() {
    const [center, setCenter] = useState(null);
    const refMap = useRef(null);
    const handleBoundsChanged = () => {
      const mapCenter = refMap.current.getCenter(); //get map center
      setCenter(mapCenter);
      props.updLoc(refMap.current.getCenter().lat(), refMap.current.getCenter().lng());

  };
      return(
        <GoogleMap
        ref={refMap}
        defaultZoom={13}
        defaultCenter={{ lat: 31.5204, lng: 74.3587 }}
        onBoundsChanged={useCallback(handleBoundsChanged)}
      >
             <Marker 
                  position={center}
                  draggable={true}
                  
             />
          </GoogleMap>
      );
  }
  
  
  
  
  const WrappedMap = withScriptjs(withGoogleMap(Map));
  
  
    return(
        <div>
            <WrappedMap 
                googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDbqCnv-nfSvRMYIxoLs8dS5y3NtXGUdws'}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}