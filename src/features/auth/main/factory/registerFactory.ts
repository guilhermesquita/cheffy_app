import { RegisterUsecase } from "@/features/auth/domain/usecases/registerUsecase"
import { AuthRepository } from "../../infra/authRepository"

export const registerFactory = () => {
    const authRepo = new AuthRepository()
    return new RegisterUsecase(authRepo, authRepo)
}