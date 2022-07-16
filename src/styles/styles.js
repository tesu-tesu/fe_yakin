import { createTheme } from "@mui/material";

const Colors = {
    primary: "#019267",
    secondary: "#FFD365"
};

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary
        },
        secondary: {
            main: Colors.secondary
        },
    },
    typography: {
        fontFamily: [
        ].join(','),
    }
})

export default theme;