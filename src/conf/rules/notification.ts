export default {
    recipientEng: [
        (val: string) => !!val || 'The recipient field is required.',
        //(val: string) => /^[a-zA-Z\s]+$/.test(val) || 'Name can only contain letters and spaces',
    ],
    recipientEsp: [
        (val: string) => !!val || 'El campo destinatario es obligatorio.',
        //(val: string) => /^[a-zA-Z\s]+$/.test(val) || 'Name can only contain letters and spaces',
    ],
    serviceEng: [
        (val: string) => !!val || 'The service field is required.',
        //(val: string) => /^[a-zA-Z\s]+$/.test(val) || 'Name can only contain letters and spaces',
    ],
    serviceEsp: [
        (val: string) => !!val || 'El campo servicio es obligatorio.',
        //(val: string) => /^[a-zA-Z\s]+$/.test(val) || 'Name can only contain letters and spaces',
    ],
    descriptionEng: [
        (val: string) => !!val || 'The notification text field is required.',
        //(val: string) => /^[a-zA-Z\s]+$/.test(val) || 'Name can only contain letters and spaces',
    ],
    descriptionEsp: [
        (val: string) => !!val || 'El campo de texto de notificación es obligatorio.',
        //(val: string) => /^[a-zA-Z\s]+$/.test(val) || 'Name can only contain letters and spaces',
    ],
}