import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';

const useGasStations = (initialCoords: number[] | null) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [selectedFuelType, setSelectedFuelType] = useState<string>('Tous');

  useEffect(() => {
    if (selectedFuelType === 'Tous') {
      setFilteredStations(stations);
    } else {
      const filtered = stations.filter((station) =>
        Array.isArray(station.fuels) &&
        station.fuels.some((fuel) => fuel.short_name === selectedFuelType)
      );
      setFilteredStations(filtered);
    }
  }, [selectedFuelType, stations]);

  const fetchGasPrices = async (coords: number[]) => {
    if (!coords) {
      Alert.alert('Erreur', 'Les coordonnées utilisateur ne sont pas disponibles.');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.prix-carburants.2aaz.fr/stations/around/${coords[0]},${coords[1]}`,
        {
          headers: {
            'Range': 'station=1-20'
          },
          params: {
            responseFields: '[Services,Fuels,Price]'
          }
        }
      );
      

      const stationsData: Station[] = response.data.map((station: any) => ({
        id: station.id.toString(),
        name: station.name,
        latitude: station.Coordinates.latitude,
        longitude: station.Coordinates.longitude,
        fuels: station.Fuels,
        brand: station.Brand.name,
        address: `${station.Address.street_line}, ${station.Address.city_line}`,
        distance: station.Distance.text,
      }));

      setStations(stationsData);
    } catch (err) {
      Alert.alert('Erreur', 'Erreur lors de la récupération des données.', [{ text: 'ok' }]);
    }
  };

  return {
    stations,
    filteredStations,
    fetchGasPrices,
    selectedFuelType,
    setSelectedFuelType,
  };
};

export default useGasStations;
