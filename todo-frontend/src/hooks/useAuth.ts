import { authApi } from "../store/api/auth.api"
import type { IUserData } from "../types/type"

export const useAuth = () => {
  const [regUser, { isLoading: isRegisterLoading, isError: isRegisterError, error: registerError }] = authApi.useRegUserMutation()
  const [logUser, { isLoading: isLogInLoading, isError: isLogInError, error: logInError }] = authApi.useLoginUserMutation()

  const registerUser = async (userData: IUserData) => {
    const result = await regUser(userData).unwrap();
    localStorage.setItem("accessToken", result.accessToken ?? "");
    return result
  }

  const logInUser = async (userData: IUserData) => {
    const result = await logUser(userData).unwrap();
    localStorage.setItem("accessToken", result.accessToken ?? "");
    return result
  }

  const logOutUser = () => {
    localStorage.removeItem("accessToken")
  }


  return {
    registerUser,
    logInUser,
    logOutUser,

    isRegisterLoading,
    isRegisterError,
    registerError,

    isLogInLoading,
    isLogInError,
    logInError
  }
}