import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform, Linking, Alert } from 'react-native';
import MapView, { LongPressEvent, Marker } from 'react-native-maps';

const Map: React.FC<MapProps> = ({ userCoords, stationsList, onCoordsChange, selectedStationCoords }) => {
    const [userMapCoords, setUserMapCoords] = useState<number[]>(userCoords);
    const mapRef = useRef<MapView | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        console.log('click')
        if (selectedStationCoords && selectedStationCoords.length === 2) {
        animateToMarker(selectedStationCoords);
        }
    }, [selectedStationCoords]);
    

    useEffect(() => {
        setUserMapCoords([+userCoords[0], +userCoords[1]]);
    }, [userCoords]);

    const handleLongPress = (event: LongPressEvent) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setUserMapCoords([latitude, longitude]);
        onCoordsChange([latitude, longitude]);
    };
    
    const animateToMarker = (selectedCoords: number[]) => {
        if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        }
    
        if (mapRef.current) {
        mapRef.current.animateToRegion(
            {
            latitude: selectedCoords[0],
            longitude: selectedCoords[1],
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
            },
            1000
        );
    
        timeoutRef.current = setTimeout(() => {
            mapRef.current?.animateToRegion(
            {
                latitude: selectedCoords[0],
                longitude: selectedCoords[1],
                latitudeDelta: 0.040,
                longitudeDelta: 0.040,
            },
            1000
            );
        }, 2500);
        }
    };

    const handleOpenInOSMaps = () => {
        const url = Platform.select({
          ios: `maps:0,0?q=${selectedStationCoords[0]},${selectedStationCoords[1]}`,
          android: `geo:0,0?q=${selectedStationCoords[0]},${selectedStationCoords[1]}`,
        });
    
        if (url) {
          Linking.canOpenURL(url)
            .then((supported) => {
              if (supported) {
                return Linking.openURL(url);
              } else {
                Alert.alert("Erreur", "Impossible d'ouvrir l'application de cartes");
              }
            })
            .catch((err) => {
              console.error("Erreur lors de l'ouverture des cartes:", err);
            });
        } else {
          Alert.alert("Erreur", "URL non valide");
        }
      };

    return (
        <View style={styles.container}>
        <MapView
            ref={mapRef}
            onLongPress={handleLongPress}
            style={styles.map}
            region={{
            latitude: +userMapCoords[0],
            longitude: +userMapCoords[1],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
            }}
        >
            <Marker
            coordinate={{
                latitude: +userMapCoords[0],
                longitude: +userMapCoords[1],
            }}
            title="Ma position"
            >
            <View style={styles.currentPositionContainer}>
                <Text style={styles.currentPosition}>🚗</Text>
            </View>
            </Marker>

            {stationsList.map((coord, index) => (
            <Marker
                // key={coord.id}
                coordinate={{
                latitude: +coord.latitude,
                longitude: +coord.longitude,
                }}
                title={coord.name}
                description={coord.distance}
                onPress={() => animateToMarker([+coord.latitude, +coord.longitude])}
            >
                <View style={styles.currentPositionContainer}>
                    <Text style={styles.currentPosition}>⛽</Text>
                </View>
            </Marker>
            ))}
        </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  currentPositionContainer: {
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  currentPosition: {
    fontSize: 25,
    textAlign: 'center',
  },
});

export default Map;