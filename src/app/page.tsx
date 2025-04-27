"use client";
import CfButton from "@/components/ui/cfButton";
import "@radix-ui/themes/styles.css";

export default function Home() {
  return (
    <div>
      CHEEFY
      <CfButton title="INICIO" onClick={() => alert('asdsa')}/>
    </div>
  );
}
