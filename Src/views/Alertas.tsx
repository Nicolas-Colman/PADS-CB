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

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Topo com seta, nome e imagem */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.replace("Menu")}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.userName}>Júlia Martins</Text>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/79.jpg' }}
          style={styles.profileImage}
        />
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.title}>Alertas</Text>

        <Text style={styles.label}>NOME</Text>
        <TextInput style={styles.input} value="Minha casa" editable={false} />

        <Text style={styles.label}>ENDEREÇO</Text>
        <View style={styles.inputMultiline}>
          <Text style={styles.addressText}>Av. Itália{"\n"}Nº322{"\n"}Bairro: Centro</Text>
        </View>

        <Text style={styles.label}>CEP</Text>
        <TextInput style={styles.input} value="96450-000" editable={false} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Alertas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6ffff",
  },
  topBar: {
    backgroundColor: "#3399ff",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 40,
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    marginLeft: -28, // para centralizar o texto mesmo com o ícone de seta
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#222",
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#d9e1e8",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  inputMultiline: {
    backgroundColor: "#d9e1e8",
    borderRadius: 10,
    padding: 10,
  },
  addressText: {
    fontSize: 16,
    color: "#333",
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
