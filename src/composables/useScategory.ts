/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'boot/axios';
import conf from 'src/conf/conf';
import IScategory from 'src/interfaces/Scategory/IScategory';
import { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import useNotification from './useNotification';

const useScategory = () => {
  const { handleSuccessResponse, handleErrorResponse } = useNotification();
  const URL_SCATEGORY = conf.api.services.scategory;

  /**
   * Fetches all categoryes with the given query parameters.
   * @param params - The query parameters for the request.
   * @returns A Promise that resolves to the data returned by the API, or undefined if an error occurred.
   */
  const getAll = async (params: object) => {
    try {
      const { data } = await api.post(URL_SCATEGORY.list, params);
      return data;
    } catch {
      return undefined;
    }
  };

  async function getScategoryById(id: string | string[]) {
    try {
      const res = await api.get(`${URL_SCATEGORY.edit}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }

    return;
  }

  async function createScategory(scategory: IScategory) {
    try {
      const { data, status }: AxiosResponse = await api.post(
        `${URL_SCATEGORY.add}`,
        scategory,
      );
      handleSuccessResponse(
        status,
        'Operación exitosa',
        'La nueva sub categoría ha sido añadida',
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err?.response?.data;
    }
  }

  async function patchScategory(id: string | string[], scategory: IScategory) {
    try {
      const { data, status }: AxiosResponse = await api.patch(
        `${URL_SCATEGORY.edit}/${id}`,
        scategory,
      );
      handleSuccessResponse(
        status,
        'Operación exitosa',
        'La sub categoría ha sido modificada',
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err?.response?.data;
    }
  }

  async function deleteScategory(id: string | string[]) {
    try {
      const { data, status }: AxiosResponse = await api.delete(
        `${URL_SCATEGORY.del}/${id}`,
      );
      handleSuccessResponse(
        status,
        'Operación exitosa',
        'La sub categoría ha sido eliminada',
      );
      return data;
    } catch (error) {
      handleErrorResponse(error);
    }
  }

  return {
    getAll,
    getScategoryById,
    createScategory,
    patchScategory,
    deleteScategory,
  };
};

export default useScategory;
