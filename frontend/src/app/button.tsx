import { Button as MuiButton } from "@mui/material";
import React from "react";

export interface ButtonProps {
	label: string;
}

export const Button = ({ label, ...rest }: ButtonProps) => (
	<MuiButton {...rest}>{label}</MuiButton>
);
