import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Modal
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import estilo from "../../estilo";

const { width } = Dimensions.get("window");

const Home = () => {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = React.useState(false);

    const handleLogout = () => {
        setMenuVisible(false);
        navigation.navigate("Login")
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
                                onPress={handleLogout}
                            >
                                <Text style={estilo.menuText}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
                

                {/* TOPO - TÍTULO + PERFIL */}
                <View style={estilo.header}>
                    <Image source={require("../assets/camera.png")} style={estilo.perfil} />
                    <Text style={estilo.nomeUsuario}>Júlia Martins</Text>
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
