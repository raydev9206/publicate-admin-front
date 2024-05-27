/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'boot/axios';
import conf from 'src/conf/conf';
import IUser from 'src/interfaces/User/IUser';
import { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import useNotification from './useNotification';

const useUser = () => {
  const { handleSuccessResponse, handleErrorResponse } = useNotification();
  const URL_BUSINESS = conf.api.services.user;

  const getAll = async (params: object) => {
    try {
      const { data } = await api.post(URL_BUSINESS.list, params);
      return data;
    } catch {
      return undefined;
    }
  };

  async function getUserById(id: string | string[]) {
    try {
      const res = await api.get(`${URL_BUSINESS.edit}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }

    return;
  }

  async function createUser(user: IUser) {
    try {
      const { data, status }: AxiosResponse = await api.post(
        `${URL_BUSINESS.add}`,
        user,
      );
      handleSuccessResponse(
        status,
        'Operación exitosa',
        'El nuevo usuario ha sido añadido',
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err?.response?.data;
    }
  }

  async function patchUser(id: string | string[], user: IUser) {
    const formData = new FormData();
    formData.append('username', JSON.stringify(user.username));
    formData.append('email', JSON.stringify(user.email));
    try {
      const { data, status }: AxiosResponse = await api.put(
        `${URL_BUSINESS.edit}/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      handleSuccessResponse(
        status,
        'Operación exitosa',
        'El usuario ha sido modificada',
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err?.response?.data;
    }
  }

  async function deleteUser(id: string | string[]) {
    try {
      const { data, status }: AxiosResponse = await api.delete(
        `${URL_BUSINESS.del}/${id}`,
      );
      handleSuccessResponse(
        status,
        'Operación exitosa',
        'El usuario ha sido eliminadoa',
      );
      return data;
    } catch (error) {
      handleErrorResponse(error);
    }
  }

  return { getAll, getUserById, createUser, patchUser, deleteUser };
};

export default useUser;
