import {Box, BoxProps, CssBaseline, styled, ThemeProvider} from "@mui/material";
import {darken} from '@mui/material/styles';
import {ColorSpace, HSL, HSV, OKLCH, sRGB} from "colorjs.io/fn";
import {useContext} from "react";
import './App.css'
import {AnalysisLayout} from "./components/AnalysisLayout.tsx";
import {AnalysisProvider} from "./contexts/AnalysisContext.tsx";
import {BackgroundProvider} from "./contexts/BackgroundContext.tsx";
import {SettingsContext, SettingsProvider} from "./contexts/SettingsContext.tsx";

ColorSpace.register(OKLCH);
ColorSpace.register(sRGB);
ColorSpace.register(HSL);
ColorSpace.register(HSV);

const AppBox = styled(Box)<BoxProps>(() => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}));

const Background = styled(Box)<BoxProps>(({theme}) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: -1,
  backgroundColor: theme.palette.mode == 'light'
    ? darken(theme.palette.background.default, 0.1)
    : darken(theme.palette.background.default, 0.3),
}));

function SubApp() {
  const {theme} = useContext(SettingsContext);
  return (
    <ThemeProvider theme={theme}>
      <AnalysisProvider>
        <BackgroundProvider>
          <Background/>
          <AppBox>
            <AnalysisLayout/>
          </AppBox>
        </BackgroundProvider>
      </AnalysisProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <>
      <CssBaseline/>
      <SettingsProvider>
        <SubApp/>
      </SettingsProvider>
    </>
  )
}

export default App
