import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity } from "react-native";
import estilo from "../../estilo"

const Ocorrencias = () => {

    const navigation = useNavigation();
    
    const NovaOcorrencia = () => {
        navigation.replace('NovaOcorrencia')
    }

    return (
        <KeyboardAvoidingView style={estilo.tela}>
            <View>
                <Text>Ocorrencias</Text>
            </View>
            <TouchableOpacity onPress={NovaOcorrencia}>
                <Text>Criar Ocorrencia</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default Ocorrencias;