"use client";
import IconClosedEye from "@/components/icons/IconClosedEye";
import IconOpenedEye from "@/components/icons/IconOpenedEye";
import CfButton from "@/components/ui/cfButton";
import { TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Form } from "radix-ui";
import { useState } from "react";

const SignupPage = () => {
  const router = useRouter();

  const [seePassword, setSeePassword] = useState(false);

  return (
    <div>
      <Form.Root className="space-y-3">
        <Form.Field className="FormField" name="email">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">
              <p className="text-caption">Email</p>
            </Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              <p className={`text-caption text-error`}>Adicione seu email</p>
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              <p className={`text-caption text-error`}>
                Adicione um email válido
              </p>
            </Form.Message>
          </div>
          <Form.Control asChild>
            <TextField.Root
              variant="soft"
              color={"purple"}
              required
              type="email"
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="name">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">
              <p className="text-caption">Nome</p>
            </Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              <p className={`text-caption text-error`}>
                Adicione um nome ao seu usuário
              </p>
            </Form.Message>
          </div>
          <Form.Control asChild>
            <TextField.Root
              variant="soft"
              color={"purple"}
              type="text"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="password">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">
              <p className="text-caption">Senha</p>
            </Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              <p className={`text-caption text-error`}>Adicione uma senha!</p>
            </Form.Message>
          </div>
          <TextField.Root
            variant="soft"
            color="purple"
            type={seePassword ? "text" : "password"}
            required
          >
            <button
              type="button"
              className="toggle-password mr-2 cursor-pointer"
              onClick={() => setSeePassword(!seePassword)}
              aria-label={seePassword ? "Hide password" : "Show password"}
            >
              {seePassword ? <IconClosedEye /> : <IconOpenedEye />}
            </button>
          </TextField.Root>
        </Form.Field>

        <Form.Submit asChild>
          <CfButton
            onClick={() => router.push("/")}
            title="Criar conta"
            fullButton
          />
        </Form.Submit>
      </Form.Root>

      <p
        className="text-caption cursor-pointer hover:underline text-gray-400 w-full text-center mt-2"
        onClick={() => router.push("/auth/login")}
      >
        Já possui uma conta?{" "}
        <span className="text-main-plum-9">Faça seu login!</span>
      </p>
    </div>
  );
};

export default SignupPage;
