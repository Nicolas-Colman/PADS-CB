import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState, useEffect } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity, Platform, Pressable, Image, Alert } from "react-native";
import estilo from "../../estilo"
import { Usuario } from "../model/Usuario";
import { auth, firestore, storage } from "../../firebase";
import { uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";





const Cadastro = () => {
    const [formUsuario, setFormUsuario] = useState<Partial<Usuario>>({});
    const navigation = useNavigation();
    const [imagePath, setImagePath] = useState('');

    const refUsuario = firestore.collection("Perfil/ClienteDoc/Cliente")

    const Limpar = () => {
        setFormUsuario({});
    };
    const Login = () => {
        navigation.replace('Login');
    };

    const [erroSenha, setErroSenha] = useState("");

    useEffect(() => {
        if (formUsuario.userSenha !== formUsuario.userRepSenha) {
            setErroSenha("As senhas não coincidem");
        }
        else {
            setErroSenha("");
        }
    }, [formUsuario.userSenha, formUsuario.userRepSenha]);

    const Registro = () => {
        if (!erroSenha) {
            auth
                .createUserWithEmailAndPassword(formUsuario.userEmail!, formUsuario.userSenha!)
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    const refComIdUsuario = refUsuario.doc(auth.currentUser?.uid!);
                    refComIdUsuario.set({
                        userId: auth.currentUser?.uid,
                        userNome: formUsuario.userNome,
                        userEmail: formUsuario.userEmail,
                        userRole: 'cliente',
                        userUrlFoto: formUsuario.userUrlFoto
                    });
                    navigation.replace("Menu");
                })
                .catch((error) => alert(error.message));
        }
        else if (erroSenha) {
            alert("Nem todos os campos estão corretamente preenchidos!")
        }

    };

    const escolheFoto = () => {
        Alert.alert(
            "Selecionar Foto",
            "Escolha uma alternativa",
            [
                {
                    text: "Câmera",
                    onPress: () => abrirCamera()
                },
                {
                    text: "Abrir Galeria",
                    onPress: () => abrirGaleria()
                }
            ]
        );
    }

    const abrirCamera = async () => {
        const permissao = await ImagePicker.requestCameraPermissionsAsync();
        if (permissao.granted === false) {
            alert("Você recusou a permissão de acesso à câmera.")
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        console.log(result.assets[0]);
        enviarImagem(result);
    }

    const abrirGaleria = async () => {
        const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissao.granted === false) {
            alert("Você recusou a permissão de acesso à galeria.")
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        enviarImagem(result);
    }

    const enviarImagem = async (result) => {
        if (!result.canceled) {
            setImagePath(result.assets[0].uri);
            let filename = result.assets[0].fileName;
            const ref = storage.ref(`userImg/${filename}`);

            const img = await fetch(result.assets[0].uri);
            const bytes = await img.blob();
            const fbResult = await uploadBytes(ref, bytes);

            const urlDownload = await storage.ref(
                fbResult.metadata.fullPath).getDownloadURL()

            console.log("URL da foto:", urlDownload);
            setFormUsuario({ ...formUsuario, userUrlFoto: urlDownload });

        } else {
            alert("Envio cancelado!");
        }
    }


    return (
        <KeyboardAvoidingView
            style={estilo.tela}>


            <View>
                <Pressable onPress={() => escolheFoto()}>
                    <View style={estilo.imagemView}>
                        {
                            imagePath !== "" && (
                                <Image source={{ uri: imagePath }} style={estilo.imagemPerfil} />
                            )
                        }
                        {
                            imagePath === "" && (
                                <Image source={require("../assets/camera.png")} style={estilo.imagemPerfil} />
                            )
                        }
                    </View>
                </Pressable>
            </View>
            <View>
                <TextInput
                    placeholder="Nome"
                    value={formUsuario.userNome || ""}
                    onChangeText={(texto) => setFormUsuario({ ...formUsuario, userNome: texto })}
                />
                <TextInput
                    placeholder="Email"
                    value={formUsuario.userEmail || ""}
                    onChangeText={(texto) => setFormUsuario({ ...formUsuario, userEmail: texto })}
                />
                <TextInput
                    placeholder="Senha"
                    value={formUsuario.userSenha || ""}
                    onChangeText={(texto) => setFormUsuario({ ...formUsuario, userSenha: texto })}
                    secureTextEntry
                />
                <TextInput
                    placeholder="Repetir Senha"
                    value={formUsuario.userRepSenha}
                    onChangeText={(texto) => {
                        setFormUsuario({ ...formUsuario, userRepSenha: texto })
                    }}
                    secureTextEntry
                />
            </View>

            <View >
                <TouchableOpacity onPress={Registro}>
                    <View> <Text>Registrar</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={Limpar}>
                    <View> <Text>Limpa</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={Login}>
                    <View> <Text>Login</Text></View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )




}
export default Cadastro