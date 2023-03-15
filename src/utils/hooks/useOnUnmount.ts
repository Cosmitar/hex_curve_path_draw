import { useEffect } from "react";

export default function useOnUnmount(callback: () => void) {
  useEffect(() => () => callback(),[])
}