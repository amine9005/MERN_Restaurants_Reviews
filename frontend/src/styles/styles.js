import { createTheme } from "@mui/material";

const Colors = {
    primary: "#1eff00",
    secondary: "#00ff84",
}

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary,
        },
        secondary: {
            main: Colors.secondary,
        },
        
    }
})

export default theme