import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AtividadesScreen from "../screens/AtividadeScreen";
import CadastrarAtividadeScreen from "../screens/CadastrarAtividadeScreen";
import CadastrarTurmaScreen from "../screens/CadastrarTurmaScreen";
import DashboardScreen from "../screens/DashboardScreen";
import LoginScreen from "../screens/LoginScreen";

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Atividades: undefined;
  CadastrarTurma: undefined;
  CadastrarAtividade: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Atividades" component={AtividadesScreen} />
      <Stack.Screen name="CadastrarTurma" component={CadastrarTurmaScreen} />
      <Stack.Screen
        name="CadastrarAtividade"
        component={CadastrarAtividadeScreen}
      />
    </Stack.Navigator>
  );
}
