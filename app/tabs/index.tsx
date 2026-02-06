import { useMutation, useQuery } from "convex/react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../convex/_generated/api";
import useTheme from "../hooks/useTheme";

export default function Index() {
  const { toggleDarkMode } = useTheme();

  const todos = useQuery(api.todos.getTodos);
  console.log(todos);

  const addTodo = useMutation(api.todos.addTodo);
  const clearTodos = useMutation(api.todos.clearAllTodos);

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        Edit app/index.tsx to edit this screen.
      </Text>
      <TouchableOpacity onPress={() => toggleDarkMode()}>
        Toggle Theme
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addTodo({ text: "walking" })}>
        Add Todo
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clearTodos()}>
        Clear Todos
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    fontSize: 48,
  },
});
