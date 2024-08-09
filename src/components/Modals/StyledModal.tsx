import {CloseSharp} from "@mui/icons-material";
import {Box, Modal, Paper, PaperProps, styled, Typography} from "@mui/material";
import {ReactNode} from "react";
import {StyledIconButton} from "../StyledIconButton.tsx";

const ModalBox = styled(Paper)<PaperProps>(({theme}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: '90vw',
  maxHeight: '95vh',
  overflowY: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: theme.breakpoints.values.sm,
  }
}));

const styledIconButtonSx = {width: '36.5px', height: '36.5px'};

export interface StyledModalProps {
  title: string;
  open: boolean;
  handleClose: () => void;
  /**
   * The modal's child nodes
   */
  children?: ReactNode;
}

export function StyledModal(
  {
    title,
    open,
    handleClose,
    children
  }: StyledModalProps
) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box m={4} width={'100%'}>
        <ModalBox elevation={4}>
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
          >
            <Typography variant={'h5'}>
              {title}
            </Typography>
            <StyledIconButton
              variant={'outlined'}
              color="inherit"
              onClick={handleClose}
              sx={styledIconButtonSx}
            >
              <CloseSharp/>
            </StyledIconButton>
          </Box>
          {children}
        </ModalBox>
      </Box>
    </Modal>
  );
}
