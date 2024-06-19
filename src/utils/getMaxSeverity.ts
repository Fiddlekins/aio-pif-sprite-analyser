import {Verdict} from "./image/types.ts";

export function getMaxSeverity(a: Verdict, b: Verdict): Verdict {
  if (a === 'error' || b === 'error') {
    return 'error';
  }
  if (a === 'warning' || b === 'warning') {
    return 'warning';
  }
  return 'success'
}
