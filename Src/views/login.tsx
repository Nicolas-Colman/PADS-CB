import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity } from "react-native";
import estilo from "../../estilo"
import { Usuario } from "../model/Usuario";


const Login = () => {

    const navigation = useNavigation();
    const Menu =()=>{
        navigation.replace('Menu');
    }
   

    return  (
                <KeyboardAvoidingView  style={estilo.tela}>
                    <View>
                        <Text>Login</Text>
                        <TouchableOpacity  onPress={Menu}>
                        <Text >Menu</Text>
                        </TouchableOpacity>
                    </View>
                    
                </KeyboardAvoidingView>
            )
}

export default Login;