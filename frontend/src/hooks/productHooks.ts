import {useQuery} from "@tanstack/react-query";
import apiClient from "../apiClient.ts";
import {Product} from "../types/Product.ts";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => (await apiClient.get<Product[]>('api/products')).data,
  })

