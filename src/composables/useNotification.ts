/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default function useNotification() {
  const router = useRouter();
  const $q = useQuasar();
  function handleSuccessResponse(status: number, message: string, caption: string, back = true) {
    const configMessage = {
      type: 'success',
      message: message,
      caption: caption,
    };
    notifyUser(configMessage.message, configMessage.caption, status);
      back ? router.back() :(router.go(0));
  }

  function handleErrorResponse(error: any) {
    const errorMessage = {
      type: 'success',
      message: 'Error',
      caption: error.response?.data.message || 'An error occurred',
    };
    notifyUser(errorMessage.message, errorMessage.caption, error.response?.status || 500);
  }
  function notifyUser(message: string, caption: string, status: number) {
    $q.notify({
      color: status < 300 ? 'positive' : 'negative',
      icon: status < 300 ? 'cloud_done' : 'warning',
      message: message,
      caption: caption,
      textColor: 'white',
      position: 'top',
      actions: [
        {
          icon: 'close',
          color: 'white',
          round: true,
          handler: () => {
            // Handle notification close action
          },
        },
      ],
    });
    $q.loading.hide();
  }

  return {
    handleSuccessResponse,
    handleErrorResponse,
    notifyUser,
    $q
  };
}
