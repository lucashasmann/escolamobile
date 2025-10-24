import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { RootStackParamList } from "../navigation/AppNavigator";

type CadastrarTurmaNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CadastrarTurma"
>;

export default function CadastrarTurmaScreen() {
  const [nomeTurma, setNomeTurma] = useState("");
  const navigation = useNavigation<CadastrarTurmaNavigationProp>();

  const handleCadastrar = async () => {
    const idProfessor = await AsyncStorage.getItem("professorId");

    if (!idProfessor) {
      Alert.alert(
        "Erro",
        "ID do professor não encontrado. Faça login novamente."
      );
      return;
    }

    if (!nomeTurma.trim()) {
      Alert.alert("Atenção", "Por favor, insira o nome da turma.");
      return;
    }

    try {
      const response = await fetch("http://192.168.137.5:3000/turmas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nomeTurma.trim(),
          professor: Number(idProfessor),
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar a turma");

      const turmaCriada = await response.json();
      console.log("Turma criada:", turmaCriada);
      Alert.alert("Sucesso", "Turma cadastrada com sucesso!");

      setNomeTurma(""); 
      navigation.navigate("Dashboard"); 
    } catch (error) {
      console.error("Erro ao cadastrar turma:", error);
      Alert.alert(
        "Erro",
        "Falha ao cadastrar turma. Tente novamente mais tarde."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Turma</Text>

      <Text style={styles.label}>Nome da Turma:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da turma"
        value={nomeTurma}
        onChangeText={setNomeTurma}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8e8",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    color: "#000000",
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 10,
    textAlign: "center",
    width: "100%",
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1.8,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#000000",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});
