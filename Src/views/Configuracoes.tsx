import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import estilo from "../../estilo";
import { buscarDadosUsuario } from "../Controlls/user";
import { firestore, storage } from "../../firebase";

const Configuracoes = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState<string | null>(null);
  const [userNome, setUserNome] = useState("");
  const [novaFoto, setNovaFoto] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      const dados = await buscarDadosUsuario();
      setUserId(dados?.userId);
      setUserNome(dados?.userNome || "");
      setNovaFoto(dados?.userUrlFoto || null);
      setCarregando(false);
    };

    carregarDados();
  }, []);

  const escolherImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!resultado.canceled) {
      setNovaFoto(resultado.assets[0].uri);
    }
  };

  const salvarAlteracoes = async () => {
    if (!userId) return;

    setSalvando(true);

    let urlFotoFinal = novaFoto;

    // Se nova foto for local, faz upload
    if (novaFoto && !novaFoto.startsWith("https://")) {
      const blob = await fetch(novaFoto).then((res) => res.blob());
      const ref = storage.ref().child(`usuarios/${userId}.jpg`);
      await ref.put(blob);
      urlFotoFinal = await ref.getDownloadURL();
    }

    try {
      await firestore.collection("/Perfil/ClienteDoc/Cliente").doc(userId).update({
        userNome,
        userUrlFoto: urlFotoFinal,
      });

      Alert.alert("Sucesso", "Perfil atualizado!");
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return <ActivityIndicator size="large" color="#00aa88" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={estilo.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Image
          source={novaFoto ? { uri: novaFoto } : require("../assets/user.png")}
          style={estilo.perfil}
        />
        <Text style={estilo.nomeUsuario}>{userNome}</Text>
      </View>

      <View style={estilo.tituloContainer}>
        <Ionicons name="settings" size={32} color="#000" />
        <Text style={estilo.titulo}>Configurações</Text>
      </View>

      <View style={estilo.formContainer}>
        <TouchableOpacity onPress={escolherImagem}>
          <Image
            source={novaFoto ? { uri: novaFoto } : require("../assets/user.png")}
            style={[estilo.perfil, { alignSelf: "center", marginBottom: 20 }]}
          />
        </TouchableOpacity>

        <Text style={estilo.label}>Nome de Usuário:</Text>
        <TextInput
          style={estilo.input}
          placeholder="Digite seu nome"
          value={userNome}
          onChangeText={setUserNome}
        />

        <TouchableOpacity
          style={estilo.botaoSalvar}
          onPress={salvarAlteracoes}
          disabled={salvando}
        >
          <Text style={estilo.textoBotao}>
            {salvando ? "Salvando..." : "Salvar Alterações"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Configuracoes;
