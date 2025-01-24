import {observer} from "@legendapp/state/react";
import {ui$} from "../../state/ui.ts";
import {formatPercentMedium, formatPercentMediumFixed} from "../../utils/formatStyles.ts";

interface FormatNumberProps {
  value: number;
  variant?: 'medium' | 'mediumFixed';
}

export const FormatPercent = observer(function FormatPercent(
  {
    value,
    variant,
  }: FormatNumberProps
) {
  const numberLocale = ui$.numberLocale.get();

  let formattedValue = '';
  switch (variant) {
    case 'mediumFixed':
      formattedValue = formatPercentMediumFixed(numberLocale, value);
      break;
    case 'medium':
    default:
      formattedValue = formatPercentMedium(numberLocale, value);
      break;
  }

  return (
    <>
      {formattedValue}
    </>
  );
});
