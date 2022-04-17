import config from "../config/config.json";
import Products from "..interfaces/products.ts";

const product = {
    getProducts: async function getProducts(){
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

// Promise<Products[]>
    updateProduct: async function updateProduct(productToChange: Partial<Products>) {
        await fetch(`${config.base_url}/products`, {
            body: JSON.stringify(productToChange),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
        .then(function (response) {

        })
        .catch(function(err){
            console.log(err);
        });
    },

};

export default product;