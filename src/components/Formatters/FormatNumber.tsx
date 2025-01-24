import {observer} from "@legendapp/state/react";
import {ui$} from "../../state/ui.ts";
import {formatDecimalDefault, formatDecimalLargeFixed} from "../../utils/formatStyles.ts";

interface FormatNumberProps {
  value: number;
  variant?: 'default' | 'largeFixedDecimal';
}

export const FormatNumber = observer(function FormatNumber(
  {
    value,
    variant,
  }: FormatNumberProps
) {
  const numberLocale = ui$.numberLocale.get();

  let formattedValue = '';
  switch (variant) {
    case 'largeFixedDecimal':
      formattedValue = formatDecimalLargeFixed(numberLocale, value);
      break;
    case 'default':
    default:
      formattedValue = formatDecimalDefault(numberLocale, value);
      break;
  }

  return (
    <>
      {formattedValue}
    </>
  );
});
