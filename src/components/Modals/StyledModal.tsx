import {Box, Modal, Paper, PaperProps, styled, Typography} from "@mui/material";
import {ReactNode} from "react";

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
          <Typography variant={'h5'}>
            {title}
          </Typography>
          {children}
        </ModalBox>
      </Box>
    </Modal>
  );
}
