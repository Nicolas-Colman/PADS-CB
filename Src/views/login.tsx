import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity } from "react-native";
import estilo from "../../estilo";
import { auth, firestore } from '../../firebase';



const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
     const navigation = useNavigation();

    const Login = async () => {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, senha);
            const user = userCredential.user;

            
            const docSnap = await firestore
                .collection("Perfil")
                .doc("ClienteDoc")
                .collection("Cliente")
                .doc(user.uid)
                .get();

            if (!docSnap.exists) {
                alert('Usuário não encontrado no banco de dados.');
                return;
            }

            const role = docSnap.data().userRole;

            if (role === 'admin') {
                alert('Usuário não encontrado no banco de dados.');
                return;
            } else if (role === 'cliente') {
                navigation.replace('Menu');
            } else {
                alert('Tipo de usuário desconhecido.');
            }

        } catch (error) {
            alert(error.message);
        }
    };

    const Registrar = () => {
        navigation.replace('Cadastro');
    };

    return (
        <KeyboardAvoidingView style={estilo.tela}>
            <View>
                <TextInput
                    placeholder="Email"
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Senha"
                    onChangeText={setSenha}
                    secureTextEntry
                />
            </View>

            <View>
                <TouchableOpacity onPress={Login}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={Registrar}>
                    <Text>Registrar-se</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;
