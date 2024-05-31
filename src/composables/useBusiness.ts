/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'boot/axios';
import conf from 'src/conf/conf';
import IBusiness from 'src/interfaces/Business/IBusiness';
import { AxiosResponse } from 'axios';
import {AxiosError} from 'axios';
import useNotification from './useNotification';

const useBusiness = () => {
  const { handleSuccessResponse, handleErrorResponse } = useNotification();
  const URL_BUSINESS = conf.api.services.business;

  const getAll = async (params: object)=> {
    try {
      const { data } = await api.post(URL_BUSINESS.list, params);
      return data;
    } catch {
      return undefined;
    }
  };

  async function getBusinessById(id: string | string[]) {
    try {
      const res = await api.get(`${URL_BUSINESS.edit}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }

    return;
  }

  async function createBusiness(business: IBusiness) {
    const formData = new FormData();
    formData.append('name', business.name);

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
        'El nuevo negocio ha sido añadido ',
      );
      return data;
    } catch (error) {
      const err = error as AxiosError
      return err?.response?.data;
    }
  }

  async function patchBusiness(
    id: string | string[],
    business: IBusiness,
  ) {
    const formData = new FormData();
    formData.append('name', JSON.stringify(business.name));
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
        'El negocio ha sido modificado',
      );
      return data;
    } catch (error) {
      const err = error as AxiosError
      return err?.response?.data;
    }
  }

  async function deleteBusiness(id: string | string[],) {
    try {
      const { data, status }: AxiosResponse = await api.delete(
        `${URL_BUSINESS.del}/${id}`);
      handleSuccessResponse(
        status,
        'Operación exitosa',
        'El negocio ha sido eliminado',
      );
      return data;
    } catch (error) {
      handleErrorResponse(error);
    }
  }

  return { getAll, getBusinessById, createBusiness, patchBusiness, deleteBusiness };
};

export default useBusiness;
