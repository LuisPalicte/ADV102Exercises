import { Link } from "expo-router";
import { ThemeProvider } from "../exercise6/BackgroundTheme";
import QuizScreen from "./quizScreen";

export default function Quiz(){
    return (
        <ThemeProvider>
            <QuizScreen />
        </ThemeProvider>
    );
}