import {Theme} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import {createContext, ReactNode, useCallback, useMemo, useState} from 'react';
import {darkTheme} from "../themes/darkTheme.ts";
import {lightTheme} from "../themes/lightTheme.ts";
import {retrieveBoolean} from "../utils/localStorage/retrieveBoolean.ts";
import {retrieveString} from "../utils/localStorage/retrieveString.ts";
import {storeBoolean} from "../utils/localStorage/storeBoolean.ts";
import {storeString} from "../utils/localStorage/storeString.ts";

function getTheme(themeId: string) {
  switch (themeId) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
  }
  return lightTheme;
}

export interface SettingsContextInterface {
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (isSettingsModalOpenNew: boolean) => void;
  themeId: string;
  setThemeId: (themeIdNew: string) => void;
  canvasAccelerationEnabled: boolean;
  setCanvasAccelerationEnabled: (canvasAccelerationEnabledNew: boolean) => void;
  theme: Theme;
  isMobile: boolean;
}

const defaultHandler = () => {
  throw new Error('SettingsContext is still initializing');
};

export const SettingsContext = createContext<SettingsContextInterface>({
  isSettingsModalOpen: true,
  setIsSettingsModalOpen: defaultHandler,
  themeId: 'light',
  setThemeId: defaultHandler,
  canvasAccelerationEnabled: true,
  setCanvasAccelerationEnabled: defaultHandler,
  theme: lightTheme,
  isMobile: false,
});

export interface SettingsProviderProps {
  /**
   * The provider's child nodes
   */
  children?: ReactNode;
}

export function SettingsProvider(
  {
    children,
  }: SettingsProviderProps
) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [themeId, setThemeIdInternal] = useState<string>(
    retrieveString('SettingsContext.themeId', prefersDarkMode ? 'dark' : 'light')
  );
  const [canvasAccelerationEnabled, setCanvasAccelerationEnabledInternal] = useState<boolean>(
    retrieveBoolean('SettingsContext.canvasAccelerationEnabled', true)
  );

  const setThemeId = useCallback((themeIdNew: string) => {
    storeString('SettingsContext.themeId', themeIdNew);
    setThemeIdInternal(themeIdNew);
  }, [setThemeIdInternal]);

  const setCanvasAccelerationEnabled = useCallback((canvasAccelerationEnabledNew: boolean) => {
    storeBoolean('SettingsContext.canvasAccelerationEnabled', canvasAccelerationEnabledNew);
    setCanvasAccelerationEnabledInternal(canvasAccelerationEnabledNew);
  }, [setCanvasAccelerationEnabledInternal]);

  const theme = getTheme(themeId);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const value = useMemo(
    () => ({
      isSettingsModalOpen,
      setIsSettingsModalOpen,
      themeId,
      setThemeId,
      canvasAccelerationEnabled,
      setCanvasAccelerationEnabled,
      theme,
      isMobile,
    }),
    [
      isSettingsModalOpen,
      setIsSettingsModalOpen,
      themeId,
      setThemeId,
      canvasAccelerationEnabled,
      setCanvasAccelerationEnabled,
      theme,
      isMobile,
    ],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
