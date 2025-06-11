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

const { width } = Dimensions.get("window");

const Home = () => {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = React.useState(false);

    const handleLogout = () => {
        setMenuVisible(false);
        navigation.navigate("Login"); // Substitua pelo nome correto da sua rota
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* BOTÃO DE MENU FIXO NO TOPO */}
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => setMenuVisible(true)}
                >
                    <Ionicons name="menu" size={28} color="#fff" />
                </TouchableOpacity>

                {/* MENU MODAL */}
                <Modal
                    transparent
                    visible={menuVisible}
                    animationType="fade"
                    onRequestClose={() => setMenuVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        onPress={() => setMenuVisible(false)}
                        activeOpacity={1}
                    >
                        <View style={styles.menuContainer}>
                            <TouchableOpacity
                                 style={styles.menuItem}
                                 onPress={() => {
                                 setMenuVisible(false);
                                navigation.navigate("OcorStatus");
                             }}
                        >
                           <View>
                     <Text style={styles.menuText}>Status da Ocorrência</Text>
                        </View>
                        <TouchableOpacity
                                 style={styles.menuItem}
                                 onPress={() => {
                                setMenuVisible(false);
                                 navigation.navigate("OcorStatus");
                                  }}
                                >
                        <Text style={styles.menuText}>Status da Ocorrência</Text>
                        </TouchableOpacity>
                        </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={handleLogout}
                            >
                                <Text style={styles.menuText}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

                {/* TOPO - TÍTULO + PERFIL */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.tituloApp}>Comunica Bagé</Text>
                        <Text style={styles.nomeUsuario}>Júlia Martins</Text>
                    </View>
                    <Image
                        source={require("../assets/julia.png")}
                        style={styles.perfil}
                    />
                </View>

                {/* IMAGEM CENTRAL */}
                <Image
                    source={require("../assets/museu.png")}
                    style={styles.imagemCentral}
                    resizeMode="cover"
                />

                {/* CARD COM TEXTO */}
                <View style={styles.cardTexto}>
                    <Text style={styles.texto}>
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

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#EFFFF8",
    },
    container: {
        paddingBottom: 100,
    },
    menuButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
        backgroundColor: "#2196F3",
        padding: 6,
        borderRadius: 10,
    },
    header: {
        backgroundColor: "#2196F3",
        paddingTop: 120,
        paddingBottom: 30,
        paddingHorizontal: 28,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomLeftRadius: 50,
    },
    tituloApp: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "bold",
    },
    nomeUsuario: {
        color: "#fff",
        fontSize: 16,
        marginTop: 10,
    },
    perfil: {
        width: 75,
        height: 90,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#fff",
    },
    imagemCentral: {
        width: width * 0.90,
        height: 190,
        borderRadius: 40,
        alignSelf: "center",
        marginTop: 70,
    },
    cardTexto: {
        backgroundColor: "#B2E3FF",
        marginHorizontal: 35,
        marginTop: 60,
        borderRadius: 30,
        padding: 20,
    },
    texto: {
        fontSize: 14,
        fontFamily: "monospace",
        textAlign: "center",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 80,
        paddingLeft: 20,
    },
    menuContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        elevation: 5,
    },
    menuItem: {
        paddingVertical: 10,
    },
    menuText: {
        fontSize: 16,
        color: "#2196F3",
        fontWeight: "bold",
    },
});
