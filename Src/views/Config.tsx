import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState } from "react";
import { auth, firestore } from '../../firebase';
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity } from "react-native";
import estilo from "../../estilo";

const Config = () =>{

    const refUsuario = firestore.collection("Perfil/ClienteDoc/Cliente")
    
    const navigation = useNavigation();
    const logout = () =>{
        auth   
            .signOut()
            .then(()=>{
                navigation.replace('Login')
            })
    }
    
    
    return (
        <KeyboardAvoidingView style={estilo.tela}>
            <View>
                <Text>Configuraçoes Usuario {auth.currentUser?.email} {refUsuario.doc.name}</Text>
            </View>
            <TouchableOpacity onPress={logout}> 
                    <Text >Sair</Text>
                </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default Config