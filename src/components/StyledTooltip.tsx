import {ClickAwayListener, Tooltip, TooltipProps} from "@mui/material";
import React, {useCallback, useState} from "react";

interface SpanStyleProps {
  spanStyle?: React.CSSProperties;
}

const spanStyleDefault = {display: 'flex'};

export function StyledTooltip(
  props: TooltipProps & SpanStyleProps,
) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {spanStyle: spanStyleProps, ...tooltipProps} = props;
  const spanStyle = {...spanStyleDefault, ...spanStyleProps};

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
        {...tooltipProps}
      >
        <span onClick={handleTooltipOpen} style={spanStyle}>
          {props.children}
        </span>
      </Tooltip>
    </ClickAwayListener>
  );
}
