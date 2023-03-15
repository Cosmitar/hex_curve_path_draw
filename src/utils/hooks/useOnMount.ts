import { useEffect } from "react";

export default function useOnMount(callback: () => void) {
  useEffect(() => callback(),[])
}