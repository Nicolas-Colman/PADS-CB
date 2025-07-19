import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Modal
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import estilo from "../../estilo";
import { buscarDadosUsuario } from "../Controlls/user";

const { width } = Dimensions.get("window");

const Home = () => {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = React.useState(false);
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

    const Logout = () => {
        setMenuVisible(false);
        navigation.navigate("Login")
    };
    const Config = () => {
        setMenuVisible(false);
        navigation.navigate("Configuracoes")
    };

    return (
        <ScrollView contentContainerStyle={estilo.scrollContainer}>
            <View style={estilo.container}>
                {/* BOTÃO DE MENU FIXO NO TOPO */}
                <View style={estilo.logout}>
                    <TouchableOpacity
                        style={estilo.menuButton}
                        onPress={() => setMenuVisible(true)}
                    >
                        <Ionicons name="menu" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>
                {/* MENU MODAL */}
                <Modal
                    transparent
                    visible={menuVisible}
                    animationType="fade"
                    onRequestClose={() => setMenuVisible(false)}
                >
                    <TouchableOpacity
                        style={estilo.modalOverlay}
                        onPress={() => setMenuVisible(false)}
                        activeOpacity={1}
                    >
                        <View style={estilo.menuContainer}>
                            <TouchableOpacity
                                style={estilo.menuItem}
                                onPress={Logout}
                            >
                                <Text style={estilo.menuText}>Sair</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={estilo.menuItem}
                                onPress={Config}
                            >
                                <Text style={estilo.menuText}>Configurações</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>


                {/* TOPO - TÍTULO + PERFIL */}
                <View style={estilo.header}>
                      <Image source={userRefFoto
                        ? { uri: userRefFoto }
                        : require('../assets/user.png')} style={estilo.perfil} />
                    <Text style={estilo.nomeUsuario}>{userOn}</Text>
                </View>

                {/* IMAGEM CENTRAL */}
                <Image
                    source={require("../assets/museu.png")}
                    style={estilo.imagemCentral}
                    resizeMode="cover"
                />

                {/* CARD COM TEXTO */}
                <View style={estilo.cardTexto}>
                    <Text style={estilo.texto}>
                        O Comunica Bagé conecta você aos serviços públicos da cidade,
                        promovendo mais facilidade, agilidade e participação ativa da
                        população na identificação e resolução dos desafios do dia a dia.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default Home;
