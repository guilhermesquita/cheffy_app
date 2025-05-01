import { AuthRepository } from "../../infra/authRepository"
import { AuthUsecase } from "../../domain/usecases/authUsecase"

export const authFactory = () => {
    const authRepo = new AuthRepository()
    return new AuthUsecase(authRepo, authRepo)
}