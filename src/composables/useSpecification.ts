/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'boot/axios';
import conf from 'src/conf/conf';
import { AxiosResponse } from 'axios';
import {AxiosError} from 'axios';
import useNotification from './useNotification';
import ISpecification from 'src/interfaces/Specificaion/ISpecification';

const useSpecification = () => {
  const { handleSuccessResponse, handleErrorResponse } = useNotification();
  const URL_SPECIFICATION = conf.api.services.specification;

  /**
   * Fetches all categoryes with the given query parameters.
   * @param params - The query parameters for the request.
   * @returns A Promise that resolves to the data returned by the API, or undefined if an error occurred.
   */
  const getAll = async (params: object) => {
    try {
      const { data } = await api.post(URL_SPECIFICATION.list, params);
      return data;
    } catch {
      return undefined;
    }
  };

  /**
   * Fetches a specification by its ID.
   * @param id - The ID of the specification to fetch.
   * @returns A Promise that resolves to the specification data, or undefined if an error occurred.
   */
  async function getSpecificationById(
    id: string | string[],
  ): Promise<ISpecification | undefined> {
    try {
      const res = await api.get<ISpecification>(`${URL_SPECIFICATION.edit}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }

    return undefined;
  }

  async function createSpecification(specification: ISpecification) {
    try {
      const { data, status }: AxiosResponse = await api.post(
        `${URL_SPECIFICATION.add}`,
        specification,
      );
      handleSuccessResponse(
        status,
        'Operación exitosa',
        'El nuevo sabor ha sido añadido',
      );
      return data;
    } catch (error) {
      const err = error as AxiosError
      return err?.response?.data;
    }
  }

  async function patchSpecification(
    id: string | string[],
    specification: ISpecification,
    back = true,
  ) {
    try {
      const { data, status }: AxiosResponse = await api.put(
        `${URL_SPECIFICATION.edit}/${id}`,
        specification,
      );
      handleSuccessResponse(
        status,
        'Operación exitosa',
        'El sabor ha sido modificado',
        back
      );
      return data;
    } catch (error) {
      const err = error as AxiosError
      return err?.response?.data;
    }
  }

  async function deleteSpecification(id: string | string[],) {
    try {
      const { data, status }: AxiosResponse = await api.delete(
        `${URL_SPECIFICATION.del}/${id}`);
      handleSuccessResponse(
        status,
        'Operación exitosa',
        'El sabor ha sido eliminado',
      );
      return data;
    } catch (error) {
      handleErrorResponse(error);
    }
  }

  return { getAll, getSpecificationById, createSpecification, patchSpecification, deleteSpecification };
};

export default useSpecification;
