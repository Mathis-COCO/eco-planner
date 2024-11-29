import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, SafeAreaView, View, Text, Pressable } from 'react-native';
import MapScreen from '@/components/Map';
import FuelFilters from '@/components/FuelFilters';
import useLocation from '@/hooks/useLocation';
import useGasStations from '@/hooks/useGasStations';
import SliderComponent from '@/components/RangeSlider';
import StationsList from '@/components/StationList';
import { Icon } from '@rneui/base';

const GasStationsScreen: React.FC = () => {
  const { coords: userCoords, fetchLocation } = useLocation();
  const [selectedCoords, setSelectedCoords] = useState<number[]>([]);
  const [listHeight, setListHeight] = useState<number>(-1);
  const [chosenRange, setChosenRange] = useState(50);
  const [maxDistance, setMaxDistance] = useState(50);
  const [minDistance, setMinDistance] = useState(0);
  const [sliderVisibility, setSliderVisibility] = useState(true);
  const { filteredStations, fetchGasPrices, selectedFuelType, setSelectedFuelType } = useGasStations(chosenRange);

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
      setChosenRange(Math.ceil(filteredStations[filteredStations.length - 1].distance));
      setMaxDistance(Math.ceil(filteredStations[filteredStations.length - 1].distance));
      setMinDistance(Math.floor(filteredStations[0].distance));
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
    setListHeight((prevHeight) => (prevHeight === 100 ? 0 : prevHeight === 0 ? -1 : 100));
  };

  const toggleSliderVisibility = () => {
    setSliderVisibility((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      {userCoords && filteredStations.length === 0 ? (
        <Button
          title="Rechercher les stations autour de vous"
          onPress={() => fetchGasPrices(selectedCoords)}
        />
      ) : userCoords && filteredStations.length > 0 && listHeight !== 100 && (
        <Pressable style={[styles.refreshListContainer, {top: sliderVisibility ? '27.5%' : '18%', left: sliderVisibility ? '80%' : '60%'}]} onPress={() => fetchGasPrices(selectedCoords)}>
          <Icon
            name="refresh"
            type="font-awesome"
            size={13}
            reverse
            color={'#2b64cf'}
          />
        </Pressable>
      )}

      {filteredStations.length > 0 && listHeight !== 100 && (
      <>
        <View>
          <FuelFilters onFuelTypeChange={handleFuelTypeChange} />
        </View>

          <View style={[styles.sliderContainer, { width: sliderVisibility ? '85%' : '25%', left: sliderVisibility ? '7.5%' : '25%' }]}>
            <Text onPress={toggleSliderVisibility}>{chosenRange}m</Text>
            {sliderVisibility && (
              <SliderComponent
                value={chosenRange}
                onValueChange={setChosenRange}
                maximumValue={Math.ceil(maxDistance)}
                minimumValue={Math.floor(minDistance)}
              />
            )}
          </View>
        </>
      )}

      {userCoords && (
        <MapScreen
          userCoords={userCoords}
          stationsList={filteredStations}
          onCoordsChange={handleUserPositionChange}
          selectedStationCoords={selectedCoords}
          chosenRange={chosenRange}
        />
      )}

      {filteredStations.length > 0 && (
        <StationsList
          filteredStations={filteredStations}
          selectedFuelType={selectedFuelType}
          chosenRange={chosenRange}
          listHeight={listHeight}
          toggleListHeight={toggleListHeight}
          onStationSelect={handleStationSelect}
        />
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
  refreshListContainer: {
    position: 'absolute',
    left: '80%',
    backgroundColor: 'white',
    zIndex: 1,
    height: 45,
    width: 45,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
  },
  sliderContainer: {
    position: 'absolute',
    top: '17.5%',
    gap: 10,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 100,
    height: 45,
  },
});

export default GasStationsScreen;
