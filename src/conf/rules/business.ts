export default {
    name: [
        (val: string | number | boolean) => !!val || 'El nombre es requerido.',
        //(val: string) => /^[a-zA-Z\s]+$/.test(val) || 'Name can only contain letters and spaces',
    ],
}
