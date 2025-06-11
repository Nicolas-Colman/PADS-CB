import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Alert,
    Platform,
    StyleSheet
} from "react-native";
import { auth } from '../../firebase';
import estilo from "../../estilo";

const RecuperaSenha = () => {
    const navigation = useNavigation();
    const [emailRec, setEmailRec] = useState('');

    const recupera = async () => {
        if (!emailRec || !emailRec.includes('@')) {
            Alert.alert("Email inválido", "Digite um e-mail válido.");
            return;
        }

        try {
            await auth.sendPasswordResetEmail(emailRec);
            Alert.alert("Sucesso", "E-mail de redefinição enviado.");
            navigation.replace('Login');
        } catch (error) {
            Alert.alert("Erro", "Não foi possível enviar o e-mail.");
        }
    };

    const voltar = () => {
        navigation.replace('Login');
    };

    return (
        <KeyboardAvoidingView
            style={estilo.containerRec}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={estilo.topContainerRec}>
                <Text style={estilo.titleRec}>Redefinir Senha</Text>
                <Text style={estilo.subtitleRec}>
                    Informe o e-mail para o qual deseja{'\n'}redefinir a sua senha.
                </Text>
            </View>

            <View style={estilo.formContainerRec}>
                <Text style={estilo.labelRec}>E-mail</Text>
                <TextInput
                    style={estilo.inputRec}
                    placeholder="exemplo@gmail.com"
                    placeholderTextColor="#666"
                    value={emailRec}
                    onChangeText={setEmailRec}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TouchableOpacity style={estilo.buttonRec} onPress={recupera}>
                    <Text style={estilo.buttonTextRec}>REDEFINIR SENHA</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={voltar}>
                    <Text style={estilo.linkRec}>Voltar ao Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default RecuperaSenha;