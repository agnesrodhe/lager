import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipList from './ShipList';
import ShipOrder from './ShipOrder';

const Stack = createNativeStackNavigator();

export default function Ship(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="Lista">
            {(screenProps) => <ShipList {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
            <Stack.Screen name="Order" component={ShipOrder} />
        </Stack.Navigator>
    )
}