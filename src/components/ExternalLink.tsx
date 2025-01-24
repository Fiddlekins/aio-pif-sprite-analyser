import {Link} from "@mui/material";
import {ReactNode} from "react";

export interface ExternalLinkProps {
  href: string;
  children?: ReactNode;
}

export function ExternalLink(
  {
    href,
    children
  }: ExternalLinkProps
) {
  return (
    <Link
      href={href}
      target={'_blank'}
      rel={'nofollow noopener noreferrer external'}
    >
      {children ?? href}
    </Link>
  )
}
