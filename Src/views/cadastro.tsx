import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity, Platform } from "react-native";
import estilo from "../../estilo"
import { Usuario } from "../model/Usuario";
import { auth, firestore, storage } from "../../firebase";

const Cadastro = () => {
    const [formUsuario, setFormUsuario] = useState<Partial<Usuario>>({});
    const navigation = useNavigation();

    const refUsuario = firestore.collection("Perfil/ClienteDoc/Cliente")

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
                    userId: auth.currentUser?.uid,
                    userNome: formUsuario.userNome,
                    userEmail: formUsuario.userEmail,
                    userRole: 'cliente',
                });
                navigation.replace("Menu");
            })
            .catch((error) => alert(error.message));

    };


   return (
        <KeyboardAvoidingView 
         style={estilo.tela}>


            <View> {/*area de formulario */}
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
            </View>

            <View > {/*area de Bottoes */}
                <TouchableOpacity onPress={Registro}>
                   <View> <Text>Registrar</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={Limpar}>
                     <View> <Text>Limpa</Text></View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )




}
export default Cadastro