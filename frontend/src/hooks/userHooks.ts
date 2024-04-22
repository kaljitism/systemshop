import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient.ts";
import { UserInfo } from "./../types/userInfo.ts";

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

export const useSignUpMutation = () =>
  useMutation( {
    mutationFn: async ( {
                          name,
                          email,
                          password,
                        }: {
      name: string,
      email: string,
      password: string,
    } ) => (
      await apiClient.post<UserInfo>( `api/users/signup`, {
        name,
        email,
        password,

      } )
    ).data
  } )