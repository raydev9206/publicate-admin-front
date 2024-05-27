/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'boot/axios';
import conf from 'src/conf/conf';
import ICategory from 'src/interfaces/Category/ICategory';
import { AxiosResponse } from 'axios';
import {AxiosError} from 'axios';
import useNotification from './useNotification';

const useCategory = () => {
  const { handleSuccessResponse, handleErrorResponse } = useNotification();
  const URL_BUSINESS = conf.api.services.category;

  const getAll = async (params: object) => {
    try {
      const { data } = await api.post(URL_BUSINESS.list, params);
      return data;
    } catch {
      return undefined;
    }
  };

  async function getCategoryById(id: string | string[]) {
    try {
      const res = await api.get(`${URL_BUSINESS.edit}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }

    return;
  }

  async function createCategory(category: ICategory) {
    const formData = new FormData();
    formData.append('name', JSON.stringify(category.name));
    formData.append('order', JSON.stringify(category.order));

    try {
      const { data, status }: AxiosResponse = await api.post(
        `${URL_BUSINESS.add}`,
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
        'La nueva categoría ha sido añadida',
      );
      return data;
    } catch (error) {
      const err = error as AxiosError
      return err?.response?.data;
    }
  }

  async function patchCategory(
    id: string | string[],
    category: ICategory,
  ) {
    const formData = new FormData();
    formData.append('name', JSON.stringify(category.name));
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
        'La categoría ha sido modificada',
      );
      return data;
    } catch (error) {
      const err = error as AxiosError
      return err?.response?.data;
    }
  }

  async function deleteCategory(id: string | string[],) {
    try {
      const { data, status }: AxiosResponse = await api.delete(
        `${URL_BUSINESS.del}/${id}`);
      handleSuccessResponse(
        status,
        'Operación exitosa',
        'La categoría ha sido eliminadoa',
      );
      return data;
    } catch (error) {
      handleErrorResponse(error);
    }
  }

  return { getAll, getCategoryById, createCategory, patchCategory, deleteCategory };
};

export default useCategory;
