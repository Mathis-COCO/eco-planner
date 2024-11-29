
interface MapProps {
    userCoords: number[];
    stationsList: Station[];
    onCoordsChange: (userMapCoords: number[]) => void;
    selectedStationCoords: number[];
    chosenRange: number;
  }