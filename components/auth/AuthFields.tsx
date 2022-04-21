import { View, Text, TextInput, Button, Pressable } from "react-native";
import { Typography, Forms, Base } from "../../styles";

export default function AuthFields({ auth, setAuth, title, submit, navigation }) {
    return (
        <View style={Base.base}>
            <Text style={{ ...Typography.header3, ...Base.header3}}>{title}</Text>

            <Text style={{ ...Typography.label }}>E-post</Text>
            <TextInput 
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setAuth({...auth, email:content})
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <Text style={{ ...Typography.label }}>Lösenord</Text>
            <TextInput 
                style={{ ...Forms.input }}
                onChangeText={(content:string) => {
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Pressable style={{...Base.button}} onPress={() => {
                submit();
                }}>
                <Text style={{ ...Typography.buttonText}}>Logga in</Text>
            </Pressable>
            {title == "Logga in" && 
                <Pressable style={{...Base.button2}} onPress={async () => {
                    navigation.navigate("Register");
                    }}>
                    <Text style={{ ...Typography.buttonText, ...Base.button2Color}}>Registrera istället</Text>
                </Pressable>
            }
        </View>
    );
};