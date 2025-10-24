import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", 
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  header: {
    width: "100%",
    backgroundColor: "#000000", 
    paddingVertical: 30,
    position: "absolute",
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  headerText: {
    color: "#ffffff", 
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  title: {
    marginTop: height * 0.08, 
    marginBottom: 20,
    color: "#333333", 
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  form: {
    backgroundColor: "#ffffff", 
    padding: 30,
    borderRadius: 8,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },

  label: {
    color: "#555555", 
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 14,
  },

  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: "#cccccc", 
    borderRadius: 5,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#000000", 
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
