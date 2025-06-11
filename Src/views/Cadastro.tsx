import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
    KeyboardAvoidingView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Platform,
    Pressable,
    Image,
    Alert,
    StyleSheet,
} from "react-native";
import { Usuario } from "../model/Usuario";
import { auth, firestore, storage } from "../../firebase";
import { uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import estilo from "../../estilo";

const Cadastro = () => {
    const [formUsuario, setFormUsuario] = useState<Partial<Usuario>>({});
    const [imagePath, setImagePath] = useState('');
    const navigation = useNavigation();
    const refUsuario = firestore.collection("Perfil/ClienteDoc/Cliente");
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (!formUsuario.userUrlFoto) {
            setErro("Insira uma foto");
        } else if (!formUsuario.userNome) {
            setErro("Insira seu nome");
        } else if (!formUsuario.userEmail || !formUsuario.userEmail.includes('@gmail.com')) {
            setErro("Email inválido");
        } else if (!formUsuario.userSenha || formUsuario.userSenha.length < 6) {
            setErro("A senha deve conter no mínimo 6 caracteres");
        } else {
            setErro("pass");
        }
    }, [formUsuario]);

    const Registro = () => {
        if (erro === 'pass') {
            auth
                .createUserWithEmailAndPassword(formUsuario.userEmail!, formUsuario.userSenha!)
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    const refComIdUsuario = refUsuario.doc(user.uid);
                    refComIdUsuario.set({
                        userId: user.uid,
                        userNome: formUsuario.userNome,
                        userEmail: formUsuario.userEmail,
                        userRole: 'cliente',
                        userUrlFoto: formUsuario.userUrlFoto,
                    });
                    navigation.replace("Menu");
                })
                .catch((error) => alert(error.message));
        } else {
            Alert.alert("Erro", erro);
        }
    };

    const escolheFoto = () => {
        Alert.alert("Selecionar Foto", "Escolha uma alternativa", [
            { text: "Câmera", onPress: abrirCamera },
            { text: "Galeria", onPress: abrirGaleria },
        ]);
    };

    const abrirCamera = async () => {
        const permissao = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissao.granted) {
            alert("Você recusou a permissão de acesso à câmera.");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        enviarImagem(result);
    };

    const abrirGaleria = async () => {
        const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissao.granted) {
            alert("Você recusou a permissão de acesso à galeria.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        enviarImagem(result);
    };

    const enviarImagem = async (result: any) => {
        if (!result.canceled) {
            setImagePath(result.assets[0].uri);
            const filename = result.assets[0].fileName || result.assets[0].uri.split('/').pop();
            const ref = storage.ref(`userImg/${filename}`);
            const img = await fetch(result.assets[0].uri);
            const bytes = await img.blob();
            const fbResult = await uploadBytes(ref, bytes);
            const urlDownload = await storage.ref(fbResult.metadata.fullPath).getDownloadURL();
            setFormUsuario({ ...formUsuario, userUrlFoto: urlDownload });
        } else {
            alert("Envio cancelado!");
        }
    };

    return (
        <KeyboardAvoidingView style={estilo.cadContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={estilo.topCadContainer}>
                <TouchableOpacity onPress={() => navigation.replace("Login")} style={estilo.backButton}>
                    <Text style={estilo.backText}>←</Text>
                </TouchableOpacity>
            </View>

            <View style={estilo.formContainer}>
                <Text style={estilo.title}>Cadastro</Text>

                <Pressable onPress={escolheFoto} style={estilo.imagePicker}>
                    {imagePath ? (
                        <Image source={{ uri: imagePath }} style={estilo.profileImage} />
                    ) : (
                        <Image source={require("../assets/camera.png")} style={estilo.profileImage} />
                    )}
                </Pressable>

                <Text style={estilo.label}>NOME</Text>
                <TextInput
                    style={estilo.input}
                    placeholder="Júlia Martins"
                    value={formUsuario.userNome || ""}
                    onChangeText={(text) => setFormUsuario({ ...formUsuario, userNome: text })}
                />

                <Text style={estilo.label}>E-MAIL</Text>
                <TextInput
                    style={estilo.input}
                    placeholder="julia@gmail.com"
                    value={formUsuario.userEmail || ""}
                    onChangeText={(text) => setFormUsuario({ ...formUsuario, userEmail: text })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={estilo.label}>SENHA</Text>
                <TextInput
                    style={estilo.input}
                    placeholder="******"
                    secureTextEntry
                    value={formUsuario.userSenha || ""}
                    onChangeText={(text) => setFormUsuario({ ...formUsuario, userSenha: text })}
                />

                <TouchableOpacity style={estilo.button} onPress={Registro}>
                    <Text style={estilo.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.replace("Login")}>
                    <Text style={estilo.loginLink}>Já está cadastrado?{"\n"}Faça login aqui.</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};



export default Cadastro;
