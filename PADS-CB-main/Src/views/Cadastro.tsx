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
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.topContainer}>
                <TouchableOpacity onPress={() => navigation.replace("Login")} style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.title}>Cadastro</Text>

                <Pressable onPress={escolheFoto} style={styles.imagePicker}>
                    {imagePath ? (
                        <Image source={{ uri: imagePath }} style={styles.profileImage} />
                    ) : (
                        <Image source={require("../assets/camera.png")} style={styles.profileImage} />
                    )}
                </Pressable>

                <Text style={styles.label}>NOME</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Júlia Martins"
                    value={formUsuario.userNome || ""}
                    onChangeText={(text) => setFormUsuario({ ...formUsuario, userNome: text })}
                />

                <Text style={styles.label}>E-MAIL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="julia@gmail.com"
                    value={formUsuario.userEmail || ""}
                    onChangeText={(text) => setFormUsuario({ ...formUsuario, userEmail: text })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>SENHA</Text>
                <TextInput
                    style={styles.input}
                    placeholder="******"
                    secureTextEntry
                    value={formUsuario.userSenha || ""}
                    onChangeText={(text) => setFormUsuario({ ...formUsuario, userSenha: text })}
                />

                <TouchableOpacity style={styles.button} onPress={Registro}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.replace("Login")}>
                    <Text style={styles.loginLink}>Já está cadastrado?{"\n"}Faça login aqui.</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2196F3",
    },
    topContainer: {
        height: '20%',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    backButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backText: {
        fontSize: 60,
        color: "#fff",
    },
    formContainer: {
        flex: 1,
        backgroundColor: "#EFFFF8",
        borderTopLeftRadius: 130,
        padding: 50,
        alignItems: "center",
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#1B1B1F",
        marginBottom: 20,
    },
    imagePicker: {
        marginBottom: 18,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 30,
    },
    label: {
        alignSelf: "flex-start",
        marginTop: 10,
        marginBottom: 8,
        color: "#1B1B1F",
        fontWeight: "bold",
        fontSize: 12,
    },
    input: {
        width: "100%",
        height: 48,
        backgroundColor: "#C5CCC9",
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 10,
        color: "#000",
    },
    button: {
        width: "100%",
        backgroundColor: "#1B1B1F",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    loginLink: {
        color: "#1B1B1F",
        fontSize: 14,
        textAlign: "center",
        marginTop: 16,
    },
});

export default Cadastro;
