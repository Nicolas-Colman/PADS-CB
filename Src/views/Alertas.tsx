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
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { buscarDadosUsuario } from "../Controlls/user";
import { firestore } from "../../firebase";
import estilo from "../../estilo";

const Alertas = () => {
  const navigation = useNavigation();

  const [userRefFoto, setUserRefFoto] = useState('');
  const [userOn, setUserOn] = useState('');
  const [alertas, setAlertas] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dados = await buscarDadosUsuario();
        setUserRefFoto(dados?.userUrlFoto || null);
        setUserOn(dados?.userNome || null);
        setUserId(dados?.userId || '');

        if (!dados?.userId) return;

        const snapshot = await firestore
          .collection(`/Perfil/ClienteDoc/Cliente/${dados.userId}/Alertas`)
          .orderBy("criadoEm", "desc")
          .get();

        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setAlertas(lista);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };

    carregarDados();
  }, []);

  const deletarAlerta = async (alertaId: string) => {
    try {
      await firestore
        .doc(`/Perfil/ClienteDoc/Cliente/${userId}/Alertas/${alertaId}`)
        .delete();

      setAlertas(prev => prev.filter(item => item.id !== alertaId));
      Alert.alert("Alerta removido com sucesso!");
    } catch (err) {
      console.error("Erro ao deletar alerta:", err);
      Alert.alert("Erro ao deletar o alerta.");
    }
  };

  return (
    <KeyboardAvoidingView style={estilo.container}>
      <View style={estilo.header}>
        <TouchableOpacity onPress={() => navigation.replace("Menu")}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Image
          source={userRefFoto ? { uri: userRefFoto } : require("../assets/user.png")}
          style={estilo.profileImage}
        />

        <Text style={estilo.nome}>{userOn}</Text>
      </View>

      <ScrollView contentContainerStyle={estilo.conteudo}>
        <View style={estilo.iconeTitulo}>
          <Ionicons name="alert-circle" size={36} color="#000" />
          <Text style={estilo.titulo}>Meus Alertas</Text>
        </View>

        {alertas.length === 0 ? (
          <Text style={{ color: "#555" }}>Nenhum alerta cadastrado.</Text>
        ) : (
          alertas.map((alerta) => (
            <View key={alerta.id} style={estilo.caixaAlerta}>
              <View style={estilo.linhaTitulo}>
                <Text style={estilo.subtitulo}>NOME</Text>
                <TouchableOpacity onPress={() => deletarAlerta(alerta.id)}>
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
              <TextInput
                style={estilo.caixaInfo}
                value={alerta.nome}
                editable={false}
              />

              <Text style={estilo.subtitulo}>ENDEREÇO</Text>
              <View style={estilo.caixaInfo}>
                <Text style={estilo.textoInfo}>{alerta.endereco}</Text>
              </View>

              <Text style={estilo.subtitulo}>CEP</Text>
              <TextInput
                style={estilo.caixaInfo}
                value={alerta.cep}
                editable={false}
              />
            </View>
          ))
        )}

        <TouchableOpacity
          style={estilo.button}
          onPress={() => navigation.replace("NovoAlerta")}
        >
          <Text style={estilo.buttonText}>Adicionar Endereço</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Alertas;


