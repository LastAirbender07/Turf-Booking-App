import { StyleSheet, View, LogBox } from 'react-native';
import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LeafletView } from 'react-native-leaflet-view';

const MapScreen = () => {
  const route = useRoute();
  const mapView = useRef(null);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Map View',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 70,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
      headerTintColor: 'white',
    });
  }, []);

  LogBox.ignoreLogs([
    'Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?',
    'Warning: LeafletView: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
  ]);

  const openStreetMapLayer = {
    baseLayerName: 'OpenStreetMap',
    baseLayerIsChecked: 'true',
    layerType: 'TileLayer',
    baseLayer: true,
    url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    tileSize: 256
  };

  const coordinates = [];
  const markers = route.params.searchPlaces.flatMap((item, itemIndex) =>
    item.properties.map((property, propIndex) => {
      const lat = parseFloat(property.latitude);
      const lng = parseFloat(property.longitude);
      coordinates.push({ latitude: lat, longitude: lng });
      return {
        id: `${itemIndex}-${propIndex}`,
        position: { lat, lng },
        icon: '📍',
        size: [40, 40],
        title: property.name,
        newPrice: property.newPrice,
      };
    })
  );

  const initialPosition = {
    lat: route?.params.searchPlaces[0].properties[0].latitude,
    lng: route?.params.searchPlaces[0].properties[0].longitude,
  }

  useEffect(() => {
    if (mapView.current) {
      mapView.current.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 190,
          left: 190,
          bottom: 190,
          right: 190,
        }
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <LeafletView
        ref={mapView}
        baseLayer={openStreetMapLayer}
        mapCenterPosition={initialPosition}
        zoom={9}
        mapMarkers={markers}
        onMessageReceived={(event) => {
          console.log(event);
        }}
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
