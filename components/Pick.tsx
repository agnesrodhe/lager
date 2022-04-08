import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Base } from "../styles";

import OrderList from './OrderList.tsx';
import PickList from './PickList.tsx';
const Stack = createNativeStackNavigator();

export default function Pick({props}) {
    return (
        <Stack.Navigator initialRouteName="Lista">
            <Stack.Screen name="Lista" component={OrderList} />
            <Stack.Screen name="Detaljer">
            {(screenProps) => <PickList {...screenProps} setProducts={screenProps.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}