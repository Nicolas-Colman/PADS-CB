import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import estilo from "../../estilo"
import { auth, firestore} from '../../firebase';

const RecuperaSenha = () => {

    const navigation = useNavigation();
    const [emailRec, setEmailRec] = useState('');


    const recupera = async () => {
        
        console.log(emailRec)
        try {
            await auth.sendPasswordResetEmail(emailRec)
            // O e-mail foi enviado com sucesso.
            Alert.alert("Concluido","E-mail de redefinição de senha enviado com sucesso.");
            navigation.replace('Login');
        } catch (error) {
            
            Alert.alert("Email invalido","Erro ao enviar e-mail de redefinição de senha:");
        }
    }

    const Login = () => {
        navigation.replace('Login');
    }

    return (
        <KeyboardAvoidingView style={estilo.tela}>
            <View>
                <TextInput
                    placeholder="Email"
                    value={emailRec}
                    onChangeText={(texto) => setEmailRec(texto)}
                />
            </View>

            <View>
                <TouchableOpacity onPress={recupera}>
                    <Text>Enviar email</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={Login}>
                    <Text>Voltar</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}

export default RecuperaSenha;