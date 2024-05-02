import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const fetchCart = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        const id = await AsyncStorage.getItem('id');
        setLoading(true)
        try {
            const response = await axios.get(`http://10.0.2.2:3000/api/cart/find/${JSON.parse(id)}`);
            const newData = JSON.stringify(response.data)
            const parsedCartData = JSON.parse(newData);
            const products = parsedCartData[0].products;
            console.log("fetched products: ", products)
            setData(products);
            setLoading(false);
        } catch (error) {
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

    return {data, isLoading, error, refetch, setData}
}

export default fetchCart;