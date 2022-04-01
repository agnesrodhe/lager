import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";

export default function Stock() {
    return (
        <View>
        <Text style={{ color: '#486875', fontSize: 30, margin: 10, textDecorationLine: 'underline', textAlign: 'center', fontFamily: 'Times New Roman' }}>Lagerförteckning</Text>
        <StockList />
        </View>
    );
}

function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);

    const list = products.map((product, index) => <Text style={{ paddingBottom: 5, fontFamily: 'Times New Roman', fontSize: 20}}key={index}>{ product.name } | { product.stock } st</Text>);

    return (
        <View>
            {list}
        </View>
    )
}