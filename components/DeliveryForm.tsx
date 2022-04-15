import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, View, Text, TextInput, Button, Pressable, KeyboardAvoidingView } from "react-native";
import { Base, Typography, Forms } from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import deliveryModel from "../models/delivery";
import Delivery from '../interfaces/delivery';
import Products from '../interfaces/products';
import config from "../config/config.json";

function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
                {itemsList}
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

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

export default function DeliveryForm({ route, navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Products>>({});


    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0), api_key: config.api_key
        };

        console.log(updatedProduct);

        await productModel.updateProduct(updatedProduct);

        navigation.navigate("Lista", { reload: true });
    }

    return (
        <KeyboardAvoidingView
        behavior='padding'
        style={Base.container}>
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header3, ...Base.header3 }}>Ny inleverans</Text>

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown 
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{ ...Typography.label}}>Datum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />

            <Text style={{ ...Typography.label }}>Antal</Text>
            <TextInput
                label="Amount"
                placeholder="Skriv in antal"
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={{ ...Typography.label }}>Kommentar</Text>
            <TextInput
                label="Comment"
                placeholder="Skriv en kommentar"
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Pressable style={{...Base.button }} onPress={() => {
                addDelivery();
                }}>
                <Text style={{ ...Typography.buttonText}}>Gör inleverans</Text>
            </Pressable>
        </ScrollView>
    </KeyboardAvoidingView>
    );
};