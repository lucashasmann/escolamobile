import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="cadastrarTurma" />
      <Stack.Screen name="atividades" />
      <Stack.Screen name="cadastrarAtividade" />
    </Stack>
  );
}