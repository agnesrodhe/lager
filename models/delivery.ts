import config from "../config/config.json";
import Delivery from "..interfaces/delivery.ts";

const delivery = {
    getDeliveries: async function getDeliveries(): Promise<Delivery[]> {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    addDelivery: async function addDelivery(deliveryToAdd: Partial<Delivery>) {
        console.log(deliveryToAdd);
        let deliveryAdd = {
            product_id: deliveryToAdd.product_id,
            amount: deliveryToAdd.amount,
            delivery_date: deliveryToAdd.delivery_date,
            comment: deliveryToAdd.comment,
            api_key: config.api_key
        };
        console.log(deliveryAdd);

        await fetch(`${config.base_url}/deliveries`, {
            body: JSON.stringify(deliveryAdd),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(function (response) {

        })
        .catch(function(err){
            console.log(err);
        });
    }
}
export default delivery;