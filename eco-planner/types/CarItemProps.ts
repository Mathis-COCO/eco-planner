interface CarItemProps {
    model: string;
    brand: string;
    consumption?: number[];
    fuelType?: string;
}

interface CarInfos {
    fields: {
        model: string;
        brand: string;
        consumption?: number[];
        fuelType?: string;
        [key: string]: any;
    };
}

interface CarsResult {
    data: CarInfos[];
    loading: boolean;
    error: string | null;
}