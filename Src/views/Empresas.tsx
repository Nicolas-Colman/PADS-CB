import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity } from "react-native";
import estilo from "../../estilo"
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';

const Empresas = () => {

   

    return  (<View style={estilo.tela}>
          <MapView style={{ height: "100%", width: "100%" }}
            initialRegion={{
              latitude: -31.3321719,
              longitude: -54.0723019,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}  
          >
    
            <Marker coordinate={{ latitude: -31.3321719, longitude: -54.0723019}} 
              title='Sala de Aula 4TADS'
              description='Todas as segundas a partir das 19h'
            />
    
            <Marker coordinate={{ latitude: -31.3323636, longitude: -54.066222}} 
              title='Subestação da CEEE'
              description='24 horas'
            />
            
          </MapView>
        </View>
            )
}

export default Empresas;