import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, Rootstate } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;
