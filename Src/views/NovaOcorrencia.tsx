import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState, useEffect } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, Pressable, Image, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import estilo from "../../estilo";
import Icon from 'react-native-vector-icons/Ionicons';
import { Ocorrencia } from "../model/ocorrencia";
import { firestore, storage } from "../../firebase";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from "expo-image-picker";


const NovaOcorrencias = () => {

    const [formOcorrencia, setFormOcorrencia] = useState<Partial<Ocorrencia>>({});
    const refOcorrencia = firestore.collection("Ocorrencia/OcorrenciaDoc/Ocorrencia");

    const navigation = useNavigation();

    const [selecionado, setSelecionado] = useState<string>('');

    const [imagePath, setImagePath] = useState('');

    // Estado da região do mapa
    const [region, setRegion] = useState({
        latitude: -30.0346, // valor padrão
        longitude: -51.2177,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    // Pega localização do usuário ao montar o componente
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

            // Você pode salvar essa localização no formOcorrencia, se quiser
            setFormOcorrencia((prev) => ({
                ...prev,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }));
        })();
    }, []);

    const escolheFoto = () => {
        Alert.alert(
            "Selecionar Foto",
            "Escolha uma alternativa",
            [
                {
                    text: "Câmera",
                    onPress: () => abrirCamera()
                },
                {
                    text: "Abrir Galeria",
                    onPress: () => abrirGaleria()
                }
            ]
        );
    };

    const abrirCamera = async () => {
        const permissao = await ImagePicker.requestCameraPermissionsAsync();
        if (permissao.granted === false) {
            alert("Você recusou a permissão de acesso à câmera.");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        enviarImagem(result);
    };

    const abrirGaleria = async () => {
        const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissao.granted === false) {
            alert("Você recusou a permissão de acesso à galeria.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        enviarImagem(result);
    };

    const enviarImagem = async (result) => {
        if (!result.canceled) {
            setImagePath(result.assets[0].uri);
            let filename = result.assets[0].fileName;
            const ref = storage.ref(`ocorImg/${filename}`);

            const img = await fetch(result.assets[0].uri);
            const bytes = await img.blob();
            const fbResult = await uploadBytes(ref, bytes);

            const urlDownload = await storage.ref(
                fbResult.metadata.fullPath).getDownloadURL();

            console.log("URL da foto:", urlDownload);
            setFormOcorrencia({ ...formOcorrencia, ocorUrlFoto: urlDownload });

        } else {
            alert("Envio cancelado!");
        }
    };

    const voltar = () => {
        navigation.replace('Menu', { screen: 'Ocorrencias' });
    };

    const Enviar = () => {
        alert('Ocorrencia criada');
        // Aqui você pode adicionar envio para o firestore usando formOcorrencia
    };

    return (
        <KeyboardAvoidingView style={estilo.tela}>
            <TouchableOpacity onPress={voltar}>
                <Icon
                    name="arrow-back-circle-outline"
                    size={30}
                    color="#000"
                />
            </TouchableOpacity>

            <View>
                <Text>Nova Ocorrencias</Text>

                <View>
                    <Text>Categoria:</Text>
                    <Picker
                        selectedValue={selecionado}
                        onValueChange={(itemValue) => setSelecionado(itemValue)}
                        style={{ height: 50, width: 200 }}
                    >
                        <Picker.Item label="-- Selecione --" value="" enabled={false} />
                        <Picker.Item label="Energia Elétrica" value="energia" />
                        <Picker.Item label="Água ou Esgoto" value="agua" />
                        <Picker.Item label="Coleta de lixo" value="lixo" />
                        <Picker.Item label="Problemas na via" value="estradas" />
                        <Picker.Item label="Outros" value="outros" />
                    </Picker>
                </View>

                <View>
                    <TextInput
                        placeholder="Descrição"
                        multiline
                        onChangeText={(text) => setFormOcorrencia({ ...formOcorrencia, descricao: text })}
                        style={{borderWidth:1, borderColor:"#999", borderRadius:5, padding:8, marginVertical:5, height:80}}
                    />
                </View>

                <View style={{ height: 150, marginVertical: 10, borderRadius: 10, overflow: 'hidden' }}>
                    <MapView
                        style={{ flex: 1 }}
                        region={region}
                        onRegionChangeComplete={(reg) => {
                            setRegion(reg);
                            setFormOcorrencia((prev) => ({
                                ...prev,
                                latitude: reg.latitude,
                                longitude: reg.longitude,
                            }));
                        }}
                    >
                        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
                    </MapView>
                </View>

                <View>
                    <Pressable onPress={() => escolheFoto()}>
                        <View style={estilo.ocorImg}>
                            {imagePath !== "" ? (
                                <Image source={{ uri: imagePath }} style={estilo.ocorImgUpload} />
                            ) : (
                                <Image source={require("../assets/camera.png")} style={estilo.ocorImgUpload} />
                            )}
                            <Text style={estilo.msgOcorImg}>Upload de imagem</Text>
                        </View>
                    </Pressable>
                </View>

            </View>

            <TouchableOpacity onPress={Enviar} style={{ backgroundColor: '#007AFF', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default NovaOcorrencias;
