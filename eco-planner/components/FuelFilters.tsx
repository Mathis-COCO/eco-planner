import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonGroup } from '@rneui/themed';
import * as Haptics from 'expo-haptics';

const FuelFilters: React.FC<FuelFiltersProps> = ({ onFuelTypeChange }) => {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const fuelTypes = ['Tous', 'Gazole', 'E85', 'SP95-E10', 'SP95', 'SP98', 'GPLc'];
    const selectedFuelType = fuelTypes[selectedIndex];

    useEffect(() => {
        onFuelTypeChange(selectedFuelType);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }, [selectedFuelType]);

    return (
      <>
        <ButtonGroup
          buttons={['Tous', 'Gazole', 'Ethanol', 'E10', 'SP95', 'SP98', 'GPL']}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
          containerStyle={{ marginBottom: 20 }}
        />
      </>
    )
    }
    
    const styles = StyleSheet.create({})

export default FuelFilters;