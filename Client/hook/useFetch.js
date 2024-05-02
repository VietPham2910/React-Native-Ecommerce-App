import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetch = (category, sort, order = 1) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let queryParam = ""
    if (category) {
        queryParam += "category=" + category + "&"
    }
    queryParam += "sortBy=" + (sort || "createdAt")
    
    
    let url = 'http://10.0.2.2:3000/api/products' + '?' 
                    + queryParam + "&order=" + order
    const fetchData = async () => {
        setLoading(true)

        try {
            const response = await axios.get(url);
            await AsyncStorage.setItem('products', JSON.stringify(response.data))
            setData(response.data);

            setLoading(false);
        } catch (error) {
            console.log(error)
            setError(error);
        } finally{
           setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setLoading(true);
        fetchData();
    }

    return {data, isLoading, error, refetch}
}

export default useFetch;