import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouseLamp from './../assets/warehouse-lamp.jpg';
import Stock from './../components/Stock.tsx';
import { Base, Typography } from '../styles';
import React from 'react';

export default function Home({ products, setProducts }) {

    return (
        <SafeAreaView style={Base.container}>
            <ScrollView style={Base.base}>
                <Text style={{...Base.header1, ...Typography.header1}}>Lamplager</Text>
                <Image source={warehouseLamp} style={ Base.headerImage } />
                <Stock products={products} setProducts={setProducts} />
                <StatusBar style="auto" />
            </ScrollView>
        </SafeAreaView>
    );
}