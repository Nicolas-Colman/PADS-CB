import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState, useEffect } from "react";
import {
    KeyboardAvoidingView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Platform,
} from "react-native";
import { auth, firestore } from '../../firebase';
import estilo from "../../estilo";

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigation = useNavigation();

    const recSenha = () => {
        navigation.replace('RecuperaSenha');
    };

    useEffect(() => {
        if (!email || !senha) {
            setErro("Campos em branco");
        } else if (!email.includes("@gmail.com")) {
            setErro("Email inválido");
        } else {
            setErro("pass");
        }
    }, [email, senha]);

    const Login = async () => {
        if (erro === 'pass') {
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
                alert("Usuário ou senha inválidos.");
            }
        } else {
            alert(erro);
        }
    };

    const Registrar = () => {
        navigation.replace('Cadastro');
    };

    return (
        <KeyboardAvoidingView
            style={estilo.containerLog}
        >
            

                <View style={estilo.topContainerLog}>
                    <Text style={estilo.logoTextLog}>Comunica{'\n'}Bagé</Text>
                </View>

                <View style={estilo.loginContainerLog}>
                    <Text style={estilo.titleLog}>Login</Text>

                    <Text style={estilo.labelLog}>E-mail</Text>
                    <TextInput
                        style={estilo.inputLog}
                        placeholder="exemplo@gmail.com"
                        placeholderTextColor=""
                        onChangeText={setEmail}
                    />

                    <Text style={estilo.labelLog}>SENHA</Text>
                    <TextInput
                        style={estilo.inputLog}
                        placeholder="********"
                        placeholderTextColor="#666"
                        onChangeText={setSenha}
                        secureTextEntry
                    />

                    <TouchableOpacity style={estilo.buttonLog} onPress={Login}>
                        <Text style={estilo.buttonTextLog}>Log in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={recSenha}>
                        <Text style={estilo.linkLog}>Esqueceu sua senha?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={Registrar}>
                        <Text style={estilo.subLinkLog}>Criar conta</Text>
                    </TouchableOpacity>
                </View>
        </KeyboardAvoidingView>
    );
};


export default Login;