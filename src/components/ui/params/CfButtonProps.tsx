import { JSX } from "react";

export interface CfButtonProps{
    title: string,
    onClick?: () => void,
    fullButton?: boolean,
    iconRight?: JSX.Element,
    type?: "submit" | "reset" | "button" | undefined;
    iconLeft?: boolean
}