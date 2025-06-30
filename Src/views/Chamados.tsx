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

const Chamados = () => {
  const navigation = useNavigation();
  const [userRefFoto, setUserRefFoto] = useState("");
  const [userOn, setUserOn] = useState("");
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      const dados = await buscarDadosUsuario();
      setUserRefFoto(dados?.userUrlFoto || "");
      setUserOn(dados?.userNome || "");
    };

    const buscarChamados = async () => {
      const ref = firestore.collection("/Chamados/ChamadosDoc/Chamados");
      const snapshot = await ref.get();
      const lista: Chamado[] = [];

      for (const doc of snapshot.docs) {
        const dados = doc.data();

        const chamado = new Chamado({
          chamId: doc.id,
          chamStatus: dados.chamStatus,
          chamDataCriacao: dados.chamDataCriacao?.toDate?.() || new Date(),
          ocorId: dados.ocorId ?? "",
          prestId: dados.prestId ?? "",
          adminId: dados.adminId ?? "",
        });

        lista.push(chamado);
      }

      lista.sort((a, b) => {
        const dataA = a.chamDataCriacao?.getTime() || 0;
        const dataB = b.chamDataCriacao?.getTime() || 0;
        return dataB - dataA;
      });

      setChamados(lista);
      setCarregando(false);
    };

    carregarDadosUsuario();
    buscarChamados();
  }, []);

  // Filtra pelos status ou ocorId, por exemplo
  const chamadosFiltrados = chamados.filter((chamado) =>
    chamado.chamStatus?.toLowerCase().includes(busca.toLowerCase()) ||
    chamado.ocorId?.toLowerCase().includes(busca.toLowerCase())
  );

  const renderItem = ({ item }: { item: Chamado }) => (
    <View style={{ marginHorizontal: 20, marginBottom: 15 }}>
      <View
        style={{
          backgroundColor: "#D9D9D9",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Text>ID Chamado: {item.chamId}</Text>
        <Text>
          Data:{" "}
          {item.chamDataCriacao
            ? item.chamDataCriacao.toLocaleString()
            : "Sem data"}
        </Text>
        <Text>Status: {item.chamStatus}</Text>
        <Text>ID Ocorrência: {item.ocorId}</Text>
        <Text>ID Prestador: {item.prestId}</Text>
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
        />
      )}
    </View>
  );
};

export default Chamados;
