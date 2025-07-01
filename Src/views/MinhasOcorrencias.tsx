import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import estilo from "../../estilo";
import { buscarDadosUsuario } from "../Controlls/user";
import { firestore } from "../../firebase";

import { Ocorrencia } from "../model/ocorrencia";

const MinhasOcorrencias = () => {
  const navigation = useNavigation();
  const [userRefFoto, setUserRefFoto] = useState("");
  const [userOn, setUserOn] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Modal de imagem
  const [modalVisivel, setModalVisivel] = useState(false);
  const [imagemModal, setImagemModal] = useState<string | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      const dados = await buscarDadosUsuario();
      setUserRefFoto(dados?.userUrlFoto || "");
      setUserOn(dados?.userNome || "");
      setUserId(dados?.userId);
    };

    const buscarMinhasOcorrencias = async () => {
      if (!userId) return;

      setCarregando(true);
      try {
        const ref = firestore.collection("/Ocorrencia/OcorrenciaDoc/Ocorrencia");
        const snapshot = await ref.where("userId", "==", userId).get();

        const lista: Ocorrencia[] = [];

        snapshot.forEach((doc) => {
          const dados = doc.data();
          lista.push({
            ...dados,
            ocorId: doc.id,
          } as Ocorrencia);
        });

        lista.sort((a, b) => {
          if (a.ocorDataRegistro && b.ocorDataRegistro) {
            return b.ocorDataRegistro.toDate
              ? b.ocorDataRegistro.toDate() - a.ocorDataRegistro.toDate()
              : 0;
          }
          return 0;
        });

        setOcorrencias(lista);
      } catch (error) {
        console.warn("Erro ao buscar minhas ocorrências:", error);
      }
      setCarregando(false);
    };

    carregarDados();
    buscarMinhasOcorrencias();
  }, [userId]);

  function formatarData(data: Date) {
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear().toString().slice(-2);
    return `${dia}/${mes}/${ano}`;
  }

  const voltar = () => {
    navigation.replace("Menu", { screen: "Ocorrencia" });
  };

  const abrirModalImagem = (uri: string) => {
    setImagemModal(uri);
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
    setImagemModal(null);
  };

  const excluirOcorrencia = (ocorId: string) => {
    Alert.alert(
      "Excluir Ocorrência",
      "Tem certeza que deseja excluir esta ocorrência?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await firestore
                .collection("/Ocorrencia/OcorrenciaDoc/Ocorrencia")
                .doc(ocorId)
                .delete();

              setOcorrencias((prev) => prev.filter((o) => o.ocorId !== ocorId));
            } catch (error) {
              console.warn("Erro ao excluir ocorrência:", error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Ocorrencia }) => (
    <View style={estilo.cardChamado}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={estilo.label}>
            <Text style={estilo.bold}>Descrição: </Text> {item.ocorDescricao}
          </Text>
          <Text style={estilo.label}>
            <Text style={estilo.bold}>Data: </Text>{" "}
            {item.ocorDataRegistro
              ? formatarData(
                  item.ocorDataRegistro.toDate
                    ? item.ocorDataRegistro.toDate()
                    : item.ocorDataRegistro
                )
              : "Sem data"}
          </Text>
          <Text style={estilo.label}>
            <Text style={estilo.bold}>Status: </Text> {item.ocorStatus || "Sem status"}
          </Text>
        </View>

        {item.ocorUrlFoto && (
          <TouchableOpacity onPress={() => abrirModalImagem(item.ocorUrlFoto)}>
            <Image source={{ uri: item.ocorUrlFoto }} style={estilo.ocorrenciaImagem} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        onPress={() => item.ocorId && excluirOcorrencia(item.ocorId)}
        style={estilo.botaoExcluir}
      >
        <Text style={estilo.textoBotaoExcluir}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={estilo.header}>
        <TouchableOpacity onPress={voltar}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Image
          source={userRefFoto ? { uri: userRefFoto } : require("../assets/user.png")}
          style={estilo.perfil}
        />
        <Text style={estilo.nomeUsuario}>{userOn}</Text>
      </View>

      <View style={estilo.tituloContainer}>
        <Ionicons name="list" size={32} color="#000" />
        <Text style={estilo.titulo}>Minhas Ocorrências</Text>
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#00aa88" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={ocorrencias}
          keyExtractor={(item) => item.ocorId!}
          renderItem={renderItem}
          contentContainerStyle={estilo.listaContainer}
          ListEmptyComponent={
            <Text style={[estilo.label, { textAlign: "center", marginTop: 20 }]}>
              Nenhuma ocorrência registrada.
            </Text>
          }
        />
      )}

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
};

export default MinhasOcorrencias;
