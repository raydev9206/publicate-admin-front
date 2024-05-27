export default interface IOffer {
  id: string,
  isActive: boolean,
  available: boolean,
  name: { en: string, es: string },
  price: number | string,
  subcategoryId: string,
  subcategory_id: string,
  subcategory: {
    id: string;
    name: {
      es: string;
      en: string;
    };
    isActive: true;
  },
}
