export default interface ISpecification {
  id: string;
  available : boolean;
  name: { en: string; es: string };
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
