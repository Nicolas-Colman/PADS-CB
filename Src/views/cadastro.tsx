import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity } from "react-native";
import estilo from "../../estilo"

const cadastro = () =>{


    return (
                <KeyboardAvoidingView  style={estilo.tela}>
                    <View>
                        <Text>Cadastro</Text>
                    </View>
                    
                </KeyboardAvoidingView>
            )

        
    

}
export default cadastro