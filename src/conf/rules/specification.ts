export default {
  nameEng: [(val: string | number) => !!val || 'El campo nombre es requerido.'],
  nameEsp: [(val: string | number) => !!val || 'El campo nombre es requerido.'],
  categoryEng: [
    (val: string | number) => !!val || 'El campo categoría es requerido.',
  ],
  categoryEsp: [
    (val: string | number) => !!val || 'El campo categoría es requerido.',
  ],
};
