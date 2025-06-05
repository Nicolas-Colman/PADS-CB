import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Alertas = () => {
  const navigation = useNavigation();

const AdicionarEndereco = () =>{
navigation.replace('Alerta', {screen:'NovoAlerta'});
}

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace("Menu")}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Image
          source={require("../assets/julia.png")}
          style={styles.profileImage}
        />

        <Text style={styles.nome}>Júlia Martins</Text>
      </View>

      <View style={styles.conteudo}>
        <View style={styles.iconeTitulo}>
          <Ionicons name="alert-circle" size={36} color="#000" />
          <Text style={styles.titulo}>Alertas</Text>
        </View>

        <Text style={styles.subtitulo}>NOME</Text>
        <TextInput style={styles.caixaInfo} value="Minha casa" editable={false} />

        <Text style={styles.subtitulo}>ENDEREÇO</Text>
        <View style={styles.caixaInfo}>
          <Text style={styles.textoInfo}>
            Av. Itália{"\n"}Nº322{"\n"}Bairro: Centro
          </Text>
        </View>

        <Text style={styles.subtitulo}>CEP</Text>
        <TextInput style={styles.caixaInfo} value="96450-000" editable={false} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("NovoAlerta")}
        >
          <Text style={styles.buttonText}>Adicionar Endereço</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Alertas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDFDF5",
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
  profileImage: {
    width: 60,
    height: 65,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
    marginLeft: 15,
  },
  nome: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 15,
  },
  conteudo: {
    padding: 25,
  },
  iconeTitulo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  subtitulo: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
    color: "#000",
  },
  caixaInfo: {
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
  },
  textoInfo: {
    fontSize: 14,
    color: "#000",
  },
  button: {
    backgroundColor: "#000",
    marginTop: 40,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
