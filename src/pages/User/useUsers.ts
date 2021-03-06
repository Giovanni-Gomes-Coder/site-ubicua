import { useQuery } from "react-query";
import api from "../../services/api";
import { queryClient } from "../../services/queryClient";

export interface FindAllUserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  active: boolean;
  type_user: string;
  created_at: string;
}

interface GetUserResponse {
  totalPage: number;
  users: FindAllUserProps[];
};

interface GetUserByIdResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  active: boolean;
  type_user: string;
  created_at: string;
  //users: FindAllUserProps;
};



export async function getUsers(page?: number, take?: number): Promise<GetUserResponse> {
  const { data, request } = await api.get('/v1/users/', {
    params: {
      skip: page,
      take: take
    }
  });

  const totalPage = Number(data.totalPage);
  //console.log("console log useUsers data", data);
  const users = data.users.map((user: FindAllUserProps) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar ? user.avatar : 'not avatar',
    active: user.active ? 'Ativo' : 'Inativo',
    created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
  }));

  return {
    users,
    totalPage,
  };
}

export async function getOneUserById(id: string): Promise<GetUserByIdResponse> {
  const result = await api.get(`/v1/users/${id}`);
  //console.log("console log useUsers data", result.data);

  return result.data;
}

export async function deleteUser(id: string) {
  await api.delete(`/v1/users/delete/${id}`);
}

export function useUsers(page?: number, take?: number) {
  return useQuery(['users', page, take], () => getUsers(page, take), {
    staleTime: 1000 * 60 * 10, // 1000 * 60 * 10 10 minutes // 1000 * 60 * 60 * 12, // 12 hours,
  });
}

export function useByIdUser(id: string) {
  return useQuery(['user', id], () => getOneUserById(id));
  // if (id) {
  // } else {
  //   return null;
  // }
}





