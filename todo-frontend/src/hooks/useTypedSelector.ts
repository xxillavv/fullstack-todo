import { useSelector } from "react-redux"
import type { RootState } from '../store/store';

export const useTypedSelector = useSelector.withTypes<RootState>()