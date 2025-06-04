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

const { width } = Dimensions.get("window");

const Ocorrencias = () => {
  const navigation = useNavigation();

  const NovaOcorrencia = () => {
    navigation.replace('NovaOcorrencia');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* TOPO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Menu')}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Image
          source={require("../assets/julia.png")}
          style={styles.perfil}
        />

        <Text style={styles.nomeUsuario}>Júlia Martins</Text>
      </View>

      {/* TÍTULO */}
      <View style={styles.tituloContainer}>
        <Ionicons name="call" size={32} color="#000" />
        <Text style={styles.titulo}>Ocorrências</Text>
      </View>

      {/* CAMPO DE BUSCA */}
      <View style={styles.buscaContainer}>
        <Ionicons name="search" size={20} color="#555" />
        <TextInput
          placeholder="Buscar Ocorrência"
          style={styles.inputBusca}
          placeholderTextColor="#555"
        />
      </View>

      {/* CATEGORIAS + OCORRÊNCIAS */}
      <View style={styles.listaContainer}>
        <Text style={styles.categoria}>CATEGORIA: ENERGIA ELÉTRICA</Text>
        <View style={styles.card}>
          <Text>Nome: Júlia Martins</Text>
          <Text>Data: 23/04/25  Hora: 11:34</Text>
          <Text>Localização: Av. Ildíia  Nº322  Centro</Text>
          <Text>Descrição: Poste com fios soltos.</Text>
          <View style={styles.reacoes}>
            <Ionicons name="thumbs-up-outline" size={20} color="#555" />
            <Ionicons name="thumbs-down-outline" size={20} color="#555" />
          </View>
        </View>

        <Text style={styles.categoria}>CATEGORIA: ÁGUA / ESGOTO</Text>
        <View style={styles.card}>
          <Text>Nome: Henrique Moura</Text>
          <Text>Data: 22/04/25  Hora: 21:09</Text>
          <Text>Localização: General Neto Nº190  Centro</Text>
          <Text>Descrição: Cano estourado, vazamento de água.</Text>
          <View style={styles.reacoes}>
            <Ionicons name="thumbs-up-outline" size={20} color="#555" />
            <Ionicons name="thumbs-down-outline" size={20} color="#555" />
          </View>
        </View>
      </View>

      {/* BOTÃO */}
      <TouchableOpacity onPress={NovaOcorrencia} style={styles.botaoNovaOcorrencia}>
        <Text style={styles.textoBotao}>Registrar nova Ocorrência</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Ocorrencias;


const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    backgroundColor: "#EFFFF8",
  },
  header: {
    backgroundColor: "#2196F3",
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 40,
  },
  nomeUsuario: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15,
  },
  perfil: {
    width: 60,
    height: 65,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
  },
  tituloContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginHorizontal: 25,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  buscaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    marginHorizontal: 20,
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 18,
  },
  inputBusca: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: "#000",
  },
  listaContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  categoria: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
    color: "#000",
  },
  card: {
    backgroundColor: "#D9D9D9",
    padding: 12,
    borderRadius: 20,
    marginBottom: 25,
  },
  reacoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 15,
  },
  botaoNovaOcorrencia: {
    backgroundColor: "#000",
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 2,
    marginBottom: 50,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});
