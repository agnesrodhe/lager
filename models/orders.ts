import config from "../config/config.json";

import Order from "../interfaces/order";
import OrderItem from "../interfaces/order_item";
import Invoice from "../interfaces/invoice";

import product from "../models/products";

const orders = {
    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    getOrder: async function getOrder(orderToGet: Invoice): Promise<Order> {
        let order_id = orderToGet.order_id;
        const response = await fetch(`${config.base_url}/orders/${order_id}?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    pickOrder: async function pickOrder(order: Partial<Order>) {
        await Promise.all(order.order_items.map(async (order_item: Partial<OrderItem>) => {
            let updatedProduct = {
                id: order_item.product_id,
                name: order_item.name,
                stock: order_item.stock - order_item.amount,
                api_key: config.api_key,
            };

            await product.updateProduct(updatedProduct);
        }));

        let updatedOrder = {
            id: order.id,
            name: order.name,
            status_id: 200,
            api_key: config.api_key,
        };

        await orders.updateOrder(updatedOrder);
    },

    updateOrder: async function updateOrder(orderToUpdate: Partial<Order>) {
        await fetch(`${config.base_url}/orders`, {
            body: JSON.stringify(orderToUpdate),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
        .then(function (response) {

        });
    },
};

export default orders;