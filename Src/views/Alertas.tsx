import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
import { buscarDadosUsuario } from "../Controlls/user";
import estilo from "../../estilo";


const Alertas = () => {
  const navigation = useNavigation();

  const [userRefFoto, setUserRefFoto] = useState('');
  const [userOn, setUserOn] = useState('');


  useEffect(() => {
    const carregarFoto = async () => {
      try {
        const dados = await buscarDadosUsuario();
        setUserRefFoto(dados?.userUrlFoto || null);
        setUserOn(dados?.userNome || null);
      } catch (err) {
        console.error('Erro ao carregar dados do usuário:', err);
      }
    };

    carregarFoto();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Topo com seta, nome e imagem */}
      <View style={estilo.header}>
        <TouchableOpacity onPress={() => navigation.replace('Menu')}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Image source={userRefFoto
          ? { uri: userRefFoto }
          : require('../assets/user.png')} style={estilo.perfil} />
        <Text style={estilo.nomeUsuario}>{userOn}</Text>
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
