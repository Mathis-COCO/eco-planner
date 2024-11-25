import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

const GasStationsScreen: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const selectedFuelName = "Gazole"; // Le carburant à afficher

  const fetchGasPrices = async () => {
    setLoading(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;

      if (status !== 'granted') {
        Alert.alert(
          'Permission refusée',
          'Nous avons besoin de votre localisation pour afficher les stations-service.'
        );
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `https://api.prix-carburants.2aaz.fr/stations/around/${latitude},${longitude}?range=5000&responseFields=[Services,Fuels,Price]`
      );

      const stationsData: Station[] = response.data.map((station: any) => ({
        id: station.id.toString(),
        name: station.name,
        latitude: station.Coordinates.latitude,
        longitude: station.Coordinates.longitude,
        price: station.Fuels
          .filter((fuel: any) => fuel.name === selectedFuelName) // Filtrer uniquement le carburant sélectionné
          .map((fuel: any) => `${fuel.name}: ${fuel.Price?.text || "Non spécifié"}`) // Construire la chaîne de prix
          .join(", "),
        brand: station.Brand.name,
        address: `${station.Address.street_line}, ${station.Address.city_line}`,
        distance: station.Distance.text,
      }));

      setStations(stationsData);
    } catch (err) {
      console.warn(err);
      Alert.alert('Erreur lors de la récupération des données.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stations-Service</Text>
      <Button title="Rechercher les stations autour de moi" onPress={fetchGasPrices} />
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {!loading && !error && (
        <FlatList
          data={stations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.price ? ( // Afficher uniquement les stations qui ont le carburant sélectionné
              <View style={styles.stationItem}>
                <Text style={styles.stationName}>{item.name}</Text>
                <Text>Distance : {item.distance}</Text>
                <Text>Prix : {item.price}</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 20,
  },
  error: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
  stationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GasStationsScreen;
