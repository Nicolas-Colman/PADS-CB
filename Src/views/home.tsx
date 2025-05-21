import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import estilo from "../../estilo"

const Home = () => {
    const navigation = useNavigation();

    const Config = () => {
        navigation.replace("Config");
    }

    return (
        <KeyboardAvoidingView style={estilo.tela}>
            <View>
                <Text>home</Text>
                <Pressable onPress={Config}>
                    <Icon style={estilo.msg}
                        name="settings-outline"
                    />

                </Pressable>
            </View>

        </KeyboardAvoidingView>
    )
}

export default Home;