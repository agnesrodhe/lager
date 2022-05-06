import { render, fireEvent } from '@testing-library/react-native';
import PickList from '../components/PickList';

const setProducts = () => false;
const order = { name: "Klas Klasson", address: "Klasgatan 5", zip: '12345', city: "Stockholm", 
order_items: [ 
    {name: "Taklampa - svart", amount: 4, location: "A123", stock: 11} 
] 
};
const route = {
    params:{
        order: order
    }
};
const zip = '12345';
const city = 'Stockholm';
const name = "Taklampa - svart";
const amount = 4;
const location = "A123";


test('headers should be Kund and Produkter', async () => {
    const { getByText, debug } = render(<PickList route={route} setProducts={setProducts} />);
    const kund = await getByText('Kund:');
    const produkt = await getByText('Produkter:');

    expect(kund).toBeDefined();
    expect(produkt).toBeDefined();
});

test('text about customer and product is showing', async () => {
    const { getByText, debug } = render(<PickList route={route} setProducts={setProducts} />);
    const orderName = await getByText('Klas Klasson');
    const orderAddress = await getByText('Klasgatan 5');
    const orderCity = await getByText(`${zip} ${city}`);
    const orderItem = await getByText(`${name} - ${amount}st - ${location}`);

    expect(orderItem).toBeDefined();
    expect(orderName).toBeDefined();
    expect(orderAddress).toBeDefined();
    expect(orderCity).toBeDefined();
});

test('test if pick button is showing', async () => {
    const { getByA11yLabel, debug } = render(<PickList route={route} setProducts={setProducts} />);
    const a11yLabel = `Plocka order genom att trycka`;
    const submitButton = getByA11yLabel(a11yLabel);

    // debug("Picklist component");
    expect(submitButton).toBeDefined();
});

test('test if pick button is not showing', async () => {
    order.order_items.stock = 3;
    const { getByText, debug } = render(<PickList route={route} setProducts={setProducts} />);
    const textNoButton = `Det finns inte tillräckligt många varor i lager för att plocka ordern.`;
    const showingText = getByText(textNoButton);

    // debug("Picklist component");
    expect(showingText).toBeDefined();
});