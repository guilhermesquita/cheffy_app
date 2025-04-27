"use client";
import { Button } from "@radix-ui/themes";
import { CfButtonProps } from "./params/CfButtonProps";


export default function CfButtonOutline({
  title,
  onClick,
  iconRight,
  iconLeft,
  fullButton = false,
}: CfButtonProps) {
  return (
    <div className={`cursor-pointer ${fullButton ? "w-full" : "w-fit"}`}>
      <Button
        onClick={onClick}
        variant="outline"
        className={`cursor-pointer ${fullButton ? "w-full" : ""}`}
        style={{
          cursor: "pointer",
          width: `${fullButton && "100%"}`,
        }}
      >
        {iconLeft}
        {title}
        {iconRight}
      </Button>
    </div>
  );
}
