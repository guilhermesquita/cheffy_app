import { authRepository } from "@/features/actions/auth/repository";
import { useMutation } from "@tanstack/react-query";
import { loginFormData } from "../../[validators]/loginSchemaUI";
import { useState } from "react";
import { AuthErrorUnauthorized } from "@/features/actions/auth/errors/AuthErrorUnauthorized";
import { useRouter } from "next/navigation";
import CustomToast from "@/components/toast/CheffyToast";

export const useAuth = () => {
  const router = useRouter();
  const [errorCredential, setErrorCredentials] = useState(false);

  const taskMutationRemove = useMutation({
    mutationFn: async (params: loginFormData) => {
      try {
        return await authRepository.login(params);
      } catch (error) {
        if (error instanceof AuthErrorUnauthorized) {
          throw new Error("Unauthorized");
        }
        throw error;
      }
    },
    onSuccess: () => {
      router.push("/");
      CustomToast.success("Sucesso!", "Login realizado com sucesso.", {
        duration: 4000,
        position: "top-right",
      });
    },
    onError: (error) => {
      if (error.message === "Unauthorized") {
        setErrorCredentials(true);
      } else {
        CustomToast.error(
          "Erro!",
          "Ocorreu um problema inesperado. Tente novamente mais tarde.",
          {
            duration: 4000,
            position: "top-right",
          }
        );
      }
    },
  });

  return { taskMutationRemove, errorCredential, setErrorCredentials };
};