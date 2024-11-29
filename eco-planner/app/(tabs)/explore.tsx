import React, { useEffect, useState } from 'react';
import { Text, Button, StyleSheet, FlatList, SafeAreaView, Pressable } from 'react-native';
import MapScreen from '@/components/Map';
import FuelFilters from '@/components/FuelFilters';
import StationInfos from '@/components/StationInfos';
import useLocation from '@/hooks/useLocation';
import useGasStations from '@/hooks/useGasStations';
import Entypo from '@expo/vector-icons/Entypo';
import { Icon, Slider } from '@rneui/base';
import SliderComponent from '@/components/RangeSlider';

const GasStationsScreen: React.FC = () => {
  const { coords: userCoords, fetchLocation } = useLocation();
  const { filteredStations, fetchGasPrices, selectedFuelType, setSelectedFuelType } = useGasStations(userCoords);
  const [selectedCoords, setSelectedCoords] = useState<number[]>([]);
  const [listHeight, setListHeight] = useState<number>(0);
  const [chosenRange, setChosenRange] = useState(50);
  const [maxDistance, setMaxDistance] = useState(50);
  const [minDistance, setMinDistance] = useState(0);

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (userCoords) {
      setSelectedCoords(userCoords);
    }
  }, [userCoords]);

  useEffect(() => {
    if (filteredStations.length > 0 && filteredStations[filteredStations.length - 1].distance) {
      setChosenRange(Math.ceil(parseFloat(filteredStations[filteredStations.length - 1].distance.replace(' km', '')))*10)
      filteredStations[filteredStations.length - 1].distance.includes(' km') ? setMaxDistance(parseFloat(filteredStations[filteredStations.length - 1].distance.replace(' km', '')) * 10) : setMaxDistance(parseFloat(filteredStations[filteredStations.length - 1].distance.replace(' m', '')) / 100) 
      filteredStations[0].distance.includes(' km') ? setMinDistance(parseFloat(filteredStations[0].distance.replace(' km', '')) * 10) : setMinDistance(parseFloat(filteredStations[0].distance.replace(' m', '')) / 100)
    }
  }, [filteredStations]);

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
    setListHeight(prevHeight => (prevHeight === 100 ? 0 : prevHeight === 0 ? -1 : 100));
  };

  console.log(chosenRange)
  return (
<SafeAreaView style={styles.container}>
  {userCoords && (
    <Button title="Rechercher les stations autour de moi" onPress={() => fetchGasPrices(selectedCoords)} />
  )}

  <FuelFilters onFuelTypeChange={handleFuelTypeChange} />
  
  {filteredStations.length > 0 && (
    <SliderComponent
      value={chosenRange}
      onValueChange={setChosenRange}
      maximumValue={Math.ceil(maxDistance)}
      minimumValue={Math.floor(minDistance)}
    />
  )}
  
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
      <Pressable onPress={toggleListHeight} style={styles.swapHeigth}>
        <Entypo name="dots-three-horizontal" size={24} color="black" />
      </Pressable>
      {listHeight !== -1 && (
        <FlatList
          style={[styles.listContainer, { height: `${listHeight}%` }]}
          data={filteredStations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (+item.distance.replace(' km', '') * 10 < chosenRange) {
              return (
                <StationInfos
                  station={item}
                  selectedFuelType={selectedFuelType}
                  onPress={() => handleStationSelect([+item.latitude, +item.longitude])}
                />
              );
            }
            return null;
          }}
        />
      )}
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
    marginBottom: '21%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  swapHeigth: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
  },
  listContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default GasStationsScreen;
