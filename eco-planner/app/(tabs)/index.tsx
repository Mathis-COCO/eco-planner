import { Image, StyleSheet, FlatList, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { SearchBar } from '@rneui/themed';
import useCars from '@/hooks/useCars';
import CarInfoCard from '@/components/CarInfoCard';

export default function HomeScreen() {
  const [inputText, setInputText] = useState('');
  const { data, loading, error } = useCars(inputText);

  const handleTextChange = (text: string) => {
    setInputText(text);
  };

  const renderItem = ({ item }: { item: any }) => (
    <CarInfoCard
        model={item.fields.model}
        brand={item.fields.make}
        consumption={[item.fields.city08, item.fields.comb08, item.fields.highway08]}
        fuelType={item.fields.fueltype1}
    />
);


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/gas_pumps.jpg')}
          style={styles.gasPumpImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Eco Planner</ThemedText>
      </ThemedView>
      <ThemedView style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Rechercher un véhicule..."
          value={inputText}
          onChangeText={handleTextChange}
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInput}
          inputStyle={styles.searchBarInputText}
        />
      </ThemedView>
      {loading && <Text>Chargement...</Text>}
      {error && <Text>{error}</Text>}
      {!loading && !error && (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}  // Utilisation de CarItem
        />
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchBarContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  searchBarContainerStyle: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  searchBarInput: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
  },
  searchBarInputText: {
    fontSize: 16,
  },
  gasPumpImage: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
