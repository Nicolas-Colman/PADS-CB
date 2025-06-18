import { StyleSheet } from "react-native";

export default StyleSheet.create({
    tela: {
        marginTop: 45,
        flex: 1,
        alignItems: "center",
    },
    container: {
        // paddingBottom: 100,
        backgroundColor: "#EFFFF8",
    },
    logout:{
    
    },

    imagemView: {
        alignContent: "center",
        alignItems: "center",
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
        color: "grey",
    },
    //----------------- login -----------------
     containerLog: {
        flex: 1,
        backgroundColor: '#2196F3',
    },
    topContainerLog: {
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    logoTextLog: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loginContainerLog: {
        backgroundColor: '#EFFFF8',
        borderTopLeftRadius: 80,
        paddingHorizontal: 30,
        paddingTop: 40,
        height: "100%",
        alignItems: 'stretch',
    },
    titleLog: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1B1B1F',
        textAlign: 'center',
        marginBottom: 20,
    },
    labelLog: {
        fontSize: 12,
        color: '#1B1B1F',
        marginBottom: 5,
        marginTop: 10,
        fontWeight: '500',
    },
    inputLog: {
        backgroundColor: '#C5CCC9',
        borderRadius: 12,
        height: 48,
        paddingHorizontal: 15,
        fontSize: 14,
        marginBottom: 10,
        color: '#000',
    },
    buttonLog: {
        backgroundColor: '#1B1B1F',
        borderRadius: 10,
        paddingVertical: 14,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonTextLog: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    linkLog: {
        color: '#1B1B1F',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 16,
        fontWeight: '600',
    },
    subLinkLog: {
        color: '#1B1B1F',
        textAlign: 'center',
        fontSize: 12,
        marginTop: 10,
    },

    // Mapa
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

    // Nova Ocorrencia
    header: {
        backgroundColor: "#2196F3",
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 25,
        flexDirection: "row",
        alignItems: "center",
        borderBottomLeftRadius: 40,
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
    // label: {
    //     marginTop: 20,
    //     marginBottom: 8,
    //     fontWeight: "bold",
    //     color: "#333",
    //     marginHorizontal: 25,
    // },
    // input: {
    //     backgroundColor: "#D9D9D9",
    //     borderRadius: 30,
    //     padding: 12,
    //     fontSize: 14,
    //     color: "#000",
    //     marginHorizontal: 25,
    // },
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


    botaoBuscarEndereco: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    textoBotaoBuscar: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    botaoCentralizar: {
        backgroundColor: "#6A5ACD",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    textoBotaoCentralizar: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },


    nomeUsuario: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 15,
    },

    titulo: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000",
        marginLeft: 10,
    },
    buscaContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D9D9D9",
        marginHorizontal: 20,
        borderRadius: 18,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginTop: 18,
    },
    inputBusca: {
        marginLeft: 10,
        fontSize: 16,
        flex: 1,
        color: "#000",
    },
    listaContainer: {
        marginTop: 30,
        marginHorizontal: 20,
    },
    categoria: {
        fontWeight: "bold",
        fontSize: 14,
        marginBottom: 10,
        color: "#000",
    },
    card: {
        backgroundColor: "#D9D9D9",
        padding: 12,
        borderRadius: 20,
        marginBottom: 25,
    },
    reacoes: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
        gap: 15,
    },
    botaoNovaOcorrencia: {
        backgroundColor: "#000",
        alignSelf: "center",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 25,
        marginTop: 2,
        marginBottom: 50,
    },
    textoBotao: {
        color: "#fff",
        fontWeight: "bold",
    },
    //-------------Home.tsx------------------
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#EFFFF8",
    },
    menuButton: {
        position: 'absolute',
        top: 60,
        right: 'auto',
        zIndex: 10,
        backgroundColor: "#2196F3",
        padding: 6,
        borderRadius: 10,
    },
    tituloApp: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "bold",
    },


    imagemCentral: {
        width: '80%',
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
        alignItems: "flex-end",
        paddingTop: 45,
        paddingRight: 10,
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

    //--------------- recuperar senha -------
    containerRec: {
        flex: 1,
        backgroundColor: '#2196F3',
    },
    topContainerRec: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
    },
    titleRec: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 6,
    },
    subtitleRec: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 20,
    },
    formContainerRec: {
        flex: 3,
        backgroundColor: '#EFFFF8',
        borderTopLeftRadius: 60,
        padding: 40,
        alignItems: 'stretch',
    },
    labelRec: {
        fontSize: 15,
        color: '#1B1B1F',
        marginBottom: 15,
        fontWeight: '500',
    },
    inputRec: {
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        height: 48,
        paddingHorizontal: 15,
        fontSize: 14,
        color: '#000',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#BDBDBD',
    },
    buttonRec: {
        backgroundColor: '#000',
        borderRadius: 90,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonTextRec: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    linkRec: {
        color: '#1B1B1F',
        textAlign: 'center',
        fontSize: 15,
        textDecorationLine: 'underline',
    },

    //----------- cadastro.tsx----------
    cadContainer: {
        flex: 1,
        backgroundColor: "#2196F3",
    },
    topCadContainer: {
        height: '20%',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    backButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backText: {
        fontSize: 60,
        color: "#fff",
    },
    formContainer: {
        flex: 1,
        backgroundColor: "#EFFFF8",
        borderTopLeftRadius: 130,
        padding: 50,
        alignItems: "center",
    },
    titleCad: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#1B1B1F",
        marginBottom: 20,
    },
    imagePicker: {
        marginBottom: 18,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 30,
    },
    label: {
        alignSelf: "flex-start",
        marginTop: 10,
        marginBottom: 8,
        color: "#1B1B1F",
        fontWeight: "bold",
        fontSize: 12,
        marginHorizontal: 20
    },
    input: {
        width: "90%",
        marginHorizontal: 20,
        backgroundColor: "#C5CCC9",
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 10,
        color: "#000",
    },
    button: {
        width: "100%",
        backgroundColor: "#1B1B1F",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    loginLink: {
        color: "#1B1B1F",
        fontSize: 14,
        textAlign: "center",
        marginTop: 16,
    },
});
