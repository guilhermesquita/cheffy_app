import { authRepository } from "@/features/actions/auth/repository";
import { useMutation } from "@tanstack/react-query";
import { loginFormData } from "../../[validators]/loginSchemaUI";
import { useState } from "react";
import { AuthErrorUnauthorized } from "@/features/actions/auth/errors/AuthErrorUnauthorized";
import { useRouter } from "next/navigation";
import CustomToast from "@/components/toast/CheffyToast";
import { signIn } from 'next-auth/react';
import { useAuthStore } from "@/app/[store]/auth-store";
import { signOut } from "next-auth/react";
import { registerFormData } from "../../[validators]/registerSchemaUI";
import { AuthConflictError } from "@/features/actions/auth/errors/AuthConflictError";

export const useAuth = () => {
    
  const router = useRouter();
  const [errorCredential, setErrorCredentials] = useState(false);
  const { loginProfile, profile, setLogin } = useAuthStore();

  const isLoggedIn = profile !== null;

  const registerMutation = useMutation({
    mutationFn: async (params: registerFormData) => {
      try {
        return await authRepository.register(params)
      } catch (error) {
        if (error instanceof AuthConflictError) {
          throw new Error("Conflict");
        }
        throw error;
      }
    },
    onSuccess: (response) => {
      const {profile, token} = response.data
      loginProfile({profile, token})
      router.push("/");
      CustomToast.success("Sucesso!", "Perfil criado com sucesso.", {
        duration: 4000,
        position: "top-right",
      });
    },
    onError: (error) => {
      if (error.message === "Conflict") {
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
  })

  const loginMutation = useMutation({
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
    onSuccess: (response) => {
      const {profile, token} = response.data
      loginProfile({profile, token})
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

  const loginOnAuthMutation = useMutation({
    mutationFn: () => {
      return signIn("google", { callbackUrl: "/" })
    },
    onSuccess: () => {
      CustomToast.success("Sucesso!", "Redirecionando ao seu login.", {
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

  const logoutAuth = () => {
    signOut()
    setLogin()
    router.push("/auth/login");
  }

  return { loginMutation, errorCredential, setErrorCredentials, loginOnAuthMutation, isLoggedIn, logoutAuth, registerMutation };
};