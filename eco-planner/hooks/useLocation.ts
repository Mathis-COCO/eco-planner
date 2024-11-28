import { useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

const useLocation = () => {
  const [coords, setCoords] = useState<number[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission refusée',
          'Nous avons besoin de votre localisation pour afficher les stations-service.'
        );
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = location.coords;
      setCoords([latitude, longitude]);
    } catch (err) {
      setError('Erreur lors de la récupération de la localisation.');
    } finally {
      setLoading(false);
    }
  };

  return { coords, loading, error, fetchLocation };
};

export default useLocation;
