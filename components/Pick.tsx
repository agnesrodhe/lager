import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderList from './OrderList.tsx';
import PickList from './PickList.tsx';
const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <Stack.Navigator initialRouteName="Lista">
            <Stack.Screen name="Lista">
            {(screenProps) => <OrderList {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
            <Stack.Screen name="Detaljer">
            {(screenProps) => <PickList {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}