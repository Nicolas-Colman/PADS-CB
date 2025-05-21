import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity } from "react-native";
import estilo from "../../estilo"

const RecuperaSenha = () => {

    const navigation = useNavigation();

   const Login =()=>{
    navigation.replace('Login');
   }

    return  (
                <KeyboardAvoidingView  style={estilo.tela}>
                    <View>
                        <Text>recupera Senha</Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={Login}>
                            <Text>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                    
                </KeyboardAvoidingView>
            )
}

export default RecuperaSenha;