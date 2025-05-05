"use client";
import IconGoogle from "@/components/icons/IconGoogle";
import CfButton from "@/components/ui/cfButton";
import CfButtonOutline from "@/components/ui/cfButtonOutline";
import { TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginFormData } from "../[validators]/loginSchemaUI";
import { useAuth } from "./hooks/useAuth";

const LoginPage = () => {
  const { loginMutation, errorCredential, setErrorCredentials, loginOnAuthMutation } =
    useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>();

  const onSubmit: SubmitHandler<loginFormData> = async (data) => {
    await loginMutation.mutateAsync(data);
  };

  return (
    <div>
      <div className="flex justify-between items-end">
        <p
          className={`text-caption text-error ${
            errorCredential ? "opacity-100" : "opacity-0"
          }`}
        >
          Email ou Senha incorreta
        </p>
        <p
          className="text-caption mr-1 cursor-pointer hover:underline text-gray-400"
          onClick={() => router.push("/auth/forgot/password")}
        >
          Esqueci a Senha
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <TextField.Root
            variant="soft"
            color={errors.email || errorCredential ? "red" : "purple"}
            placeholder="Email"
            {...register("email", { required: true })}
            onChange={() => setErrorCredentials(false)}
          />
          <TextField.Root
            variant="soft"
            color={errors.password || errorCredential ? "red" : "purple"}
            placeholder="Senha"
            {...register("password", { required: true })}
            onChange={() => {
              setErrorCredentials(false);
            }}
          />
        </div>

        <div className="space-y-1">
          <CfButton
            title={loginMutation.isPending ? "carregando..." : "Login"}
            fullButton={true}
            type="submit"
          />
          <CfButtonOutline
            onClick={() => loginOnAuthMutation.mutate()}
            title={"Entre com o google"}
            fullButton={true}
            iconRight={<IconGoogle />}
          />
          <p
            className="text-caption mr-1 cursor-pointer hover:underline text-gray-400 w-full text-center"
            onClick={() => router.push("/auth/signup")}
          >
            Não possui uma conta?{" "}
            <span className="text-main-plum-9">Cadastre-se</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
