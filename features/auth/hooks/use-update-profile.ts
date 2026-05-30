import { useMutation } from "@tanstack/react-query";

import { updateProfile } from "../services/update-profile";

export function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfile,
  });
}
