import { useEffect, useState } from 'react';
import { Platform, ScrollView, View, Text, Button, Pressable, KeyboardAvoidingView } from "react-native";
import { Base, Typography, Forms } from '../../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import invoiceModel from "../../models/invoices";
import orderModel from '../../models/orders';
import config from "../../config/config.json";
import Order from '../../interfaces/order';
import Invoice from '../interfaces/order';

function zeroFirst(number: number): string {
    if (number < 10) {
        return "0" + number;
    }
    return "" + number;
}

function formatDate(date: Date): string {
    return `${date.getFullYear()}-${zeroFirst((date.getMonth() + 1))}-${zeroFirst(date.getDate())}`;
}

function OrderDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(async () => {
        setOrders(await orderModel.getOrders());
    }, []);

    const ordersList = orders.filter(order => order.status_id < 600).map((order, index) => {
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({ ...props.invoice, order_id: itemValue });
            }}>
                {ordersList}
        </Picker>
    );
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };
    
    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setInvoice({
                            ...props.invoice,
                            creation_date: formatDate(date),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

export default function InvoicesForm({ navigation }) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});
    console.log(invoice);

    async function createInvoice() {
        await invoiceModel.createInvoice(invoice);

        navigation.navigate("Lista", { reload: true });
    }
        // const updatedProduct = {
        //     ...currentProduct,
        //     stock: (currentProduct.stock || 0) + (delivery.amount || 0), api_key: config.api_key
        // };
        // await productModel.updateProduct(updatedProduct);

        // setProducts(await productModel.getProducts());

        // navigation.navigate("Lista", { reload: true });

    return (
        <KeyboardAvoidingView
        behavior='padding'
        style={Base.container}>
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header3, ...Base.header3 }}>Ny faktura</Text>

            <Text style={{ ...Typography.label }}>Order</Text>
            <OrderDropDown 
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Text style={{ ...Typography.label}}>Datum</Text>
            <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Pressable style={{...Base.button }} onPress={() => {
                createInvoice();
                }}>
                <Text style={{ ...Typography.buttonText}}>Skapa faktura</Text>
            </Pressable>
        </ScrollView>
    </KeyboardAvoidingView>
    );
};