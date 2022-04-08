import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import productModel from "../models/products.ts";
import { Base, Typography } from './../styles';

export default function Stock({products, setProducts}) {
    return (
        <View>
        <Text style={{...Typography.header3, ...Base.header3}}>Lagerförteckning</Text>
        <StockList products={products} setProducts={setProducts} />
        </View>
    );
}

function StockList({products, setProducts}) {

    useEffect(() => {
        (async () => {
            const allProducts = await productModel.getProducts();
            setProducts(allProducts);
        })();
    }, []);

    const list = products.map((product, index) => 
            <Text style={ Typography.normal } key={index}>
                { product.name } | { product.stock } st
            </Text>
        );

    return (
        <View>
            {list}
        </View>
    )
}