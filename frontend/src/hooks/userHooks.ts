import { useMutation } from "@tanstack/react-query";
import { UserInfo } from "node:os";
import apiClient from "../apiClient.ts";

export const useSignInMutation = () =>
  useMutation( {
    mutationFn: async ( {
                          email,
                          password,
                        }: {
      email: string
      password: string
    } ) =>
      (
        await apiClient.post<UserInfo>( `api/users/signin`, {
          email,
          password,
        } )
      ).data
  } )