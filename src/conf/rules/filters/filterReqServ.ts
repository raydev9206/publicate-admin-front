export default {
    requests: [
        (val: string) => /^[0-9]*$/.test(val) || 'This field only accepts numbers',
    ],
    services: [
        (val: string) => /^[0-9]*$/.test(val) || 'This field only accepts numbers',
    ],
}