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
import { showMessage } from 'react-native-flash-message';

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

export default function DeliveryForm({ navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Products>>({});

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0), api_key: config.api_key
        };
        await productModel.updateProduct(updatedProduct);

        setProducts(await productModel.getProducts());

        navigation.navigate("Lista", { reload: true });
    }

    function checkDelivery() {
        let deliveryChecked = false;
        if (Object.keys(delivery).length >= 3 && delivery.hasOwnProperty('delivery_date')) {
            if (delivery.hasOwnProperty('amount') && delivery.hasOwnProperty('product_id')) {
                deliveryChecked = true;
            }
        }
        return deliveryChecked;
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
                    let numericNumber;
                    if (content) {
                        numericNumber = parseInt(content);
                    } else {
                        numericNumber = 0;
                    }

                    setDelivery({ ...delivery, amount: numericNumber })
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
                if (checkDelivery()) {
                    addDelivery();
                } else {
                    showMessage({
                        message: "Ogiltig input",
                        description: "Se till att fylla i produkt, datum och antal då dessa är obligatoriska.",
                        type: "danger"
                    });
                }
                }}>
                <Text style={{ ...Typography.buttonText}}>Gör inleverans</Text>
            </Pressable>
        </ScrollView>
    </KeyboardAvoidingView>
    );
};