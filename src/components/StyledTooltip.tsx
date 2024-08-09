import {ClickAwayListener, Tooltip, TooltipProps} from "@mui/material";
import {useCallback, useState} from "react";

const spanStyle = {display: 'flex'};

export function StyledTooltip(
  props: TooltipProps
) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleTooltipOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleTooltipClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        open={isOpen}
        // PopperProps={{
        //   disablePortal: true,
        // }}
        onOpen={handleTooltipOpen}
        onClose={handleTooltipClose}
        disableFocusListener
        disableTouchListener
        {...props}
      >
        <span onClick={handleTooltipOpen} style={spanStyle}>
          {props.children}
        </span>
      </Tooltip>
    </ClickAwayListener>
  );
}
