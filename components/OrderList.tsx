import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orderModel from "../models/orders";
import { Base, Typography } from '../styles';

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Detaljer', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View style={Base.base}>
            <Text style={{...Typography.header3, ...Base.header3}}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    )

}