export default interface ICategory {
  isActive: boolean,
  name: { en: string, es: string },
  order: number | string,
  id: string,
}
