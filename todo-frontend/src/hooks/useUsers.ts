import { useTypedDispatch } from "./useTypedDispatch"
import { useTypedSelector } from "./useTypedSelector"
import { userSlice } from "../features/userSlice"
import type { IUser } from "../types/type"

export const useUsers = () => {
  const dispatch = useTypedDispatch()
  const user = useTypedSelector((state) => state.user)

  return {
    user,

    setUser: (data: IUser) => dispatch(userSlice.actions.setUser(data)),
    resetUser: () => dispatch(userSlice.actions.resetUser())
  }
}