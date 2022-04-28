import { Pressable, ScrollView, Text, View, Button } from "react-native";
import { Base, Typography } from "../../styles";
import { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import orderModel from "../../models/orders";
import storage from "../../models/storage";
import invoiceModel from "../../models/invoices";

import Invoice from "../../interfaces/invoice";
import invoice from "../../models/invoices";


export default function ShipList({ route, navigation }) {
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
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Order', {
                        order: order
                    });
                }}
            />
        });
    return (
        <View style={Base.base}>
            <Text style={{ ...Typography.header3, ...Base.header3 }}>Ordrar att skickas</Text>
            {listOfOrders}
        </View>
    )
}