import { createHomeStyles } from "../assets"
import { LinearGradient } from "expo-linear-gradient"
import { ActivityIndicator, Text, View } from "react-native"
import useTheme from "../app/hooks/useTheme"

export const LoadingSpinner = () => {
    const {colors} = useTheme();
    const homeStyles = createHomeStyles(colors);

    return  (
        <LinearGradient colors={colors.gradients.bg} style={homeStyles.container}>
            <View style={homeStyles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={homeStyles.loadingText}>Loading your todos...</Text>
            </View>
        </LinearGradient>
    )
}