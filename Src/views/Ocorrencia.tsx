import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import estilo from "../../estilo";
import { buscarDadosUsuario } from "../Controlls/user";
import { firestore } from "../../firebase"; // certifique-se do caminho correto

interface Ocorrencia {
  ocorId: string;
  ocorTitulo: string;
  ocorDescricao: string;
  ocorUrlFoto?: string;
  ocorNome: string;
  ocorDataRegistro: string;
  ocorEndereco: string;
}

const Ocorrencias = () => {
  const navigation = useNavigation();
  const [userRefFoto, setUserRefFoto] = useState('');
  const [userOn, setUserOn] = useState('');
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dados = await buscarDadosUsuario();
        setUserRefFoto(dados?.userUrlFoto || '');
        setUserOn(dados?.userNome || '');
      } catch (err) {
        console.error('Erro ao carregar dados do usuário:', err);
      }
    };

    const buscarOcorrencias = async () => {
      try {
        const ref = firestore.collection('/Ocorrencia/OcorrenciaDoc/Ocorrencia');
        const snapshot = await ref.get();
        const lista: Ocorrencia[] = [];

        for (const doc of snapshot.docs) {
          const dados = doc.data();
          let nomeUsuario = 'Usuário';
          let data = 'Sem informações';

          try {
            const userDoc = await firestore
              .doc(`/Perfil/ClienteDoc/Cliente/${dados.userId}`)
              .get();
            if (userDoc.exists) {
              nomeUsuario = userDoc.data()?.userNome || 'Sem nome';
              data = userDoc.data()?.ocorDataRegistro || 'Sem Informações';
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

        setOcorrencias(lista);
      } catch (err) {
        console.error('Erro ao buscar ocorrências:', err);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
    buscarOcorrencias();
  }, []);

  const NovaOcorrencia = () => {
    navigation.replace('NovaOcorrencia');
  };

  const renderItem = ({ item }: { item: Ocorrencia }) => (
    <View style={estilo.card}>
      <Text>Nome: {item.ocorNome}</Text>
      <Text>Data: {item.ocorData}</Text>
      <Text>Localização: {item.ocorEndereco}</Text>
      <Text>Descrição: {item.ocorDescricao}</Text>
      <View style={estilo.reacoes}>
        <Ionicons name="thumbs-up-outline" size={20} color="#555" />
        <Ionicons name="thumbs-down-outline" size={20} color="#555" />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* TOPO */}
      <View style={estilo.header}>
        <TouchableOpacity onPress={() => navigation.replace('Menu')}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Image
          source={
            userRefFoto
              ? { uri: userRefFoto }
              : require('../assets/user.png')
          }
          style={estilo.perfil}
        />
        <Text style={estilo.nomeUsuario}>{userOn}</Text>
      </View>

      {/* TÍTULO */}
      <View style={estilo.tituloContainer}>
        <Ionicons name="call" size={32} color="#000" />
        <Text style={estilo.titulo}>Ocorrências</Text>
      </View>

      {/* CAMPO DE BUSCA (funcionalidade futura) */}
      <View style={estilo.buscaContainer}>
        <Ionicons name="search" size={20} color="#555" />
        <TextInput
          placeholder="Buscar Ocorrência"
          style={estilo.inputBusca}
          placeholderTextColor="#555"
        />
      </View>

      {/* LISTA DE OCORRÊNCIAS */}
      {carregando ? (
        <ActivityIndicator size="large" color="#00aa88" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={ocorrencias}
          keyExtractor={(item) => item.ocorId}
          renderItem={renderItem}
          contentContainerStyle={estilo.listaContainer}
        />
      )}

      {/* BOTÃO */}
      <TouchableOpacity onPress={NovaOcorrencia} style={estilo.botaoNovaOcorrencia}>
        <Text style={estilo.textoBotao}>Registrar nova Ocorrência</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Ocorrencias;
