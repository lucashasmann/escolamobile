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

type CadastrarAtividadeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CadastrarAtividade"
>;

export default function CadastrarAtividadeScreen() {
  const [titulo, setTitulo] = useState("");
  const navigation = useNavigation<CadastrarAtividadeNavigationProp>();

  const handleCadastrar = async () => {
    const turmaId = await AsyncStorage.getItem("turmaId");

    if (!turmaId) {
      Alert.alert(
        "Erro",
        "ID da turma não encontrado. Selecione uma turma primeiro."
      );
      return;
    }

    if (!titulo.trim()) {
      Alert.alert("Atenção", "Por favor, insira o título da atividade.");
      return;
    }

    try {
      const response = await fetch("http://192.168.137.5:3000/atividades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: titulo.trim(),
          turmaId: Number(turmaId),
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar a atividade");

      const atividadeCriada = await response.json();
      console.log("Atividade criada:", atividadeCriada);

      Alert.alert("Sucesso", "Atividade cadastrada com sucesso!");
      setTitulo(""); 
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error("Erro ao cadastrar atividade:", error);
      Alert.alert(
        "Erro",
        "Falha ao cadastrar atividade. Tente novamente mais tarde."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Atividade</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da Atividade"
        placeholderTextColor="#999"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#000",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1.8,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
