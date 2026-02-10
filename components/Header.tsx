import { View, Text } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { createHomeStyles } from '../assets';
import useTheme from '../app/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export const Header = () => {
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors)
    const todos = useQuery(api.todos.getTodos);
    const completedCounts = todos ? todos.filter((todo) => todo.isCompleted).length : 0;
    const totalCount = todos ? todos.length : 0;
    const progressPercent = totalCount > 0 ? (completedCounts/totalCount) * 100 : 0;

    return (
        <View>
            <View style={homeStyles.titleContainer}>
                <LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>
                    <Ionicons name="flash-outline" size={28} color="#fff" />
                </LinearGradient>

                <View style={homeStyles.titleTextContainer}>
                    <Text style={homeStyles.title}>Todays Tasks</Text>
                    <Text style={homeStyles.subtitle}>{completedCounts} of {totalCount} completed

                    </Text>
                </View>
            </View>
                <View style={homeStyles.progressContainer}>
                    <View style={homeStyles.progressBarContainer}>
                        <View style={homeStyles.progressBar}>
                            <LinearGradient colors={colors.gradients.success} style={[homeStyles.progressFill, { width:  `${progressPercent}%` }]} />
                        </View>
                        <Text style={homeStyles.progressText}>{Math.round(progressPercent)}</Text>
                    </View>
                </View>
        </View>
    )
}