import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState, useEffect } from "react";
import {
    KeyboardAvoidingView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform
} from "react-native";
import { auth, firestore } from '../../firebase';

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
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.topContainer}>
                <Text style={styles.logoText}>Comunica{'\n'}Bagé</Text>
            </View>

            <View style={styles.loginContainer}>
                <Text style={styles.title}>Login</Text>

                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    placeholder="exemplo@gmail.com"
                    placeholderTextColor=""
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>SENHA</Text>
                <TextInput
                    style={styles.input}
                    placeholder="********"
                    placeholderTextColor="#666"
                    onChangeText={setSenha}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={Login}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={recSenha}>
                    <Text style={styles.link}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={Registrar}>
                    <Text style={styles.subLink}>Criar conta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2196F3',
    },
    topContainer: {
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    logoText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loginContainer: {
        flex: 1,
        backgroundColor: '#EFFFF8',
        borderTopLeftRadius: 80,
        paddingHorizontal: 30,
        paddingTop: 40,
        alignItems: 'stretch',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1B1B1F',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        color: '#1B1B1F',
        marginBottom: 5,
        marginTop: 10,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#C5CCC9',
        borderRadius: 12,
        height: 48,
        paddingHorizontal: 15,
        fontSize: 14,
        marginBottom: 10,
        color: '#000',
    },
    button: {
        backgroundColor: '#1B1B1F',
        borderRadius: 10,
        paddingVertical: 14,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    link: {
        color: '#1B1B1F',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 16,
        fontWeight: '600',
    },
    subLink: {
        color: '#1B1B1F',
        textAlign: 'center',
        fontSize: 12,
        marginTop: 10,
    },
});

export default Login;