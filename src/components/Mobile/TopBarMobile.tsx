import {observer} from "@legendapp/state/react";
import {MenuSharp} from "@mui/icons-material";
import {AppBar, AppBarProps, Box, Link, styled, Toolbar, ToolbarProps} from "@mui/material";
import {useCallback} from "react";
import logoUrl from '../../assets/logo.svg';
import {analysis$} from "../../state/analysis.ts";
import {StyledIconButton} from "../StyledIconButton.tsx";
import {TopBarTitle} from "../TopBarTitle.tsx";

const StyledAppBar = styled(AppBar)<AppBarProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledToolbar = styled(Toolbar)<ToolbarProps>(({theme}) => ({
  width: '100%',
  maxWidth: theme.breakpoints.values.lg,
}));

const StyledLogo = styled('img')(() => ({
  height: '2.5rem',
  width: '2.5rem',
  border: '2px solid white',
}));

const styledIconButtonSx = {width: '36.5px', height: '36.5px'};

export interface TopBarMobileProps {
  setIsNavigationMenuOpen: (isNavigationMenuOpenNew: boolean) => void;
}

export const TopBarMobile = observer(function TopBarMobile(
  {
    setIsNavigationMenuOpen,
  }: TopBarMobileProps
) {
  const spriteInput = analysis$.spriteInput.get();
  const openNavigationMenu = useCallback(() => {
    setIsNavigationMenuOpen(true);
  }, [setIsNavigationMenuOpen]);

  return (
    <StyledAppBar position={'sticky'}>
      <StyledToolbar>
        <Box
          display={'flex'}
          width={'100%'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={2}
        >
          <Box
            display={'flex'}
            height={'100%'}
            alignItems={'center'}
            gap={2}
          >
            <Link
              href={`${window.location.origin}${window.location.pathname}`}
              sx={{lineHeight: 0}}
            >
              <StyledLogo src={logoUrl} alt={'logo'}/>
            </Link>
          </Box>
          <TopBarTitle spriteInput={spriteInput}/>
          <Box
            display={'flex'}
            height={'100%'}
            alignItems={'center'}
            gap={2}
          >
            <StyledIconButton
              variant={'outlined'}
              color="inherit"
              onClick={openNavigationMenu}
              sx={styledIconButtonSx}
            >
              <MenuSharp/>
            </StyledIconButton>
          </Box>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
});
