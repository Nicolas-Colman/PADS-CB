// ...importações mantidas
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const Chamados = () => {
  const navigation = useNavigation();

  const NovaOcorrencia = () => {
    navigation.replace('NovaOcorrencia');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#EAF8F7' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        {/* TOPO */}
        <View style={{
          backgroundColor: "#2196F3",
          paddingTop: 80,
          paddingBottom: 20,
          paddingHorizontal: 25,
          flexDirection: "row",
          alignItems: "center",
          borderBottomLeftRadius: 40,
        }}>
          <TouchableOpacity onPress={() => navigation.replace("Menu")}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>

          <Image
            source={require('../assets/julia.png')}
            style={{
              width: 60,
              height: 65,
              borderRadius: 30,
              borderWidth: 2,
              borderColor: "#fff",
              marginLeft: 15,
            }}
          />

          <Text style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: 15,
          }}>
            Júlia Martins
          </Text>
        </View>

        {/* TÍTULO COM ÍCONE AO LADO */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 25,
          paddingTop: 30,
        }}>
          <FontAwesome5 name="phone-alt" size={24} color="#000" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000' }}>
            Chamados
          </Text>
        </View>

        {/* BUSCAR */}
        <View
          style={{
            backgroundColor: '#D9D9D9',
            borderRadius: 10,
            padding: 10,
            margin: 20,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Ionicons name="search" size={18} color="#333" style={{ marginRight: 8 }} />
          <Text style={{ fontWeight: 'bold' }}>Buscar Chamados</Text>
        </View>

        {/* CHAMADO 1 */}
        <View style={{ marginHorizontal: 20, marginBottom: 15 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
            CATEGORIA: ENERGIA ELÉTRICA
          </Text>
          <View style={{
            backgroundColor: '#D9D9D9',
            borderRadius: 10,
            padding: 10
          }}>
            <Text>Nome: Júlia Martins</Text>
            <Text>Data: 23/04/25  Hora: 11:34</Text>
            <Text>Localização: Av. Itílio Nº322  Centro</Text>
            <Text>Descrição: Poste com fios soltos.</Text>
            <Text>Status: Chamado encaminhado.</Text>
          </View>
        </View>

        {/* CHAMADO 2 */}
        <View style={{ marginHorizontal: 20, marginBottom: 40 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
            CATEGORIA: COLETA DE LIXO
          </Text>
          <View style={{
            backgroundColor: '#D9D9D9',
            borderRadius: 10,
            padding: 10
          }}>
            <Text>Nome: Júlia Martins</Text>
            <Text>Data: 31/03/25  Hora: 15:46</Text>
            <Text>Localização: Av. Itílio Nº322  Centro</Text>
            <Text>Descrição: Coleta não realizada.</Text>
            <Text>Status: Finalizado</Text>
          </View>
        </View>

        {/* BOTÃO NOVA OCORRÊNCIA */}
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            alignSelf: "center",
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 25,
            marginTop: 2,
            marginBottom: 50,
          }}
          onPress={NovaOcorrencia}
        >
          <Text style={{ color: '#EFFFF8', fontWeight: 'bold' }}>Registrar nova Ocorrência</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Chamados;
