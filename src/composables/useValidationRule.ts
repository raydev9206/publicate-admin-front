import { Ref, ref } from 'vue';

interface ValidationRule {
  (value: string): boolean | string;
}

interface UseValidationRule {
  errorMessage: Ref<string>;
  isInvalid: Ref<boolean>;
  validate: (value: string) =>string | boolean;
}

export function useValidationRule(rules: ValidationRule[]): UseValidationRule {
  const errorMessage = ref();
  const isInvalid = ref(false);

  function validate(value: string): string | boolean {
    for (const rule of rules) {
      const result = rule(value);
      if (result !== true) {
        errorMessage.value = result;
        isInvalid.value = true;
        return result;
      }
    }
    errorMessage.value = '';
    isInvalid.value = false;
    return true;
  }

  return {
    errorMessage,
    isInvalid,
    validate
  };
}
