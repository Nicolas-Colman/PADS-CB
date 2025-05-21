import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState, useEffect } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity } from "react-native";
import estilo from "../../estilo";
import { auth, firestore, authRec } from '../../firebase';



const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigation = useNavigation();

    const recSenha = () => {
        navigation.replace('RecuperaSenha')
    }

    useEffect(() => {
        if (!email || !senha) {
            setErro("Campos em branco")
        }
        else if (!email.includes("@gmail.com")) {
            setErro("Email invalido")
        }
        else {
            setErro("pass")
        }


    }, [email, senha])


    const Login = async () => {

        if (erro == 'pass') {
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
                alert("Usuario ou senha Invalidos");

            }
        }
        else if(erro !== 'pass'){
            alert(erro);

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
                <TouchableOpacity onPress={recSenha}>
                    <Text>Esqueci minha senha?</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;
