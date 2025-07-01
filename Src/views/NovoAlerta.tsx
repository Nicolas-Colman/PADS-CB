import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { buscarDadosUsuario } from "../Controlls/user";
import { firestore } from "../../firebase";

const NovoAlerta = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [userRefFoto, setUserRefFoto] = useState("");
  const [userOn, setUserOn] = useState("");

  const voltar = () =>{
    
    navigation.replace("Menu", { screen: "Alerta" });
  }
  useEffect(() => {
    const carregarFotoENome = async () => {
      try {
        const dados = await buscarDadosUsuario();
        setUserRefFoto(dados?.userUrlFoto || "");
        setUserOn(dados?.userNome || "");
      } catch (err) {
        console.error("Erro ao carregar dados do usuário:", err);
      }
    };

    carregarFotoENome();
  }, []);

  const formatarCep = (valor: string) => {
    const cepNumerico = valor.replace(/\D/g, "");
    if (cepNumerico.length <= 5) {
      return cepNumerico;
    }
    return `${cepNumerico.slice(0, 5)}-${cepNumerico.slice(5, 8)}`;
  };


const salvarAlerta = async () => {
  if (!nome || !endereco || cep.length !== 9) {
    Alert.alert("Preencha todos os campos corretamente!");
    return;
  }

  try {
    const dados = await buscarDadosUsuario();
    const userId = dados?.userId;

    if (!userId) {
      Alert.alert("Usuário não autenticado!");
      return;
    }

    await firestore
      .collection(`/Perfil/ClienteDoc/Cliente/${userId}/Alertas`)
      .add({
        nome,
        endereco,
        cep,
        criadoEm: new Date(),
      });

    Alert.alert("Endereço salvo com sucesso!");
    navigation.replace("Menu", { screen: "Alerta" });
  } catch (error) {
    console.error("Erro ao salvar alerta:", error);
    Alert.alert("Erro ao salvar o endereço!");
  }
};


  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Cabeçalho com seta, imagem e nome */}
      <View style={styles.header}>
        <TouchableOpacity onPress={voltar}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Image
          source={userRefFoto ? { uri: userRefFoto } : require("../assets/user.png")}
          style={styles.profileImage}
        />

        <Text style={styles.nome}>{userOn}</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.iconeTitulo}>
          <Ionicons name="add-circle" size={36} color="#000" />
          <Text style={styles.titulo}>Novo Alerta</Text>
        </View>

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
  iconeTitulo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
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
