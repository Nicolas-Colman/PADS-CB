import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NovoAlerta = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");


  // Formata automaticamente o CEP no padrão 00000-000
  const formatarCep = (valor: string) => {
    const cepNumerico = valor.replace(/\D/g, "");
    if (cepNumerico.length <= 5) {
      return cepNumerico;
    }
    return `${cepNumerico.slice(0, 5)}-${cepNumerico.slice(5, 8)}`;
  };

  const salvarAlerta = () => {
    if (!nome || !endereco || cep !== "00000-000") {
      Alert.alert("Preencha todos os campos corretamente!");
      return;
    }

    Alert.alert("Endereço salvo com sucesso!");
    navigation.goBack();
  };

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

      <View style={styles.form}>
        <Text style={styles.label}>Nome do Local</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Minha casa"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Rua A, nº 123, Centro"
          value={endereco}
          onChangeText={setEndereco}
          multiline
        />

        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          placeholder="00000-000"
          value={cep}
          onChangeText={(text) => setCep(formatarCep(text))}
          keyboardType="numeric"
          maxLength={9}
        />

        <TouchableOpacity style={styles.button} onPress={salvarAlerta}>
          <Text style={styles.buttonText}>Salvar Endereço</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NovoAlerta;

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
  form: {
    flex: 1,
    padding: 25,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
    color: "#000",
  },
  input: {
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
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
