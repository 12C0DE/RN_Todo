import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createHomeStyles } from "../../assets/index";
import useTheme from "../hooks/useTheme";

export default function Index() {
  const { colors, toggleDarkMode } = useTheme();

  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.bg} style={homeStyles.container}>
      <SafeAreaView style={homeStyles.container}>
        <TouchableOpacity
          style={homeStyles.todoText}
          onPress={() => toggleDarkMode()}
        >
          Toggle Theme
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
