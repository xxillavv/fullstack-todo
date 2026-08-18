import { useDispatch } from "react-redux"
import { baseApi } from "../store/api/base.api"
import { authApi } from "../store/api/auth.api"
import type { IUserData } from "../types/type"

export const useAuth = () => {
  const dispatch = useDispatch()

  const [regUser, { isLoading: isRegisterLoading, isError: isRegisterError, error: registerError }] = authApi.useRegUserMutation()
  const [logUser, { isLoading: isLogInLoading, isError: isLogInError, error: logInError }] = authApi.useLoginUserMutation()

  const registerUser = async (userData: IUserData) => {
    const result = await regUser(userData).unwrap();
    if (result.accessToken) {
      localStorage.setItem("accessToken", result.accessToken);
    }
    dispatch(baseApi.util.invalidateTags(['User', 'Tasks']));
    return result;
  }

  const logInUser = async (userData: IUserData) => {
    const result = await logUser(userData).unwrap();
    if (result.accessToken) {
      localStorage.setItem("accessToken", result.accessToken);
    }
    dispatch(baseApi.util.invalidateTags(['User', 'Tasks']));
    return result;
  }

  const logOutUser = () => {
    localStorage.removeItem("accessToken");
    dispatch(baseApi.util.resetApiState());
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