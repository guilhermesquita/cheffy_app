'use client'
import { Button } from "@radix-ui/themes";
import { CfButtonProps } from "./params/CfButtonProps";

export default function CfButton({ title, onClick, iconLeft, iconRight, fullButton = false }: CfButtonProps) {
    return (
        <div className={`cursor-pointer ${fullButton ? "w-full" : "w-fit"}`}>
            <Button 
                onClick={onClick} 
                style={{
                    cursor: 'pointer',
                    width: `${fullButton && '100%'}`
                }}
            >
                {iconLeft}
                {title}
                {iconRight}
            </Button>
        </div>
    );
}