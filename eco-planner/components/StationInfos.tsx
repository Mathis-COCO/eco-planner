import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';

const StationInfos: React.FC<TempProps> = ({ station, selectedFuelType, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.stationItem}>
                <Text style={styles.stationName}>{station.name}</Text>
                <Text>Distance : {station.distanceText}</Text>
                    {Array.isArray(station.fuels) && station.fuels.map((fuel, index) => (
                    fuel.short_name === selectedFuelType ? 
                    <View style={styles.fuelPricesContainer} key={index}>
                        <Text>{fuel.short_name}</Text>
                        <Text>{fuel.Price.value}€/L</Text>
                    </View > :
                    selectedFuelType === 'Tous' && 
                    <View style={styles.fuelPricesContainer} key={index}>
                        <Text>{fuel.short_name}</Text>
                        <Text>{fuel.Price.value}€/L</Text>
                    </View>
                ))}
            </View>            
        </TouchableOpacity>


    )
    }
    
    const styles = StyleSheet.create({
        stationItem: {
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        },
        stationName: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        fuelPricesContainer : {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }
    })

export default StationInfos;