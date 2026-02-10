import { Alert, TextInput, TouchableOpacity, View } from 'react-native';
import useTheme from '../app/hooks/useTheme';
import { createHomeStyles } from '../assets';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';


export const TodoInput = () => {
    const { colors, isDarkMode } = useTheme();
    const homeStyles = createHomeStyles(colors);
    const [newTodo, setNewTodo] = useState("");
    const addTodo = useMutation(api.todos.addTodo);

    const handleAddTodo = async() => {
        if (newTodo.trim()) {
            try {
                await addTodo({text: newTodo.trim()})
                setNewTodo("");
            } catch (error) {
                console.error(`error during addTodo: ${error}`)
                Alert.alert("Error", "Failed to add todo");
            }
        }
    }

    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                <TextInput style={homeStyles.input} placeholder='What needs to be done?' value={newTodo} onChangeText={setNewTodo} onSubmitEditing={handleAddTodo} multiline placeholderTextColor={colors.textMuted} />
                <TouchableOpacity style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]} onPress={handleAddTodo} disabled={!newTodo.trim()}><Ionicons name="add" size={24} color={isDarkMode ? "#fff" : "#000" } /></TouchableOpacity>
            </View>
        </View>
    )
}