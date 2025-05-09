import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity } from "react-native";
import estilo from "../../estilo"
import { Usuario } from "../model/Usuario";
import { auth, firestore, storage } from "../../firebase";

const Cadastro = () => {
    const [formUsuario, setFormUsuario] = useState<Partial<Usuario>>({});
    const navigation = useNavigation();

    const refUsuario = firestore.collection("Perfil")
        .doc("ClienteDoc")
        .collection("Usuario");

    const Limpar = () => {
        setFormUsuario({});
    };

    const Registro = () => {

        auth
            .createUserWithEmailAndPassword(formUsuario.userEmail!, formUsuario.userSenha!)
            .then((userCredentials) => {
                const user = userCredentials.user;
                const refComIdUsuario = refUsuario.doc(auth.currentUser?.uid!);
                refComIdUsuario.set({
                    id: auth.currentUser?.uid,
                    nome: formUsuario.userNome,
                    email: formUsuario.userEmail,
                });
                console.log("registrado como ", user?.email);
                navigation.replace("Menu");
            })
            .catch((error) => alert(error.message));

    }








    return (
        <KeyboardAvoidingView style={estilo.tela}>


            <View> {/*area de formulario */}
                <TextInput
                    placeholder="Nome"
                    value={formUsuario.userNome}
                    onChangeText={(texto) => setFormUsuario({ ...formUsuario, userNome: texto })}
                />
                <TextInput
                    placeholder="Email"
                    value={formUsuario.userEmail}
                    onChangeText={(texto) => setFormUsuario({ ...formUsuario, userEmail: texto })}
                />
                <TextInput
                    placeholder="Senha"
                    value={formUsuario.userSenha}
                    onChangeText={(texto) => setFormUsuario({ ...formUsuario, userSenha: texto })}
                    secureTextEntry
                />
            </View>

            <View > {/*area de Bottoes */}
                <TouchableOpacity onPress={Registro}>
                    <Text>Registrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={Limpar}>
                    <Text>Limpar</Text>
                </TouchableOpacity>
            </View>



        </KeyboardAvoidingView>
    )




}
export default Cadastro