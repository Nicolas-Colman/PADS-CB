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
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace("Menu")}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Image
          source={userRefFoto ? { uri: userRefFoto } : require("../assets/user.png")}
          style={styles.profileImage}
        />

        <Text style={styles.nome}>{userOn}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.iconeTitulo}>
          <Ionicons name="alert-circle" size={36} color="#000" />
          <Text style={styles.titulo}>Meus Alertas</Text>
        </View>

        {alertas.length === 0 ? (
          <Text style={{ color: "#555" }}>Nenhum alerta cadastrado.</Text>
        ) : (
          alertas.map((alerta) => (
            <View key={alerta.id} style={styles.caixaAlerta}>
              <View style={styles.linhaTitulo}>
                <Text style={styles.subtitulo}>NOME</Text>
                <TouchableOpacity onPress={() => deletarAlerta(alerta.id)}>
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.caixaInfo}
                value={alerta.nome}
                editable={false}
              />

              <Text style={styles.subtitulo}>ENDEREÇO</Text>
              <View style={styles.caixaInfo}>
                <Text style={styles.textoInfo}>{alerta.endereco}</Text>
              </View>

              <Text style={styles.subtitulo}>CEP</Text>
              <TextInput
                style={styles.caixaInfo}
                value={alerta.cep}
                editable={false}
              />
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("NovoAlerta")}
        >
          <Text style={styles.buttonText}>Adicionar Endereço</Text>
        </TouchableOpacity>
      </ScrollView>
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
  caixaAlerta: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  linhaTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  caixaInfo: {
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  textoInfo: {
    fontSize: 14,
    color: "#000",
  },
  button: {
    backgroundColor: "#000",
    marginTop: 20,
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
