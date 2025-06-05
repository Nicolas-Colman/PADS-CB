import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFFFFC",
  },
  topo: {
    backgroundColor: "#2D8CFF",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 80,
  },
  logo: {
    width: 150,
    height: 150,
  },
  formContainer: {
    flex: 1,
    padding: 25,
    alignItems: "center",
  },
  loginTitulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  label: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 10,
    marginLeft: 5,
    color: "#000",
  },
  input: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
  },
  botaoLogin: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  textoBotaoLogin: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#000",
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: "underline",
  },
});


