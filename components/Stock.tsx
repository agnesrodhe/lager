import { Text, View } from 'react-native';
import { Base, Typography } from './../styles';
import StockList from './StockList';

export default function Stock({ products, setProducts}) {
    return (
        <View>
        <Text style={{...Typography.header3, ...Base.header3}}>Lagerförteckning</Text>
        <StockList products={products} setProducts={setProducts} />
        </View>
    );
}

