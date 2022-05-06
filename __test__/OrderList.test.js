import { render } from '@testing-library/react-native';
import OrderList from '../components/OrderList';

const setProducts = () => false;
const route = {
    params: false
};

test('header should exist containing test Ordrar redo att plockas', async () => {
    const { getByText } = render(<OrderList route={route} setProducts={setProducts} />);
    const header = await getByText('Ordrar redo att plockas');

    expect(header).toBeDefined();
});