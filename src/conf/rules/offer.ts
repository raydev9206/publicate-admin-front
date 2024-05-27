export default {
  nameEng: [(val: string | number) => !!val || 'El campo nombre es requerido.'],
  nameEsp: [(val: string | number) => !!val || 'El campo nombre es requerido.'],
  price: [(val: string |number) => !!val || 'El campo orden es requerido.'],
  subcategoryEng: [
    (val: string | number) => !!val || 'El campo sub categoría es requerido.',
  ],
  subcategoryEsp: [
    (val: string | number) => !!val || 'El campo sub categoría es requerido.',
  ],
};
