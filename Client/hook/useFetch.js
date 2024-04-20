import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true)

        try {
            const products = await AsyncStorage.getItem('products')
            if (products == null){
                const response = await axios.get('http://10.0.2.2:3000/api/products/');
                await AsyncStorage.setItem('products', JSON.stringify(response.data))
                setData(response.data);
            } else {
                const data = JSON.parse(products)
                setData(data)
            }
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