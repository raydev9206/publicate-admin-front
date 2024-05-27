/* eslint-disable @typescript-eslint/ban-ts-comment */
import config from 'src/conf/conf';
import { computed } from 'vue';

export default function useConfig(moduleName: string, serviceName: string) {
  const getServices = computed(() => {
    // @ts-ignore
    return config.api.services && config.api.services[moduleName] ? config.api.services[moduleName] : null;
  });

  function getConfig(moduleName: string, serviceName:string) {
      // @ts-ignore
    return config.api.services[moduleName][serviceName] || config.api.services[moduleName] || config.api.services || null;
  }

  return {
    moduleName,
    serviceName,
    getServices,
    getConfig
  };
}
