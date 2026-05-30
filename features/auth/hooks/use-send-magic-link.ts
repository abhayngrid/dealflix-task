import { useMutation } from "@tanstack/react-query";

import { sendMagicLink } from "../services/send-magic-link";

export function useSendMagicLink() {
  return useMutation({
    mutationFn: sendMagicLink,
  });
}
