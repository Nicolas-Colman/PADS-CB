import { StyleSheet } from "react-native";

export default StyleSheet.create({

    tela: {
        marginTop: 45,
        flex: 1,
        alignItems: "center",


    },

    imagemView: {
        alignContent: "center",
        alignItems: "center"
    },

    imagemPerfil: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
    },

    ocorImg: {
        alignItems: "center",
        marginVertical: 10,
    },
    ocorImgUpload: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    msgOcorImg: {
        marginTop: 5,
        fontSize: 14,
        color: "#555",
    },

    msg: {
        fontSize: 40,
        color: 'grey',
    },
    // mapa

    containerMapa: {
        width: "100%",
        height: 150,
        borderRadius: 10,
        overflow: "hidden",
        marginVertical: 10,
    },
    botaoBuscar: {
        color: "blue",
        marginVertical: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 5,
        padding: 8,
        marginVertical: 5,
        fontSize: 14,
    },
    botaoEnviar: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 15,
    },
    textoBotao: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
