"use client";
import CfButton from "@/components/ui/cfButton";
import "@radix-ui/themes/styles.css";
import { useAuth } from "./auth/login/hooks/useAuth";

export default function Home() {
  const { logoutAuth } = useAuth();
  return (
    <div>
      CHEEFY
      <CfButton title="logout" onClick={() => logoutAuth()} />
    </div>
  );
}
