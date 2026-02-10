import { LinearGradient } from "expo-linear-gradient";
import { FlatList, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createHomeStyles } from "../../assets/index";
import useTheme from "../hooks/useTheme";
import { Header, LoadingSpinner, TodoInput } from "../../components";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Index() {
  const { colors, toggleDarkMode } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const isLoading = todos === undefined;

  if (isLoading) <LoadingSpinner />

  return (
    <LinearGradient colors={colors.gradients.bg} style={homeStyles.container}>
      <SafeAreaView style={homeStyles.container}>
        <Header />
        <TodoInput />
        {todos?.map((todo) => <Text key={todo._id}>{todo.text}</Text>
        )}
        {/* <FlatList data={todos} /> */}
        <Pressable
          style={homeStyles.todoText}
          onPress={() => toggleDarkMode()}
        >
          Toggle Theme
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}
