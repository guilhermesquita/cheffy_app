'use client'
import CfButton from "@/components/ui/cfButton";
import { TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgotPasswordpage = () => {
  const router = useRouter();
  const [notFoundEmail, setNotFoundEmail] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-end">
        <p
          className={`text-caption text-error ${
            notFoundEmail ? "opacity-100" : "opacity-0"
          }`}
        >
          Email não encontrado!
        </p>
        <p
          className="text-caption mr-1 cursor-pointer hover:underline text-gray-400"
          onClick={() => router.push("/auth/login")}
        >
          Voltar ao login
        </p>
      </div>

      <form className="space-y-2">
        <div>
          <TextField.Root
            variant="soft"
            color={notFoundEmail ? "red" : "purple"}
            placeholder="Insira seu Email"
            onChange={() => setNotFoundEmail(false)}
          />
        </div>

        <div>
          <CfButton
            onClick={() => {}}
            title="Redefinir senha"
            fullButton={true}
          />
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordpage;
