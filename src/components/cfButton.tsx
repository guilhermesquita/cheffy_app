'use client'
import { Button } from "@radix-ui/themes";

type CfButtonProps = {
    title: string,
    onClick: () => void
}
export default function CfButton({title, onClick}: CfButtonProps){
    return ( 
        <Button onClick={onClick}>
            {title}
        </Button>
    );
}