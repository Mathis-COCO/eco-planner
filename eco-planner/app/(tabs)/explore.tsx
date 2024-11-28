import React, { useEffect, useState } from 'react';
import { Text, Button, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import MapScreen from '@/components/Map';
import FuelFilters from '@/components/FuelFilters';
import StationInfos from '@/components/StationInfos';
import useLocation from '@/hooks/useLocation';
import useGasStations from '@/hooks/useGasStations';

const GasStationsScreen: React.FC = () => {
  const { coords: userCoords, fetchLocation } = useLocation();
  const { filteredStations, fetchGasPrices, selectedFuelType, setSelectedFuelType } = useGasStations(userCoords);
  const [selectedCoords, setSelectedCoords] = useState<number[]>([]);
  const [listHeight, setListHeight] = useState(200); // Hauteur initiale de la FlatList

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (userCoords) {
      setSelectedCoords(userCoords);
    }
  }, [userCoords]);

  const handleFuelTypeChange = (fuelType: string) => {
    setSelectedFuelType(fuelType);
  };

  const handleStationSelect = (stationCoords: number[]) => {
    setSelectedCoords(stationCoords);
  };

  const handleUserPositionChange = (userCoords: number[]) => {
    setSelectedCoords(userCoords);
  };

  const toggleListHeight = () => {
    setListHeight(prevHeight => (prevHeight === -200 ? 0 : -200));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Stations-Service</Text>
      {userCoords && (
        <Button title="Rechercher les stations autour de moi" onPress={() => fetchGasPrices(selectedCoords)} />
      )}

      <FuelFilters onFuelTypeChange={handleFuelTypeChange} />
      {userCoords && (
        <MapScreen
          userCoords={userCoords}
          stationsList={filteredStations}
          onCoordsChange={handleUserPositionChange}
          selectedStationCoords={selectedCoords}
        />
      )}

      {filteredStations.length > 0 && (
        <>
          <Button title="voir plus (ou moins ^^)" onPress={toggleListHeight} />
          <FlatList
            style={[styles.listContainer, { height: listHeight }]}
            data={filteredStations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <StationInfos
                station={item}
                selectedFuelType={selectedFuelType}
                onPress={() => handleStationSelect([+item.latitude, +item.longitude])}
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
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
  listContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default GasStationsScreen;
