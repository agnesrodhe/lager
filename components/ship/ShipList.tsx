import { Pressable, ScrollView, Text, View, Button } from "react-native";
import { Base, Typography } from "../../styles";
import { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";

import storage from "../../models/storage";
import invoiceModel from "../../models/invoices";

import Invoice from "../../interfaces/invoice";
import invoice from "../../models/invoices";


export default function ShipList({ navigation }) {

    return (
        <View>
            <Text>Ordrar att skickas</Text>
            <Button
                title="fejkorder"
                key="0"
                onPress={() => {
                    navigation.navigate("Order", {
                        order: {
                            "id": 1,
                            "name": "Anders Andersson",
                            "address": "Klippgatan 18",
                            "zip": "11635",
                            "city": "Stockholm",
                            "country": "Sweden",
                            "status": "Packad",
                            "status_id": 200,
                        }
                    });
                }}
                />
        </View>
    )
}