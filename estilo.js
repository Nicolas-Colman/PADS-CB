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
    // nova Ocorrencia

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
    mapa: {
        height: 150,
        borderRadius: 20,
        overflow: "hidden",
        marginHorizontal: 25,
    },
    upload: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D9D9D9",
        padding: 16,
        borderRadius: 60,
        gap: 10,
        marginHorizontal: 25,
        marginTop: 10,
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
});
