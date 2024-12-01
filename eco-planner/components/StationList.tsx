import React from 'react';
import { StyleSheet, FlatList, Pressable, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import StationInfos from '@/components/StationInfos';

const StationsList: React.FC<StationsListProps> = ({ filteredStations, selectedFuelType, chosenRange, listHeight, toggleListHeight, onStationSelect}) => {
  return (
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
            if (item.distance < chosenRange) {
              return (
                <StationInfos
                  station={item}
                  selectedFuelType={selectedFuelType}
                  onPress={() => onStationSelect([+item.latitude, +item.longitude])}
                />
              );
            }
            return null;
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
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

export default StationsList;
