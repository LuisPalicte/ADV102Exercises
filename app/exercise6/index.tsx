import { Link } from "expo-router";
import { ThemeProvider } from "./BackgroundTheme";
import { CrudScreenContent } from "./CrudScreenContext";


export default function CrudScreen(){

    return (
        <ThemeProvider>
            <CrudScreenContent />
        </ThemeProvider>
    );
}