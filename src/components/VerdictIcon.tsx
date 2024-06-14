import {CheckCircleOutlineSharp, ErrorOutlineSharp, HelpOutlineSharp, WarningAmberSharp} from "@mui/icons-material";
import {Verdict} from "../contexts/AnalysisContext.tsx";

export interface VerdictIconProps {
  verdict: Verdict | null;
}

export function VerdictIcon({verdict}: VerdictIconProps) {
  switch (verdict) {
    case "error":
      return (<ErrorOutlineSharp color={'error'}/>);
    case "warning":
      return (<WarningAmberSharp color={'warning'}/>);
    case 'success':
      return (<CheckCircleOutlineSharp color={'success'}/>);
    default:
      return (<HelpOutlineSharp/>);
  }
}
