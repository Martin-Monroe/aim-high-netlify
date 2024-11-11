import { useMemo } from "react";

export function useCreateObjectUrl(file, defaultValue = null) {
  return useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return defaultValue;
  }, [file]);
}
