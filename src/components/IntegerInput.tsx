import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";
import {
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

export const StyledTextField = styled(TextField)<TextFieldProps>(() => ({
  [`& .${inputBaseClasses.root}`]: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

export const StyledButton = styled(Button)<ButtonProps>(({theme}) => ({
  padding: 0,
  minWidth: 0,
  height: theme.spacing(2),
  flexGrow: 1,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderLeftColor: 'transparent',
  marginLeft: -1,
  [`&.${buttonClasses.disabled}`]: {
    borderRight: '1px solid rgba(0, 0, 0, 0.26)',
    borderLeft: '1px solid transparent',
    [`&:first-of-type`]: {
      borderTop: '1px solid rgba(0, 0, 0, 0.26)',
    },
    [`&:last-of-type`]: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.26)',
    },
  },
}));

export interface NumberInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  isDisabled?: boolean;
  onValueChange: (valueNew: number) => void;
  showArrowControls?: boolean;
}

export function IntegerInput(
  {
    label,
    value,
    min,
    max,
    isDisabled,
    onValueChange,
    showArrowControls,
  }: NumberInputProps
) {
  const validateAndSetValue = useCallback((unvalidatedValue: number) => {
    let valueNew = unvalidatedValue;
    if (typeof min === 'number') {
      valueNew = Math.max(valueNew, min);
    }
    if (typeof max === 'number') {
      valueNew = Math.min(valueNew, max);
    }
    onValueChange(valueNew);
  }, [min, max, onValueChange]);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    const isNegative = trimmedValue.charAt(0) === '-';
    const nonNegativeTrimmedValue = isNegative ? trimmedValue.slice(1) : trimmedValue;
    if (!/\D/.test(nonNegativeTrimmedValue)) {
      let valueNew = 0;
      if (/\d/.test(trimmedValue)) {
        valueNew = parseInt(trimmedValue, 10);
      }
      validateAndSetValue(valueNew);
    }
  }, [validateAndSetValue]);

  const onIncrease = () => {
    const valueNew = value + 1;
    validateAndSetValue(valueNew);
  }

  const onDecrease = () => {
    const valueNew = value - 1;
    validateAndSetValue(valueNew);
  }

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
      {
        showArrowControls && (
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
        )
      }
    </Box>
  );
}
