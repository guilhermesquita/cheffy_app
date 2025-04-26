"use client";
import "@radix-ui/themes/styles.css";
import CfButton from "@/components/cfButton";

export default function Home() {
  return (
    <div >
      CHEEFY
      <CfButton title="INICIO" onClick={() => alert('asdsa')}/>
    </div>
  );
}
