/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'boot/axios';
import conf from 'src/conf/conf';
import IOffer from 'src/interfaces/Offer/IOffer';
import { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import useNotification from './useNotification';

const useOffer = () => {
  const { handleSuccessResponse, handleErrorResponse } = useNotification();
  const URL_BUSINESS = conf.api.services.offer;

  const getAll = async (params: object) => {
    try {
      const { data } = await api.post(URL_BUSINESS.list, params);
      return data;
    } catch {
      return undefined;
    }
  };

  async function getOfferById(id: string | string[]) {
    try {
      const res = await api.get(`${URL_BUSINESS.edit}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }

    return;
  }

  async function createOffer(offer: IOffer) {
    const formData = new FormData();
    formData.append('name', JSON.stringify(offer.name));
    formData.append('price', JSON.stringify(offer.price));
    formData.append('subcategory_id', JSON.stringify(offer.subcategory_id));

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
        'La nueva oferta ha sido añadida',
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err?.response?.data;
    }
  }

  async function patchOffer(id: string | string[], offer: IOffer, back = true) {
    const formData = new FormData();
    formData.append('name', JSON.stringify(offer.name));
    formData.append('price', JSON.stringify(offer.price));
    formData.append('available', JSON.stringify(offer.available));
    formData.append('subcategory_id', JSON.stringify(offer.subcategory_id));
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
        'La oferta ha sido modificada',
        back
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err?.response?.data;
    }
  }

  async function deleteOffer(id: string | string[]) {
    try {
      const { data, status }: AxiosResponse = await api.delete(
        `${URL_BUSINESS.del}/${id}`,
      );
      handleSuccessResponse(
        status,
        'Operación exitosa',
        'La oferta ha sido eliminada',
      );
      return data;
    } catch (error) {
      handleErrorResponse(error);
    }
  }

  return { getAll, getOfferById, createOffer, patchOffer, deleteOffer };
};

export default useOffer;
