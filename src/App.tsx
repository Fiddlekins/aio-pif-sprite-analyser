import {observer, Show} from "@legendapp/state/react";
import {i18n} from "@lingui/core"
import {I18nProvider} from "@lingui/react"
import {Box, BoxProps, CssBaseline, styled, ThemeProvider} from "@mui/material";
import {darken} from '@mui/material/styles';
import {ColorSpace, HSL, HSV, OKLCH, sRGB} from "colorjs.io/fn";
import './App.css'
import {AnalysisLayout} from "./components/AnalysisLayout.tsx";
import {AnalysisLayoutMobile} from "./components/Mobile/AnalysisLayoutMobile.tsx";
import {settings$} from "./state/settings.ts";
import {ui$} from "./state/ui.ts";
import {getTheme} from "./themes/getTheme.ts";

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

const SubApp = observer(function SubApp() {
  const themeId = settings$.themeId.get();
  const theme = getTheme(themeId);
  return (
    <I18nProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <Background/>
        <AppBox>
          <Show
            if={ui$.isMobile}
            else={<AnalysisLayout/>}
          >
            <AnalysisLayoutMobile/>
          </Show>
        </AppBox>
      </ThemeProvider>
    </I18nProvider>
  );
})

function App() {
  return (
    <>
      <CssBaseline/>
      <SubApp/>
    </>
  )
}

export default App
