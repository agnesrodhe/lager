import { Pressable, ScrollView, Text, View } from "react-native";
import { Base, Typography } from "../../styles";
import { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";

import storage from "../../models/storage";
import invoiceModel from "../../models/invoices";

import Invoice from "../../interfaces/invoice";
import invoice from "../../models/invoices";


export default function InvoicesList({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState([]);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        // console.log(await invoiceModel.getInvoices());
        setAllInvoices(await invoiceModel.getInvoices());
    }

    useEffect(() => {
        (async () => {
            reloadInvoices();
        })();
    }, []);

    async function logOut() {
        storage.deleteToken();
        setIsLoggedIn(false);
    }

    const invoicesRows = allInvoices.map((invoice, index) => {
        return (<DataTable.Row key={index}>
            <DataTable.Cell>{invoice.name}</DataTable.Cell>
            <DataTable.Cell numeric>{invoice.total_price}:-</DataTable.Cell>
            <DataTable.Cell numeric>{invoice.due_date}</DataTable.Cell>
        </DataTable.Row>);
    });

    return (
        <ScrollView style={Base.base}>
            <Text style={{ ...Typography.header3, ...Base.header3}}>Fakturor</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title numeric>Pris</DataTable.Title>
                    <DataTable.Title numeric>Förfallodatum</DataTable.Title>
                </DataTable.Header>
                {invoicesRows}
            </DataTable>

            <Pressable style={{...Base.button}} onPress={() => {
                navigation.navigate('Form');
                }}>
                <Text style={{ ...Typography.buttonText}}>Skapa ny faktura</Text>
            </Pressable>

            <Pressable style={{...Base.button2}} onPress={async () => {
                await logOut();
                }}>
                <Text style={{ ...Typography.buttonText, ...Base.button2Color}}>Logga ut</Text>
            </Pressable>
        </ScrollView>
    );
}