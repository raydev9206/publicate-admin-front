import { Notify } from 'quasar'

Notify.registerType('success', {
  color: 'white',
  progress: true,
  timeout: 2500,
  textColor: 'positive',
  icon: 'cloud_done',
})

Notify.registerType('fail', {
  color: 'white',
  progress: true,
  timeout: 2500,
  textColor: 'negative',
  icon: 'warning',
})
