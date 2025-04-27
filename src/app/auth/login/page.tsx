"use client";
import IconGoogle from "@/components/icons/IconGoogle";
import CfButton from "@/components/ui/cfButton";
import CfButtonOutline from "@/components/ui/cfButtonOutline";
import { TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useRouter } from 'next/navigation'


const LoginPage = () => {
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const router = useRouter()

  return (
    <div>
      <div className="flex justify-between items-end">
        <p
          className={`text-caption text-error ${
            incorrectCredentials ? "opacity-100" : "opacity-0"
          }`}
        >
          Email ou Senha incorreta
        </p>
        <p className="text-caption mr-1 cursor-pointer hover:underline text-gray-400" onClick={() => router.push('/auth/forgot/password')}>
          Esqueci a Senha
        </p>
      </div>

      <form className="space-y-5">
        <div className="space-y-2">
          <TextField.Root
            variant="soft"
            color={incorrectCredentials ? "red" : "purple"}
            placeholder="Email"
            onChange={() => setIncorrectCredentials(false)}
          />
          <TextField.Root
            variant="soft"
            color={incorrectCredentials ? "red" : "purple"}
            placeholder="Senha"
            onChange={() => setIncorrectCredentials(false)}
          />
        </div>

        <div className="space-y-1">
          <CfButton onClick={() => {}} title="Login" fullButton={true} />
          <CfButtonOutline
            onClick={() => {}}
            title="Entre com o google"
            fullButton={true}
            iconRight={<IconGoogle />}
          />
          <p className="text-caption mr-1 cursor-pointer hover:underline text-gray-400 w-full text-center" onClick={() => router.push('/auth/signup')}>
            Não possui uma conta?{" "}
            <span className="text-main-plum-9">Cadastre-se</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
