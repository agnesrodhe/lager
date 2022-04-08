import config from "../config/config.json";
import Products from "..interfaces/products.ts";

const product = {
    getProducts: async function getProducts(): Promise<Products[]> {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    // getProduct: async function getProduct(productId: number) {
    //     const response = await fetch(`${config.base_url}/products/${productId}?api_key=${config.api_key}`);
    //     const result = await response.json();
    //     return result.data;
    // },

    // checkProductInStock: async function checkProductInStock(product: number) {
    //     const productSearch = await this.getProduct(product);
    //     const amountInStock = productSearch.stock;
    //     return amountInStock;
    // }

    updateProduct: async function updateProduct(productToChange: Partial<Products>) {
        await fetch(`${config.base_url}/products`, {
            body: JSON.stringify(productToChange),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
        .then(function (response) {

        });
    },

};

export default product;