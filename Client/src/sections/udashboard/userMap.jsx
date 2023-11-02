import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useEffect } from 'react';

import { Grid, Switch, FormControlLabel } from '@mui/material';

const UserMapView = () => {
  const mapboxAccessToken =
    'pk.eyJ1IjoiYWhtZWRzaGFpazk5OSIsImEiOiJjbG81ZHRvY3UwOXo4MmttdjlzOHptZnk4In0.7pFLKtTFUz8RP6VHmd8EKw'; // Replace with your Mapbox access token

  const [map, setMap] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [pathCoordinates, setPathCoordinates] = useState([]);

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
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);

    if (map) {
      map.setCenter([longitude, latitude]);
    }

    const updatedCoordinates = [...pathCoordinates, [longitude, latitude]];
    console.log('Updated Coordinates:', updatedCoordinates);
    setPathCoordinates(updatedCoordinates);

    if (map) {
      map.getSource('path').setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: updatedCoordinates,
        },
      });
    }

    // Create a custom live location icon using HTML string
    const liveLocationIcon = document.createElement('div');
    liveLocationIcon.innerHTML = '<i class="fa-solid fa-compass"></i>'; // Your custom HTML icon
    liveLocationIcon.style.fontSize = '24px'; // Set the size as needed
    liveLocationIcon.style.color = 'blue'; // Set the color as needed

    if (map) {
      new mapboxgl.Marker(liveLocationIcon).setLngLat([longitude, latitude]).addTo(map);
    }
  };

  const calculateTotalDistance = (coordinates) => {
    let totalDistance = 0;
    for (let i = 0; i < coordinates.length - 1; i += 1) {
      totalDistance += calculateDistance(coordinates[i], coordinates[i + 1]);
    }
    console.log('Total Distance:', totalDistance.toFixed(2));
    return totalDistance.toFixed(2);
  };

  const postCoordinates = async (startLocation, endLocation, Date_Co) => {
    try {
      const data = {
        startLocation,
        endLocation,
        date: Date_Co.toISOString(),
      };

      const response = await fetch(
        `https://canvas-back-end.onrender.com/main/user/cords/${localStorage.getItem('id')}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      console.log('this is my check', startLocation, endLocation);

      const responseData = await response.json();
      console.log('Response from Backend:', responseData);
    } catch (error) {
      console.error('Error posting coordinates:', error);
    }
  };

  const toggleTracking = () => {
    if (tracking) {
      stopTracking();
    } else {
      startTracking();
    }
  };

  const startTracking = () => {
    console.log('Starting tracking...');
    // Call the   function to set showVoterForm to true
    setTracking(true);
    setWatchId(navigator.geolocation.watchPosition(updateLocation));
  };

  const stopTracking = async () => {
    console.log('Stopping tracking...');
    setTracking(false);
    navigator.geolocation.clearWatch(watchId);
    const distance = calculateTotalDistance(pathCoordinates);
    const startLocation = pathCoordinates[0];
    const endLocation = pathCoordinates[pathCoordinates.length - 1];

    const alertMessage = `Traveled distance: ${distance} meters\nStart Location: ${startLocation}\nEnd Location: ${endLocation}`;
    // alert(alertMessage);

    // Post coordinates to the backend
    if (pathCoordinates.length > 1) {
      const Date_Co = new Date();
      await postCoordinates(startLocation, endLocation, Date_Co);
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

      setMap(mapInstance);
    });

    return () => {
      if (mapInstance) {
        console.log('Removing map instance...');
        mapInstance.remove();
      }
    };
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            id="map"
            style={{ position: 'relative', width: '100%', height: '400px', display: 'none' }}
          />
        </Grid>
        <Grid item xs={12}>
          <div
            id="controls"
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
          >
            <FormControlLabel
              control={<Switch onClick={toggleTracking} checked={tracking} color="primary" />}
              label={tracking ? 'Await' : 'Awail'}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserMapView;
