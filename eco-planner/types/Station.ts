interface Station {
    id: string;
    name: string;
    latitude: string;
    longitude: string;
    fuels: string;
    brand: string;
    address: string;
    distance: number;
    distanceText: string;
  }
  
interface TempProps {
  station: Station;
  selectedFuelType: string;
  onPress: () => void;
}

interface StationsListProps {
  filteredStations: any[];
  selectedFuelType: string;
  chosenRange: number;
  listHeight: number;
  toggleListHeight: () => void;
  onStationSelect: (stationCoords: number[]) => void;
}