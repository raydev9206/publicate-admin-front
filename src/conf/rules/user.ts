export default {
  username: [
    (val: string | number) =>
      !!val || 'El campo nombre de usuario es requerido.',
  ],
  email: [(val: string | number) => !!val || 'El campo correo es requerido.'],
  phone: [(val: string | number) => !!val || 'El campo teléfono es requerido.'],
  password: [
    (val: string) => !!val || 'El campo contraseña es requerido.',
    (val: string) =>
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=\-?;,./{}|":<>[\]\\' ~_]).{8,}/.test(
        val,
      ) || 'Ingrese al menos 8 caracteres, letras mayúsculas o números',
  ],
  roles: [
    (val: string | number) => !!val || 'El campo role es requerido.',
  ],
  business: [
    (val: string | number) => !!val || 'El campo negocio es requerido.',
  ],
};
