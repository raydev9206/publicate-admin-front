export default interface IScategory {
  id: string;
  isActive: boolean;
  name: { en: string; es: string };
  order: number | string;
  category_id: string;
  categoryId: string;
  category: {
    id: string;
    name: {
      es: string;
      en: string;
    };
    isActive: true;
  };
}
