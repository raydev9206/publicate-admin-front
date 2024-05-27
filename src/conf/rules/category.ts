export default {
  nameEng: [(val: string | number) => !!val || 'El campo nombre es requerido.'],
  nameEsp: [(val: string | number) => !!val || 'El campo nombre es requerido.'],
  order: [(val: string |number) => !!val || 'El campo orden es requerido.'],
};
