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
  Modal,
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
  const [refreshing, setRefreshing] = useState(false); // NOVO
  const [busca, setBusca] = useState("");
  const [likeAtivo, setLikeAtivo] = useState<string | null>(null);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [imagemModal, setImagemModal] = useState<string | null>(null);

  useEffect(() => {
    carregarDados();
    buscarOcorrencias();
  }, []);

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
      const userIdPublicador = dados.userId;
      let nomeUsuario = "Usuário";
      try {
        const userDoc = await firestore
          .collection("/Perfil/ClienteDoc/Cliente")
          .doc(userIdPublicador)
          .get();
        if (userDoc.exists) {
          nomeUsuario = userDoc.data()?.userNome || "Sem nome";
        }
      } catch (e) {
        console.warn(`Erro ao buscar usuário ${userIdPublicador}`, e);
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

  // 🔄 Atualiza lista quando usuário puxa para baixo
  const aoAtualizar = async () => {
    setRefreshing(true);
    await buscarOcorrencias();
    setRefreshing(false);
  };

  const irParaMinhasOcorrencias = () => navigation.replace("MinhasOcorrencias");
  const NovaOcorrencia = () => navigation.replace("NovaOcorrencia");

  const curtirOcorrencia = async (ocorId: string, uid: string) => {
    const ocorrenciaRef = firestore
      .collection("/Ocorrencia/OcorrenciaDoc/Ocorrencia")
      .doc(ocorId);

    const likeRef = ocorrenciaRef.collection("likes").doc(uid);
    const likeSnap = await likeRef.get();

    if (likeSnap.exists) {
      await likeRef.delete();
      await ocorrenciaRef.update({ ocorLike: increment(-1) });
      setLikeAtivo(null);
      const atualizadas = ocorrencias
        .map((o) =>
          o.ocorId === ocorId ? { ...o, ocorLike: (o.ocorLike || 1) - 1 } : o
        )
        .sort((a, b) => (b.ocorLike ?? 0) - (a.ocorLike ?? 0));
      setOcorrencias(atualizadas);
    } else {
      await likeRef.set({ createdAt: new Date() });
      await ocorrenciaRef.update({ ocorLike: increment(1) });
      setLikeAtivo(ocorId);
      const atualizadas = ocorrencias
        .map((o) =>
          o.ocorId === ocorId ? { ...o, ocorLike: (o.ocorLike || 0) + 1 } : o
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

  const formatarData = (data: Date) => {
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear().toString().slice(-2);
    return `${dia}/${mes}/${ano}`;
  };

  const abrirModalImagem = (uri: string) => {
    setImagemModal(uri);
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
    setImagemModal(null);
  };

  const renderItem = ({ item }: { item: Ocorrencia }) => (
    <View style={estilo.cardOcorrencia}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={estilo.label}>
            <Text style={estilo.bold}>Nome:</Text> {item.ocorNome}
          </Text>
          <Text style={estilo.label}>
            <Text style={estilo.bold}>Data:</Text>{" "}
            {item.ocorDataRegistro
              ? formatarData(
                  item.ocorDataRegistro.toDate
                    ? item.ocorDataRegistro.toDate()
                    : item.ocorDataRegistro
                )
              : "Sem data"}
          </Text>
          <Text style={estilo.label}>
            <Text style={estilo.bold}>Localização:</Text> {item.ocorEndereco}
          </Text>
          <Text style={estilo.label}>
            <Text style={estilo.bold}>Descrição:</Text> {item.ocorDescricao}
          </Text>

          <View style={estilo.reacoes}>
            <TouchableOpacity
              onPress={() => userId && curtirOcorrencia(item.ocorId!, userId)}
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons
                name="thumbs-up"
                size={20}
                color={likeAtivo === item.ocorId ? "#007bff" : "#555"}
              />
              <Text style={{ color: "#000" }}>{item.ocorLike || 0}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {item.ocorUrlFoto && (
          <TouchableOpacity onPress={() => abrirModalImagem(item.ocorUrlFoto)}>
            <Image
              source={{ uri: item.ocorUrlFoto }}
              style={estilo.ocorrenciaImagem}
            />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View style={estilo.modalBackground}>
          <TouchableOpacity style={estilo.modalCloseArea} onPress={fecharModal} />
          {imagemModal && (
            <Image source={{ uri: imagemModal }} style={estilo.modalImage} />
          )}
          <TouchableOpacity style={estilo.modalBotaoFechar} onPress={fecharModal}>
            <Ionicons name="close" size={36} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
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

      <View style={[estilo.tituloContainer, { justifyContent: "space-between", paddingHorizontal: 20 }]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons name="call" size={32} color="#000" />
          <Text style={estilo.titulo}>Ocorrências</Text>
        </View>

        <TouchableOpacity onPress={irParaMinhasOcorrencias} style={{ padding: 8 }}>
          <Ionicons name="time-outline" size={28} color="#000" />
        </TouchableOpacity>
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
          refreshing={refreshing}
          onRefresh={aoAtualizar}
        />
      )}

      <TouchableOpacity onPress={NovaOcorrencia} style={estilo.botaoNovaOcorrencia}>
        <Text style={estilo.textoBotao}>Registrar nova Ocorrência</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Ocorrencias;
