import {Observable} from "@legendapp/state";
import {observer, Show} from "@legendapp/state/react";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  buttonClasses,
  ButtonGroup,
  ButtonProps,
  inputBaseClasses,
  styled,
  TextField,
  TextFieldProps
} from "@mui/material";
import {ChangeEvent, useCallback} from "react";

export const StyledTextField = styled(TextField)<TextFieldProps>(({theme}) => ({
  [`& .${inputBaseClasses.root}`]: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  [`& .Mui-disabled .MuiOutlinedInput-notchedOutline`]: {
    borderColor: alpha(theme.palette.text.primary, 0.3),
  },
}));

export const StyledButton = styled(Button)<ButtonProps>(({theme}) => {
  const disabledBorderColour = alpha(theme.palette.text.primary, 0.3);
  return {
    padding: 0,
    minWidth: 0,
    height: theme.spacing(2),
    flexGrow: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftColor: 'transparent',
    marginLeft: -1,
    [`&.${buttonClasses.disabled}`]: {
      borderRight: `1px solid ${disabledBorderColour}`,
      borderLeft: '1px solid transparent',
      [`&:first-of-type`]: {
        borderTop: `1px solid ${disabledBorderColour}`,
      },
      [`&:last-of-type`]: {
        borderBottom: `1px solid ${disabledBorderColour}`,
      },
    },
  };
});

export interface NumberInputProps {
  label: string;
  value$: Observable<number>;
  min?: number;
  max?: number;
  isDisabled?: boolean;
  showArrowControls?: boolean;
}

export const IntegerInput = observer(function IntegerInput(
  {
    label,
    value$,
    min,
    max,
    isDisabled,
    showArrowControls,
  }: NumberInputProps
) {
  const value = value$.get();

  const validateValue = useCallback((unvalidatedValue: number) => {
    let valueNew = unvalidatedValue;
    if (typeof min === 'number') {
      valueNew = Math.max(valueNew, min);
    }
    if (typeof max === 'number') {
      valueNew = Math.min(valueNew, max);
    }
    return valueNew;
  }, [min, max]);

  const onIncrease = useCallback(() => {
    value$.set((valuePrev) => validateValue(valuePrev + 1));
  }, [value$, validateValue]);

  const onDecrease = useCallback(() => {
    value$.set((valuePrev) => validateValue(valuePrev - 1));
  }, [value$, validateValue]);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    const isNegative = trimmedValue.charAt(0) === '-';
    const nonNegativeTrimmedValue = isNegative ? trimmedValue.slice(1) : trimmedValue;
    if (!/\D/.test(nonNegativeTrimmedValue)) {
      let valueNew = 0;
      if (/\d/.test(trimmedValue)) {
        valueNew = parseInt(trimmedValue, 10);
      }
      value$.set(validateValue(valueNew));
    }
  }, [value$, validateValue]);

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={'stretch'}
    >
      <StyledTextField
        label={label}
        value={`${value || 0}`}
        size={'small'}
        disabled={isDisabled}
        onChange={onChange}
      />
      <Show if={showArrowControls}>
        <ButtonGroup
          orientation="vertical"
        >
          <StyledButton
            key="increase"
            variant={'outlined'}
            disabled={isDisabled || value === max}
            onClick={onIncrease}
          >
            <ArrowDropUp/>
          </StyledButton>
          <StyledButton
            key="decrease"
            variant={'outlined'}
            disabled={isDisabled || value === min}
            onClick={onDecrease}
          >
            <ArrowDropDown/>
          </StyledButton>
        </ButtonGroup>
      </Show>
    </Box>
  );
});
