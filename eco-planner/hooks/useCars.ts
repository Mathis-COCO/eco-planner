import { useState, useEffect } from 'react';
import axios from 'axios';

const useCars = (inputText: string): CarsResult => {
    const [data, setData] = useState<CarInfos[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!inputText) {
            setData([]);
            return;
        }

        const fetchCarsData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('https://public.opendatasoft.com/api/records/1.0/search/', {
                    params: {
                        dataset: 'all-vehicles-model',
                        rows: 20,
                        q: inputText,
                    },
                });

                if (response.data.records) {
                    setData(response.data.records);
                } else {
                    setError('Aucune donnée trouvée');
                }
            } catch (err) {
                setError('Erreur lors de la récupération des données');
            } finally {
                setLoading(false);
            }
        };

        fetchCarsData();
    }, [inputText]);

    return { data, loading, error };
};


export default useCars;
