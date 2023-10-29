// eslint-disable-next-line import/no-extraneous-dependencies
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYWhtZWRzaGFpazk5OSIsImEiOiJjbG81ZHRvY3UwOXo4MmttdjlzOHptZnk4In0.7pFLKtTFUz8RP6VHmd8EKw';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.404352, 17.492734],
      zoom: 14,
    });

    const updateMap = (coordinates) => {
      map.getSource('route').setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates,
        },
      });
    };

    map.on('load', () => {
      map.addSource('route', {
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
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': 'blue',
          'line-width': 8,
        },
      });

      const directionsApiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/78.404401%2C17.492777%3B78.410597%2C17.48539?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${mapboxgl.accessToken}`;

      fetch(directionsApiUrl)
        .then((response) => response.json())
        .then((data) => {
          const { coordinates } = data.routes[0].geometry;
          updateMap(coordinates);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    });
  }, []);

  return (
    <div
      id="map"
      style={{ position: 'absolute', top: 0, bottom: 0, width: '100%', height: '100%' }}
    />
  );
};

export default Map;
