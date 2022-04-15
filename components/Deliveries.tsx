import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries({props}) {
    return (
        <Stack.Navigator initialRouteName="Lista">
            <Stack.Screen name="Lista">
            {(screenProps) => <DeliveriesList {...screenProps} setProducts={screenProps.setProducts} />}
            </Stack.Screen>
            <Stack.Screen name="Form">
            {(screenProps) => <DeliveryForm {...screenProps} setProducts={screenProps.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};