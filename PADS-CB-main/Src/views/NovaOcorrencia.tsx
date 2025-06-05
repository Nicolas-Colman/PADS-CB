import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const NovaOcorrencia = () => {
  const navigation = useNavigation();
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const categorias = [
    { id: "energia", label: "ENERGIA ELÉTRICA", icon: "flash", cor: "#F57C00" },
    { id: "agua", label: "ÁGUA/ESGOTO", icon: "water", cor: "#039BE5" },
    { id: "lixo", label: "COLETA DE LIXO", icon: "trash", cor: "#7E57C2" },
    { id: "buraco", label: "BURACO NA VIA", icon: "ellipse", cor: "#000" },
    { id: "outros", label: "OUTROS (GERAL)", icon: "megaphone", cor: "#EC407A" },
  ];

  const selecionarImagem = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      alert("Permissão negada para acessar a galeria.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagemSelecionada(resultado.assets[0].uri);
    }
  };

  const registrarOcorrencia = () => {
    navigation.navigate("Ocorrencias"); 
  };


  const voltar =() =>{
    navigation.replace('Menu', {screen: 'Ocorrencias'});
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={voltar}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Image source={require("../assets/julia.png")} style={styles.perfil} />
        <Text style={styles.nomeUsuario}>Júlia Martins</Text>
      </View>

      {/* Título */}
      <View style={styles.tituloContainer}>
        <Ionicons name="call" size={32} color="#000" />
        <Text style={styles.titulo}>Registrar Ocorrência</Text>
      </View>

      {/* Categoria */}
      <Text style={styles.label}>CATEGORIA</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setMostrarCategorias(!mostrarCategorias)}
      >
        <Text style={{ color: categoriaSelecionada ? "#000" : "#555" }}>
          {categoriaSelecionada || "Selecionar Categoria"}
        </Text>
      </TouchableOpacity>

      {mostrarCategorias && (
        <View style={styles.categoriasContainer}>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoriaItem}
              onPress={() => {
                setCategoriaSelecionada(cat.label);
                setMostrarCategorias(false);
              }}
            >
              <Ionicons name={cat.icon} size={18} color={cat.cor} />
              <Text style={styles.categoriaTexto}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Localização */}
      <Text style={styles.label}>LOCALIZAÇÃO</Text>
      <TextInput
        placeholder="Av. Itália Nº322 - Centro - 96450-000"
        placeholderTextColor="#333"
        style={styles.input}
      />

      {/* Descrição */}
      <Text style={styles.label}>DESCRIÇÃO DO PROBLEMA</Text>
      <TextInput
        placeholder="Ex: Ficamos sem energia desde ontem à noite, toda a quadra está no escuro."
        placeholderTextColor="#333"
        style={[styles.input, styles.textarea]}
        multiline
      />

      {/* Upload */}
      <Text style={styles.label}>ANEXAR FOTOS</Text>
      <TouchableOpacity style={styles.upload} onPress={selecionarImagem}>
        <Ionicons name="camera" size={24} color="#000" />
        <Text style={styles.uploadText}>Upload de arquivos</Text>
      </TouchableOpacity>

      {imagemSelecionada && (
        <Image source={{ uri: imagemSelecionada }} style={styles.preview} />
      )}

      {/* Botão */}
      <TouchableOpacity style={styles.botao} onPress={registrarOcorrencia}>
        <Text style={styles.textoBotao}>Registrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NovaOcorrencia;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    backgroundColor: "#EFFFF8",
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
  nomeUsuario: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
  },
  perfil: {
    width: 60,
    height: 65,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
    marginLeft: 10,
  },
  tituloContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginHorizontal: 25,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  label: {
    marginTop: 20,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 25,
  },
  input: {
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    padding: 12,
    fontSize: 14,
    color: "#000",
    marginHorizontal: 25,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  upload: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    padding: 16,
    borderRadius: 60,
    gap: 10,
    marginHorizontal: 25,
  },
  uploadText: {
    fontWeight: "bold",
    color: "#000",
  },
  preview: {
    width: "90%",
    height: 180,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 20,
  },
  botao: {
    backgroundColor: "#000",
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 50,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  categoriasContainer: {
    marginTop: 10,
    marginBottom: 10,
    gap: 10,
    marginHorizontal: 25,
  },
  categoriaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 12,
    gap: 10,
  },
  categoriaTexto: {
    fontSize: 14,
    color: "#000",
  },
});
