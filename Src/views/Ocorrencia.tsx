import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import estilo from "../../estilo";
import { buscarDadosUsuario } from "../Controlls/user";
import { firestore, increment } from "../../firebase";

import { Ocorrencia } from "../model/ocorrencia";

const Ocorrencias = () => {
  const navigation = useNavigation();
  const [userRefFoto, setUserRefFoto] = useState("");
  const [userOn, setUserOn] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [likeAtivo, setLikeAtivo] = useState<string | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      const dados = await buscarDadosUsuario();
      setUserRefFoto(dados?.userUrlFoto || "");
      setUserOn(dados?.userNome || "");
      setUserId(dados?.userId); 
    };

    const buscarOcorrencias = async () => {
      const ref = firestore.collection("/Ocorrencia/OcorrenciaDoc/Ocorrencia");
      const snapshot = await ref.get();
      const lista: Ocorrencia[] = [];

      for (const doc of snapshot.docs) {
        const dados = doc.data();
        const ocorrencia = new Ocorrencia({
          ...dados,
          ocorId: doc.id,
          ocorLike: dados.ocorLike ?? 0,
          ocorDeslike: dados.ocorDeslike ?? 0,
          
        });

        let nomeUsuario = "Usuário";
        try {
          const userDoc = await firestore
            .collection("/Perfil/ClienteDoc/Cliente")
            .doc(dados.userId)
            .get();
          if (userDoc.exists) {
            nomeUsuario = userDoc.data()?.userNome || "Sem nome";
          }
        } catch (e) {
          console.warn(`Erro ao buscar usuário ${dados.userId}`, e);
        }

        
        lista.push({
            ...dados,
            ocorId: doc.id,
            ocorNome: nomeUsuario, 
          } as Ocorrencia);
      }

      lista.sort((a, b) => (b.ocorLike ?? 0) - (a.ocorLike ?? 0));
      setOcorrencias(lista);
      setCarregando(false);
    };

    carregarDados();
    buscarOcorrencias();
  }, []);

  const NovaOcorrencia = () => {
    navigation.replace("NovaOcorrencia");
  };

  const curtirOcorrencia = async (ocorId: string, uid: string) => {
  const ocorrenciaRef = firestore
    .collection("/Ocorrencia/OcorrenciaDoc/Ocorrencia")
    .doc(ocorId);

  const likeRef = ocorrenciaRef.collection("likes").doc(uid);

  const likeSnap = await likeRef.get();

  if (likeSnap.exists) {
    // Remove o like
    await likeRef.delete();
    await ocorrenciaRef.update({
      ocorLike: increment(-1),
    });

    setLikeAtivo(null);

    const atualizadas = ocorrencias
      .map((o) =>
        o.ocorId === ocorId
          ? { ...o, ocorLike: (o.ocorLike || 1) - 1 }
          : o
      )
      .sort((a, b) => (b.ocorLike ?? 0) - (a.ocorLike ?? 0));
    setOcorrencias(atualizadas);
  } else {
    // Adiciona o like
    await likeRef.set({
      createdAt: new Date(),
    });

    await ocorrenciaRef.update({
      ocorLike: increment(1),
    });

    setLikeAtivo(ocorId);

    const atualizadas = ocorrencias
      .map((o) =>
        o.ocorId === ocorId
          ? { ...o, ocorLike: (o.ocorLike || 0) + 1 }
          : o
      )
      .sort((a, b) => (b.ocorLike ?? 0) - (a.ocorLike ?? 0));
    setOcorrencias(atualizadas);
  }
};


  const ocorrenciasFiltradas = ocorrencias.filter((ocor) => {
    const textoBusca = busca.toLowerCase();
    return (
      ocor.ocorTipo?.toLowerCase().includes(textoBusca) ||
      ocor.ocorDescricao?.toLowerCase().includes(textoBusca) ||
      ocor.ocorEndereco?.toLowerCase().includes(textoBusca) ||
      ocor.ocorNome?.toLowerCase().includes(textoBusca)
    );
  });

  const renderItem = ({ item }: { item: Ocorrencia }) => (
    <View style={estilo.card}>
      <Text>Nome: {item.ocorNome}</Text>
      <Text>
        Data:{" "}
        {item.ocorDataRegistro?.toDate
          ? item.ocorDataRegistro.toDate().toLocaleString()
          : new Date(item.ocorDataRegistro).toLocaleString()}
      </Text>

      <Text>Localização: {item.ocorEndereco}</Text>
      <Text>Descrição: {item.ocorDescricao}</Text>
      <View style={estilo.reacoes}>
        <TouchableOpacity
          onPress={() => userId && curtirOcorrencia(item.ocorId!, userId)}
        >
          <Ionicons
            name="thumbs-up-outline"
            size={20}
            color={likeAtivo === item.ocorId ? "#007bff" : "#555"}
          />
          <Text>{item.ocorLike}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={estilo.header}>
        <TouchableOpacity onPress={() => navigation.replace("Menu")}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Image
          source={userRefFoto ? { uri: userRefFoto } : require("../assets/user.png")}
          style={estilo.perfil}
        />
        <Text style={estilo.nomeUsuario}>{userOn}</Text>
      </View>

      <View style={estilo.tituloContainer}>
        <Ionicons name="call" size={32} color="#000" />
        <Text style={estilo.titulo}>Ocorrências</Text>
      </View>

      <View style={estilo.buscaContainer}>
        <Ionicons name="search" size={20} color="#555" />
        <TextInput
          placeholder="Buscar Ocorrência"
          style={estilo.inputBusca}
          placeholderTextColor="#555"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#00aa88" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={ocorrenciasFiltradas}
          keyExtractor={(item) => item.ocorId!}
          renderItem={renderItem}
          contentContainerStyle={estilo.listaContainer}
        />
      )}

      <TouchableOpacity onPress={NovaOcorrencia} style={estilo.botaoNovaOcorrencia}>
        <Text style={estilo.textoBotao}>Registrar nova Ocorrência</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Ocorrencias;