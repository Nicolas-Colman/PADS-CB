import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView
} from "react-native";

const { width } = Dimensions.get("window");

const Home = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
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
        paddingBottom: 100, // espaço para não encostar no menu do app
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
        borderRadius:15,
        borderWidth: 2,
        borderColor: "#fff",
    },
    imagemCentral: {
        width: width * 0.85,
        height: 250,
        borderRadius: 50,
        alignSelf: "center",
        marginTop: 60,
    },
    cardTexto: {
        backgroundColor: "#B2E3FF",
        marginHorizontal: 35,
        marginTop: 50,
        borderRadius: 30,
        padding: 20,
    },
    texto: {
        fontSize: 14,
        fontFamily: "monospace",
        textAlign: "center",
    },
});
