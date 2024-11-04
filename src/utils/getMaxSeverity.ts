import {Verdict} from "./image/types.ts";

export function getMaxSeverity(severities: Verdict[]): Verdict {
  let maxSeverity: Verdict = 'success';
  for (const severity of severities) {
    if (severity === 'error') {
      return 'error';
    }
    if (severity === 'warning') {
      maxSeverity = 'warning';
    }
  }
  return maxSeverity;
}
