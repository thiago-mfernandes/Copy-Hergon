import { ReactNode } from "react";

export interface RenderIfProps {
  conditional: boolean | undefined;
  children: ReactNode;
}

export function RenderIf({ conditional, children }: RenderIfProps) {
  return (
    <>
      {conditional && children}
    </>
  );
}