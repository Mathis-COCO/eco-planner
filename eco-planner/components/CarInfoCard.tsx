import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CarItemProps {
    model: string;
    brand: string;
    consumption?: number[];
    fuelType?: string;
}

const CarInfoCard: React.FC<CarItemProps> = ({ model, brand, consumption, fuelType }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.brand}>{brand}</Text>
            <Text style={styles.model}>{model}</Text>
            {consumption !== undefined ? (
            <View>
                <Text style={styles.fuelType}>{fuelType}</Text>
                <View style={styles.consumptionContainer}>
                    <View>
                        <Text style={styles.consumptionType}>Ville</Text>
                        <Text style={styles.consumption}>{(235.214 / consumption[0]).toFixed(1)} L/100km</Text>
                    </View>
                    <View>
                        <Text style={styles.consumptionType}>Mixte</Text>    
                        <Text style={styles.consumption}>{(235.214 / consumption[1]).toFixed(1)} L/100km</Text>
                    </View>
                    <View>
                        <Text style={styles.consumptionType}>Autoroute</Text>
                        <Text style={styles.consumption}>{(235.214 / consumption[2]).toFixed(1)} L/100km</Text>
                    </View>
                </View>
            </View>
            ) : (
                <Text style={styles.consumption}>Consommation non disponible</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    brand: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'orange',
    },
    model: {
        fontSize: 16,
        color: '#666',
    },
    consumptionContainer : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    fuelType: {
        fontSize: 16,
        color: '#999',
        marginTop: 15,
    },
    consumptionType: {
        color: '#999',
    },
    consumption: {
        fontSize: 14,
        color: '#999',
    },
});

export default CarInfoCard;
