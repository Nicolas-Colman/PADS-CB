import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { buscarDadosUsuario } from "../Controlls/user";
import { Ionicons } from "@expo/vector-icons";
import estilo from "../../estilo";


const Empresas = () => {
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
      <View style={estilo.header}>
              <TouchableOpacity onPress={() => navigation.replace('Menu')}>
                <Ionicons name="arrow-back" size={28} color="#fff" />
              </TouchableOpacity>
      
              <Image source={userRefFoto
                ? { uri: userRefFoto }
                : require('../assets/user.png')} style={estilo.perfil} />
              <Text style={estilo.nomeUsuario}>{userOn}</Text>
            </View>


      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.iconeTitulo}>
          <Ionicons name="call" size={36} color="#000" />
          <Text style={styles.titulo}>Empresas</Text>
        </View>

        {/* Energia elétrica */}
        <Text style={styles.subtitulo}>
          <Ionicons name="flash" size={16} color="#F57C00" /> Energia elétrica
        </Text>
        <View style={styles.caixaInfo}>
          <Text style={styles.textoInfo}>
            <Text style={styles.negrito}>Nome:</Text> Bagé Energia Sul{"\n"}
            <Text style={styles.negrito}>Endereço:</Text> Rua General Neto, 512 – Centro, Bagé/RS{"\n"}
            <Text style={styles.negrito}>Contato:</Text> (53) 3242-1010 | atendimento@bageenergiasul.com.br
          </Text>
        </View>

        {/* Água/Esgoto */}
        <Text style={styles.subtitulo}>
          <Ionicons name="water" size={16} color="#039BE5" /> Água/Esgoto
        </Text>
        <View style={styles.caixaInfo}>
          <Text style={styles.textoInfo}>
            <Text style={styles.negrito}>Nome:</Text> BagéSane – Saneamento Bagé{"\n"}
            <Text style={styles.negrito}>Endereço:</Text> Av. Tupy Silveira, 1300 – Centro, Bagé/RS{"\n"}
            <Text style={styles.negrito}>Contato:</Text> (53) 3241-2020 | contato@bagesane.com.br
          </Text>
        </View>

        {/* Coleta de lixo */}
        <Text style={styles.subtitulo}>
          <Ionicons name="trash" size={16} color="#7E57C2" /> Coleta de lixo
        </Text>
        <View style={styles.caixaInfo}>
          <Text style={styles.textoInfo}>
            <Text style={styles.negrito}>Nome:</Text> EcoBagé Limpeza Urbana{"\n"}
            <Text style={styles.negrito}>Endereço:</Text> Rua Melânia Granier, 780 – Bairro Ivo Ferronato, Bagé/RS{"\n"}
            <Text style={styles.negrito}>Contato:</Text> (53) 3243-3030 | ouvidoria@ecobage.com.br
          </Text>
        </View>

        {/* Danos na rua */}
        <Text style={styles.subtitulo}>
          <Ionicons name="construct" size={16} color="#FF9800" /> Danos na rua
        </Text>
        <View style={styles.caixaInfo}>
          <Text style={styles.textoInfo}>
            <Text style={styles.negrito}>Nome:</Text> Secretaria de Obras de Bagé{"\n"}
            <Text style={styles.negrito}>Endereço:</Text> Rua Marcílio Dias, 200 – Centro, Bagé/RS{"\n"}
            <Text style={styles.negrito}>Contato:</Text> (53) 3240-1234 | obras@bage.rs.gov.br
          </Text>
        </View>

        {/* Outros */}
        <Text style={styles.subtitulo}>
          <Ionicons name="business" size={16} color="#607D8B" /> Outros
        </Text>
        <View style={styles.caixaInfo}>
          <Text style={styles.textoInfo}>
            <Text style={styles.negrito}>Nome:</Text> Procon Bagé{"\n"}
            <Text style={styles.negrito}>Endereço:</Text> Rua General Osório, 100 – Centro, Bagé/RS{"\n"}
            <Text style={styles.negrito}>Contato:</Text> (53) 3247-4567 | procon@bage.rs.gov.br
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Empresas;

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
  nome: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
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
  caixaInfo: {
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    padding: 12,
  },
  textoInfo: {
    fontSize: 14,
    color: "#000",
  },
  negrito: {
    fontWeight: "bold",
  },
});
