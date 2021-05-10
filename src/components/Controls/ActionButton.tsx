import { Button } from "@material-ui/core";
import React from "react";

interface ActionButtonProps {
  onClick: () => void;
  color: "inherit" | "secondary" | "primary" | undefined;
  variant?: "text" | "outlined" | "contained" | undefined;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  color,
  variant,
}) => {
  return (
    <Button onClick={onClick} variant={variant} color={color}>
      {children}
    </Button>
  );
};
