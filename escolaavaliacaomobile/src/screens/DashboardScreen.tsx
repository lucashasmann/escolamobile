import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { RootStackParamList } from "../navigation/AppNavigator";
import styles from "../styles/dashboardStyles";

type DashboardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

interface Turma {
  id: number;
  nome: string;
}

export default function DashboardScreen() {
  const [professorNome, setProfessorNome] = useState<string | null>(null);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const navigation = useNavigation<DashboardNavigationProp>();

  useEffect(() => {
    const carregarProfessor = async () => {
      const nome = await AsyncStorage.getItem("professorNome");
      setProfessorNome(nome || "Professor");
    };

    const carregarTurmas = async () => {
      const idProfessor = await AsyncStorage.getItem("professorId");
      if (!idProfessor) return;

      try {
        const response = await fetch(
          `http://192.168.137.5:3000/turmas/professor/${idProfessor}`
        );
        if (!response.ok) throw new Error("Falha ao carregar turmas");
        const dados = await response.json();
        setTurmas(dados);
      } catch (error) {
        console.error("Erro ao carregar turmas:", error);
        Alert.alert("Erro", "Falha ao carregar turmas");
      }
    };

    carregarProfessor();
    carregarTurmas();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  };

  const handleVerDetalhes = async (idTurma: number) => {
    await AsyncStorage.setItem("turmaId", idTurma.toString());
    navigation.navigate("Atividades");
  };

  const deletarTurmaAsync = async (idTurma: number) => {
    try {
      console.log("Tentando deletar turma com id:", idTurma);

      const response = await fetch(
        `http://192.168.137.5:3000/turmas/${idTurma}`,
        {
          method: "DELETE",
        }
      );

      console.log("Status da resposta:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Falha ao deletar: ${errorText}`);
      }

      setTurmas((prev) => prev.filter((t) => t.id !== idTurma));
      Alert.alert("Sucesso", "Turma deletada!");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      Alert.alert("Erro", "Falha ao deletar turma");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Escola do Wellingtão</Text>
        <Text style={styles.professorInfo}>Bem-vindo, {professorNome}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dashboardHeader}>
        <Text style={styles.dashboardTitle}>Dashboard</Text>
        <Text style={styles.dashboardSubtitle}>
          Bem-vindo!
        </Text>
        <TouchableOpacity
          style={styles.cadastrarTurmaButton}
          onPress={() => navigation.navigate("CadastrarTurma")}
        >
          <Text style={styles.cadastrarTurmaText}>Cadastrar Turma</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.turmasSection}>
        <Text style={styles.turmasTitle}>Turmas</Text>
        <FlatList
          data={turmas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.turmaRow}>
              <Text style={styles.turmaId}>{item.id}</Text>
              <Text style={styles.turmaNome}>{item.nome}</Text>
              <TouchableOpacity
                style={styles.verDetalhes}
                onPress={() => handleVerDetalhes(item.id)}
              >
                <Text style={styles.buttonText}>Ver detalhes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deletarTurma}
                onPress={() => deletarTurmaAsync(item.id)}
              >
                <Text style={styles.buttonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}
