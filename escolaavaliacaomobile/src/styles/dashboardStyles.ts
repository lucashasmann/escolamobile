import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const scaleFont = (size: number) => size * (width / 375);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },

  header: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  headerTitle: {
    color: "#fff",
    fontSize: scaleFont(18),
    fontWeight: "bold",
    textAlign: "center",
  },
  professorInfo: {
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 25,
    marginTop: 10,
    textAlign: "center",
    minWidth: 120,
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 25,
    marginTop: 10,
  },
  logoutText: {
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
  },

  dashboardHeader: {
    backgroundColor: "#000",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  dashboardTitle: {
    fontSize: scaleFont(22),
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  dashboardSubtitle: {
    fontSize: scaleFont(16),
    color: "#e0e0e0",
    marginBottom: 15,
    textAlign: "center",
  },

  cadastrarTurmaButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  cadastrarTurmaText: {
    color: "#000",
    fontWeight: "600",
    fontSize: scaleFont(16),
  },

  turmasSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 30,
  },
  turmasTitle: {
    fontSize: scaleFont(18),
    color: "#000",
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },

  turmaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  turmaId: { flexBasis: "10%", textAlign: "center", minWidth: 30 },
  turmaNome: { flex: 1, textAlign: "center", minWidth: 80 },

  verDetalhes: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  deletarTurma: {
    backgroundColor: "#e74c3c",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: scaleFont(14),
    textAlign: "center",
  },
});

export default styles;
