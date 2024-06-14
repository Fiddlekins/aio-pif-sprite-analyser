import {Box, BoxProps, CssBaseline, styled} from "@mui/material";
import './App.css'
import {AnalysisLayout} from "./components/AnalysisLayout.tsx";
import {AnalysisProvider} from "./contexts/AnalysisContext.tsx";
import {BackgroundProvider} from "./contexts/BackgroundContext.tsx";

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
  backgroundColor: theme.palette.action.disabledBackground,
}));

function App() {
  return (
    <>
      <CssBaseline/>
      <AnalysisProvider>
        <BackgroundProvider>
          <Background/>
          <AppBox>
            <AnalysisLayout/>
          </AppBox>
        </BackgroundProvider>
      </AnalysisProvider>
    </>
  )
}

export default App
