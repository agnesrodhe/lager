import { Pressable, ScrollView, Text, View } from "react-native";
import { Base, Typography } from "../../styles";
import storage from "../../models/storage";
import invoiceModel from "../../models/invoices";
import { useState, useEffect } from "react";

export default function DeliveriesList({ route, navigation }) {
    const { reload } = route.params || false;
    const [deliveriesList, setDeliveriesList] = useState([]);

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        setDeliveriesList(await deliveryModel.getDeliveries());
    }

    useEffect(() => {
        (async () => {
            reloadDeliveries();
        })();
    }, []);

    let deliveriesOutPut;

    const listOfDeliveries = deliveriesList.map((delivery, index) => {
        return <View style={Base.inleverans} key={index}>
            <Text style={Typography.leveransstor}>
                    {delivery.amount}st {delivery.product_name}
                </Text>
                <Text style={Typography.leveransliten}>
                    Leveransdatum: {delivery.delivery_date}
                </Text>
                <Text style={Typography.leveransliten}>
                    Kommentar: {delivery.comment}
                </Text>
                </View>;
    });

    if (listOfDeliveries.length == 0) {
        deliveriesOutPut = <Text style={{ ...Typography.normal, ...Base.info}}>Det finns inga inleveranser.</Text>
    } else {
        deliveriesOutPut = <Text></Text>;
    }

    return (
        <ScrollView style={Base.base}>
            <Text style={{ ...Typography.header3, ...Base.header3}}>Inleveranser</Text>
            {deliveriesOutPut}
            {listOfDeliveries}

            <Pressable style={{...Base.button, ...Typography.button}} onPress={() => {
                navigation.navigate('Form');
                }}>
                <Text style={{ ...Typography.buttonText}}>Skapa ny inleverans</Text>
            </Pressable>
        </ScrollView>
    );
}