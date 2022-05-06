import { View, Text, TextInput, Pressable } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Typography, Forms, Base } from "../../styles";

export default function AuthFields({ auth, setAuth, title, submit, navigation }) {

    function validatePassword(text: string) {

        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/

        if (!text.match(pattern)) {
            showMessage({
                message: "Ogiltigt lösenord",
                description: "Lösenordet måste innehålla minst 4 tecken, små och stora bokstäver, siffror och specialtecken.",
                type: "warning"
            });
        }
    }

    function validateEmail(text: string) {
        const pattern =  	
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!text.match(pattern)) {
            showMessage({
                message: "Ogiltig email",
                description: "E-mailadressen måste se ut på det här viset ex. abc@ja.com",
                type: "warning"
            });
        }
    }

    return (
        <View style={Base.base}>
            <Text style={{ ...Typography.header3, ...Base.header3}}>{title}</Text>

            <Text style={{ ...Typography.label }}>E-post</Text>
            <TextInput 
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    validateEmail(content)
                    setAuth({...auth, email:content})
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                testID="email-field"
            />

            <Text style={{ ...Typography.label }}>Lösenord</Text>
            <TextInput 
                style={{ ...Forms.input }}
                onChangeText={(content:string) => {
                    validatePassword(content)
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                testID="password-field"
            />
            <Pressable style={{...Base.button}} onPress={() => {
                submit();
                }}
                accessibilityLabel={`${title} genom att trycka`}>
                <Text style={{ ...Typography.buttonText}}>{title}</Text>
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