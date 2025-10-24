import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { RootStackParamList } from "../navigation/AppNavigator";

type AtividadesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Atividades"
>;

interface Atividade {
  id: number;
  titulo: string;
}

export default function AtividadesScreen() {
  const [professorNome, setProfessorNome] = useState<string | null>(null);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const navigation = useNavigation<AtividadesNavigationProp>();

  useEffect(() => {
    const carregarProfessor = async () => {
      const nome = await AsyncStorage.getItem("professorNome");
      setProfessorNome(nome || "Professor");
    };

    const carregarAtividades = async () => {
      const idTurma = await AsyncStorage.getItem("turmaId");
      if (!idTurma) return;

      try {
        const response = await fetch(
          `http://192.168.137.5:3000/atividades/turma/${idTurma}`
        );
        if (!response.ok) throw new Error("Falha ao carregar atividades");

        const dados = await response.json();
        setAtividades(dados);
      } catch (error) {
        console.error("Erro ao carregar atividades:", error);
      }
    };

    carregarProfessor();
    carregarAtividades();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingBottom: 30 }}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Escola do Wellingtão</Text>
        <Text style={styles.professorInfo}>Bem-vindo, {professorNome}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Dashboard")}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* DASHBOARD HEADER / BOTÃO CADASTRAR */}
      <View style={styles.dashboardHeader}>
        <Text style={styles.dashboardTitle}>Atividades</Text>
        <TouchableOpacity
          style={styles.cadastrarButton}
          onPress={() => navigation.navigate("CadastrarAtividade")}
        >
          <Text style={styles.cadastrarText}>Cadastrar Atividade</Text>
        </TouchableOpacity>
      </View>

      {/* LISTA DE ATIVIDADES */}
      <View style={styles.atividadesSection}>
        <Text style={styles.sectionTitle}>Atividades da Turma</Text>
        <FlatList
          data={atividades}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.atividadeRow}>
              <Text style={styles.atividadeId}>{item.id}</Text>
              <Text style={styles.atividadeTitulo}>{item.titulo}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 70 },

  header: {
    width: "100%",
    backgroundColor: "#000",
    paddingVertical: 18,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 15,
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 5 },
  professorInfo: {
    color: "#000",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 25,
    fontWeight: "500",
    textAlign: "center",
    minWidth: 140,
  },
  backButton: {
    marginTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: "center",
  },
  backText: { color: "#000", fontWeight: "600" },

  dashboardHeader: {
    width: "90%",
    padding: 20,
    backgroundColor: "#000",
    borderRadius: 12,
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  dashboardTitle: { fontSize: 22, color: "#fff", fontWeight: "700" },
  cadastrarButton: {
    marginTop: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
  },
  cadastrarText: { color: "#000", fontWeight: "600" },

  atividadesSection: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 30,
  },
  sectionTitle: { fontSize: 20, fontWeight: "600", color: "#000", marginBottom: 15, textAlign: "center" },

  atividadeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  atividadeId: { width: 30, textAlign: "center" },
  atividadeTitulo: { flex: 1, textAlign: "center" },
});
