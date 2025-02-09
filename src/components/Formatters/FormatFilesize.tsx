import {observer} from "@legendapp/state/react";
import {ui$} from "../../state/ui.ts";
import {formatFilesizeCompact, formatFilesizeLong} from "../../utils/formatStyles.ts";

export interface FormatFilesizeProps {
  value: number;
  variant?: 'compact' | 'long';
}

export const FormatFilesize = observer(function FormatFilesize(
  {
    value,
    variant,
  }: FormatFilesizeProps
) {
  const numberLocale = ui$.numberLocale.get();

  let formattedValue = '';
  switch (variant) {
    case 'long':
      formattedValue = formatFilesizeLong(numberLocale, value);
      break;
    case 'compact':
    default:
      formattedValue = formatFilesizeCompact(numberLocale, value);
      break;
  }

  return (
    <>
      {formattedValue.replaceAll(/ /g, '\u00a0')}
    </>
  );
});
