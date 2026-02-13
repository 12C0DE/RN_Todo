import { Alert, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createHomeStyles } from "../../assets/index";
import useTheme from "../hooks/useTheme";
import { Header, LoadingSpinner, TodoInput } from "../../components";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors, toggleDarkMode } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const isLoading = todos === undefined;

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({id})
    } catch (error) {
      console.error("Error toggling todo", error);
      Alert.alert("Error", "Failed to toggle todo");

    }
  }

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this Todo?", [{text: "Cancel", style: "cancel"}, {text: "Delete", style: "destructive", onPress: () => deleteTodo({id})}])
  }

  const renderTodoItem = ({item}: {item:Todo}) => {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient colors={colors.gradients.surface} style={homeStyles.todoItem} start={{x: 0, y: 0}} end={{x:1, y: 1}}>
          <TouchableOpacity style={homeStyles.checkbox} activeOpacity={0.7} onPress={() => handleToggleTodo(item._id)}>
            <LinearGradient colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted} style={[homeStyles.checkboxInner, { borderColor: item.isCompleted ? "transparent" : colors.border}]}>
              {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}
            </LinearGradient>
          </TouchableOpacity>
          <View>
            <Text style={[homeStyles.todoText, item.isCompleted && {textDecorationLine: "line-through", color: colors.textMuted, opacity: 0.6}]} >
              {item.text}
            </Text>
          </View>
          </LinearGradient>
      </View>
    )
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <LinearGradient colors={colors.gradients.bg} style={homeStyles.container}>
      <SafeAreaView style={homeStyles.container}>
        <Header />
        <TodoInput />
        <FlatList data={todos} renderItem={(item) => renderTodoItem(item)} keyExtractor={(item) => item._id} style={homeStyles.todoList} contentContainerStyle={homeStyles.todoListContent} ListEmptyComponent={<Text>Empty List</Text>} showsVerticalScrollIndicator={false}/>
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
