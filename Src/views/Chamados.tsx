import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity } from "react-native";
import estilo from "../../estilo"

const Chamados = () => {

   

    return  (
                <KeyboardAvoidingView  style={estilo.tela}>
                    <View>
                        <Text>Chamados</Text>
                    </View>
                    
                </KeyboardAvoidingView>
            )
}

export default Chamados;