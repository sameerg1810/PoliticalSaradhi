import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useEffect } from 'react';

import { Grid, Button } from '@mui/material';

const UserMapView = () => {
  const mapboxAccessToken =
    'pk.eyJ1IjoiYWhtZWRzaGFpazk5OSIsImEiOiJjbG81ZHRvY3UwOXo4MmttdjlzOHptZnk4In0.7pFLKtTFUz8RP6VHmd8EKw';

  const [map, setMap] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [pathCoordinates, setPathCoordinates] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [startMarker, setStartMarker] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [endMarker, setEndMarker] = useState(null);

  const calculateDistance = (coord1, coord2) => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Distance in meters
  };

  const updateLocation = (position) => {
    const { latitude, longitude } = position.coords;
    map.setCenter([longitude, latitude]);

    const updatedCoordinates = [...pathCoordinates, [longitude, latitude]];
    setPathCoordinates(updatedCoordinates);
    map.getSource('path').setData({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: updatedCoordinates,
      },
    });
  };

  const calculateTotalDistance = (coordinates) => {
    let totalDistance = 0;
    for (let i = 0; i < coordinates.length - 1; i += 1) {
      totalDistance += calculateDistance(coordinates[i], coordinates[i + 1]);
    }
    return totalDistance.toFixed(2);
  };

  const createStartMarker = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const marker = new mapboxgl.Marker({ color: 'green' })
        .setLngLat([longitude, latitude])
        .addTo(map);
      setStartMarker(marker);
    });
  };

  const createEndMarker = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([longitude, latitude])
        .addTo(map);
      setEndMarker(marker);
    });
  };

  const startTracking = () => {
    if (!tracking) {
      setTracking(true);
      createStartMarker();
      setWatchId(navigator.geolocation.watchPosition(updateLocation));
    }
  };

  const stopTracking = async () => {
    if (tracking) {
      setTracking(false);
      navigator.geolocation.clearWatch(watchId);
      createEndMarker();
      const distance = calculateTotalDistance(pathCoordinates);
      console.log(`start:${pathCoordinates[0]},end:${pathCoordinates[pathCoordinates.length - 1]}`);
      alert(`Traveled distance: ${distance} meters`);
    }
  };

  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;

    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 14,
    });

    mapInstance.on('load', () => {
      mapInstance.addSource('path', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [],
          },
        },
      });

      mapInstance.addLayer({
        id: 'path',
        type: 'line',
        source: 'path',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': 'orange',
          'line-width': 8,
        },
      });

      setMap(mapInstance);
    });

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div id="map" style={{ position: 'relative', width: '100%', height: '400px' }} />
        </Grid>
        <Grid item xs={12}>
          <div
            id="controls"
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
          >
            <Button
              variant="contained"
              type="button"
              id="startButton"
              onClick={startTracking}
              disabled={tracking}
              style={{ margin: '0 10px' }}
            >
              {tracking ? 'Tracking...' : 'Start Tracking'}
            </Button>
            <Button
              variant="contained"
              type="button"
              id="stopButton"
              onClick={stopTracking}
              disabled={!tracking}
              style={{ margin: '0 10px' }}
            >
              Stop Tracking
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserMapView;
