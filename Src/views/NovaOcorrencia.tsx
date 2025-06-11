import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Ocorrencia } from "../model/ocorrencia";
import { firestore, storage } from "../../firebase";
import { uploadBytes } from "firebase/storage";
import estilo from "../../estilo";

const NovaOcorrencias = () => {
  const navigation = useNavigation();
  const [formOcorrencia, setFormOcorrencia] = useState<Partial<Ocorrencia>>({});
  const [selecionado, setSelecionado] = useState<string>('');
  const [imagePath, setImagePath] = useState('');
  const [locUser, setLocUser] = useState<string>('');
  const [locMapa, setLocMapa] = useState<{ latitude: number; longitude: number }>({ latitude: 0, longitude: 0 });
  const refOcorrencia = firestore.collection("Ocorrencia/OcorrenciaDoc/Ocorrencia");

  const [region, setRegion] = useState({
    latitude: -30.0346,
    longitude: -51.2177,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Precisamos da sua permissão para acessar localização.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      setLocMapa({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setFormOcorrencia((prev) => ({
        ...prev,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
    })();
  }, []);

  const voltar = () => {
    navigation.replace("Menu", { screen: "Ocorrencias" });
  };

  const escolheFoto = () => {
    Alert.alert("Selecionar Foto", "Escolha uma alternativa", [
      { text: "Câmera", onPress: abrirCamera },
      { text: "Galeria", onPress: abrirGaleria },
    ]);
  };

  const abrirCamera = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      alert("Permissão negada para acessar a câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ mediaTypes: "images", allowsEditing: true, quality: 1 });
    enviarImagem(result);
  };

  const abrirGaleria = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      alert("Permissão negada para acessar a galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: "images", allowsEditing: true, quality: 1 });
    enviarImagem(result);
  };

  const enviarImagem = async (result: any) => {
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImagePath(uri);
      const filename = uri.split("/").pop();
      const ref = storage.ref(`ocorImg/${filename}`);
      const img = await fetch(uri);
      const blob = await img.blob();
      const fbResult = await uploadBytes(ref, blob);

      const urlDownload = await storage.ref(fbResult.metadata.fullPath).getDownloadURL();
      setFormOcorrencia({ ...formOcorrencia, ocorUrlFoto: urlDownload });
    } else {
      alert("Envio cancelado!");
    }
  };

  const Enviar = () => {


    Alert.alert(
      "Dados da Ocorrência",
      `Endereço digitado: ${locUser}\n\nLocalização no mapa:\nLatitude: ${locMapa.latitude}\nLongitude: ${locMapa.longitude}`
    );

  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#EAF8F7' }}>
      <ScrollView style={estilo.scrollContainer}>

        {/* Header */}
        <View style={estilo.header}>
          <TouchableOpacity onPress={voltar}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Image source={require("../assets/camera.png")} style={estilo.perfil} />
          <Text style={estilo.nomeUsuario}>Júlia Martins</Text>
        </View>

        {/* Título */}
        <View style={estilo.tituloContainer}>
          <Ionicons name="call" size={32} color="#000" />
          <Text style={estilo.titulo}>Registrar Ocorrência</Text>
        </View>

        {/* Categoria */}
        <Text style={estilo.label}>CATEGORIA</Text>
        <View style={estilo.input}>
          <Picker
            selectedValue={formOcorrencia.ocorTipo}
            onValueChange={(itemValue) =>
              setFormOcorrencia({ ...formOcorrencia, ocorTipo: itemValue })
            }
            dropdownIconColor="#000"

          >
            <Picker.Item label="Selecionar Categoria" value="" enabled={false} />
            <Picker.Item label="Energia Elétrica" value="energia" />
            <Picker.Item label="Água/Esgoto" value="agua" />
            <Picker.Item label="Coleta de Lixo" value="lixo" />
            <Picker.Item label="Buraco na Via" value="buraco" />
            <Picker.Item label="Outros" value="outros" />
          </Picker>
        </View>

        {/* Descrição */}
        <Text style={estilo.label}>DESCRIÇÃO DO PROBLEMA</Text>
        <TextInput
          placeholder="Ex: Ficamos sem energia desde ontem à noite..."
          placeholderTextColor="#333"
          style={[estilo.input, estilo.textarea]}
          multiline
          value={formOcorrencia.ocorDescricao}
          onChangeText={(text) => setFormOcorrencia({ ...formOcorrencia, ocorDescricao: text })}
        />

        {/* Endereço manual */}
        <Text style={estilo.label}>ENDEREÇO</Text>
        <TextInput
          placeholder="Digite seu endereço"
          placeholderTextColor="#333"
          style={estilo.input}
          value={formOcorrencia.ocorEndereco}
          onChangeText={texto => setFormOcorrencia({ ...formOcorrencia, ocorEndereco: texto })}
        />

        {/* Mapa */}
        <Text style={estilo.label}>LOCALIZAÇÃO</Text>
        <View style={estilo.mapa}>
          <MapView
            showsUserLocation={true}
            showsMyLocationButton={true}
            style={{ flex: 1 }}
            region={region}
            onRegionChangeComplete={(reg) => {
              setRegion(reg);
              setLocMapa({
                latitude: reg.latitude,
                longitude: reg.longitude,
              });
              setFormOcorrencia((prev) => ({
                ...prev,
                ocorLatitude: reg.latitude,
                ocorLongitude: reg.longitude,
              }));
            }}
          />
          {/* Pin fixo no centro */}
          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginLeft: -24,
              marginTop: -48,
            }}
          >
            <Image source={require("../assets/pin.png")} style={{ width: 20, height: 20 }} />
          </View>
        </View>

        {/* Upload */}
        <Text style={estilo.label}>ANEXAR FOTO</Text>
        <TouchableOpacity style={estilo.upload} onPress={escolheFoto}>
          <Ionicons name="camera" size={24} color="#000" />
          <Text style={estilo.uploadText}>Upload de imagem</Text>
        </TouchableOpacity>

        {imagePath !== "" && (
          <Image source={{ uri: imagePath }} style={estilo.preview} />
        )}

        {/* Botão */}
        <TouchableOpacity style={estilo.botao} onPress={Enviar}>
          <Text style={estilo.textoBotao}>Registrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NovaOcorrencias;
