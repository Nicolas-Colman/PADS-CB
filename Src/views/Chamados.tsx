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
import { firestore } from "../../firebase";
import { Chamado } from "../model/chamado";

type ChamadoCompleto = Chamado & {
  ocorDescricao?: string;
  ocorNomeUsuario?: string;
};

const Chamados = () => {
  const navigation = useNavigation();
  const [userRefFoto, setUserRefFoto] = useState("");
  const [userOn, setUserOn] = useState("");
  const [chamados, setChamados] = useState<ChamadoCompleto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // NOVO
  const [busca, setBusca] = useState("");

  useEffect(() => {
    carregarDadosUsuario();
    buscarChamadosComDetalhes();
  }, []);

  const carregarDadosUsuario = async () => {
    const dados = await buscarDadosUsuario();
    setUserRefFoto(dados?.userUrlFoto || "");
    setUserOn(dados?.userNome || "");
  };

  const buscarChamadosComDetalhes = async () => {
    try {
      const refChamados = firestore.collection("/Chamados/ChamadosDoc/Chamados");
      const snapshotChamados = await refChamados.get();
      const listaCompleta: ChamadoCompleto[] = [];

      for (const docChamado of snapshotChamados.docs) {
        const dadosChamado = docChamado.data();
        const chamado = new Chamado({
          chamId: docChamado.id,
          chamStatus: dadosChamado.chamStatus,
          chamDataCriacao: dadosChamado.chamDataCriacao?.toDate?.() || new Date(0),
          ocorId: dadosChamado.ocorId ?? "",
          prestId: dadosChamado.prestId ?? "",
          adminId: dadosChamado.adminId ?? "",
        });

        let ocorDescricao = "Sem descrição";
        let ocorDataRegistro = new Date(0);
        let ocorNomeUsuario = "Usuário";
        let ocorUrlFoto = "";

        if (chamado.ocorId) {
          const docOcorrencia = await firestore
            .collection("/Ocorrencia/OcorrenciaDoc/Ocorrencia")
            .doc(chamado.ocorId)
            .get();

          if (docOcorrencia.exists) {
            const dadosOcorrencia = docOcorrencia.data();
            ocorDescricao = dadosOcorrencia?.ocorDescricao || ocorDescricao;

            if (dadosOcorrencia?.ocorDataRegistro?.toDate) {
              ocorDataRegistro = dadosOcorrencia.ocorDataRegistro.toDate();
            } else if (dadosOcorrencia?.ocorDataRegistro) {
              ocorDataRegistro = new Date(dadosOcorrencia.ocorDataRegistro);
            }

            const userIdPublicador = dadosOcorrencia?.userId;
            if (userIdPublicador) {
              const userDoc = await firestore
                .collection("/Perfil/ClienteDoc/Cliente")
                .doc(userIdPublicador)
                .get();

              if (userDoc.exists) {
                ocorNomeUsuario = userDoc.data()?.userNome || ocorNomeUsuario;
                ocorUrlFoto = userDoc.data()?.userUrlFoto || "";
              }
            }
          }
        }

        listaCompleta.push({
          ...chamado,
          ocorDescricao,
          ocorDataRegistro,
          ocorNomeUsuario,
          ocorUrlFoto,
        });
      }

      listaCompleta.sort((a, b) => {
        const dataA = a.chamDataCriacao?.getTime() || 0;
        const dataB = b.chamDataCriacao?.getTime() || 0;
        return dataB - dataA;
      });

      setChamados(listaCompleta);
    } catch (error) {
      console.error("Erro ao buscar chamados com detalhes:", error);
    } finally {
      setCarregando(false);
    }
  };

  // 🔄 Atualização por pull-to-refresh
  const aoAtualizar = async () => {
    setRefreshing(true);
    await buscarChamadosComDetalhes();
    setRefreshing(false);
  };

  const chamadosFiltrados = chamados.filter(
    (chamado) =>
      (chamado.ocorDescricao?.toLowerCase().includes(busca.toLowerCase()) ||
        chamado.ocorNomeUsuario?.toLowerCase().includes(busca.toLowerCase()) ||
        chamado.chamStatus?.toLowerCase().includes(busca.toLowerCase()) ||
        chamado.prestId?.toLowerCase().includes(busca.toLowerCase())) ?? false
  );

  function formatarData(data: Date) {
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear().toString().slice(-2);
    return `${dia}/${mes}/${ano}`;
  }

  const renderItem = ({ item }: { item: ChamadoCompleto }) => (
    <View style={estilo.cardChamado}>
      <Text style={estilo.label}>
        <Text style={estilo.bold}>Usuário:</Text> {item.ocorNomeUsuario}
      </Text>
      <Text style={estilo.label}>
        <Text style={estilo.bold}>Data:</Text>{" "}
        {item.chamDataCriacao ? formatarData(item.chamDataCriacao) : "Sem data"}
      </Text>
      <Text style={estilo.label}>
        <Text style={estilo.bold}>Status:</Text> {item.chamStatus}
      </Text>
      <Text style={estilo.label}>
        <Text style={estilo.bold}>Descrição:</Text> {item.ocorDescricao}
      </Text>
      <Text style={estilo.label}>
        <Text style={estilo.bold}>ID Prestador:</Text> {item.prestId}
      </Text>
    </View>
  );

  return (
    <View style={estilo.container}>
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
        <Ionicons name="list" size={32} color="#000" />
        <Text style={estilo.titulo}>Chamados</Text>
      </View>

      <View style={estilo.buscaContainer}>
        <Ionicons name="search" size={20} color="#555" />
        <TextInput
          placeholder="Buscar Chamado"
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
          data={chamadosFiltrados}
          keyExtractor={(item) => item.chamId || Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={estilo.listaContainer}
          refreshing={refreshing}           // 👈 atualizando
          onRefresh={aoAtualizar}           // 👈 callback ao puxar
        />
      )}
    </View>
  );
};

export default Chamados;

