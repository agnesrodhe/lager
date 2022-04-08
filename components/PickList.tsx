import { useEffect, useState } from "react";
import { View, Text, Button, Pressable } from "react-native";
import orderModel from "../models/orders.ts";
import productModel from "../models/products.ts";
import { Base, Typography } from "../styles";

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        (async () => {
            const allProducts = await productModel.getProducts();
            setProductsList(allProducts);
        })();
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        navigation.navigate("Lista", { reload: true });
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text style={Typography.normal2}
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
                </Text>;
    });

    let pickButtonOrText;

    for (let item in order.order_items) {
        if (order.order_items[item].stock >= order.order_items[item].amount) {
            pickButtonOrText = <Button color='green' title="Plocka order" onPress={pick} />
        } else {
            pickButtonOrText = <Text style={{...Base.warning, ...Typography.header4}}>Det finns inte tillräckligt många varor i lager för att plocka ordern.</Text>
        }
    }

    return (
        <View style={Base.base}>
            <Text style={{...Typography.header4, ...Base.header4}}>Kund:</Text>
            <Text style={Typography.normal2}>{order.name}</Text>
            <Text style={Typography.normal2}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>
            <Text style={{...Typography.header4, ...Base.header4}}>Produkter:</Text>
            {orderItemsList}
            {pickButtonOrText}
        </View>
    )
};