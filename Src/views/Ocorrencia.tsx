import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import estilo from "../../estilo";

const { width } = Dimensions.get("window");

const Ocorrencias = () => {
  const navigation = useNavigation();

  const NovaOcorrencia = () => {
    navigation.replace('NovaOcorrencia');
  };

  return (
    <ScrollView contentContainerStyle={estilo.scrollContainer}>
      {/* TOPO */}
      <View style={estilo.header}>
        <TouchableOpacity onPress={() => navigation.replace('Menu')}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Image
          source={require("../assets/julia.png")}
          style={estilo.perfil}
        />

        <Text style={estilo.nomeUsuario}>Júlia Martins</Text>
      </View>

      {/* TÍTULO */}
      <View style={estilo.tituloContainer}>
        <Ionicons name="call" size={32} color="#000" />
        <Text style={estilo.titulo}>Ocorrências</Text>
      </View>

      {/* CAMPO DE BUSCA */}
      <View style={estilo.buscaContainer}>
        <Ionicons name="search" size={20} color="#555" />
        <TextInput
          placeholder="Buscar Ocorrência"
          style={estilo.inputBusca}
          placeholderTextColor="#555"
        />
      </View>

      {/* CATEGORIAS + OCORRÊNCIAS */}
      <View style={estilo.listaContainer}>
        <Text style={estilo.categoria}>CATEGORIA: ENERGIA ELÉTRICA</Text>
        <View style={estilo.card}>
          <Text>Nome: Júlia Martins</Text>
          <Text>Data: 23/04/25  Hora: 11:34</Text>
          <Text>Localização: Av. Ildíia  Nº322  Centro</Text>
          <Text>Descrição: Poste com fios soltos.</Text>
          <View style={estilo.reacoes}>
            <Ionicons name="thumbs-up-outline" size={20} color="#555" />
            <Ionicons name="thumbs-down-outline" size={20} color="#555" />
          </View>
        </View>

        <Text style={estilo.categoria}>CATEGORIA: ÁGUA / ESGOTO</Text>
        <View style={estilo.card}>
          <Text>Nome: Henrique Moura</Text>
          <Text>Data: 22/04/25  Hora: 21:09</Text>
          <Text>Localização: General Neto Nº190  Centro</Text>
          <Text>Descrição: Cano estourado, vazamento de água.</Text>
          <View style={estilo.reacoes}>
            <Ionicons name="thumbs-up-outline" size={20} color="#555" />
            <Ionicons name="thumbs-down-outline" size={20} color="#555" />
          </View>
        </View>
      </View>

      {/* BOTÃO */}
      <TouchableOpacity onPress={NovaOcorrencia} style={estilo.botaoNovaOcorrencia}>
        <Text style={estilo.textoBotao}>Registrar nova Ocorrência</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Ocorrencias;


