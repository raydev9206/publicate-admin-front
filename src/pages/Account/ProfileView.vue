<template>
    <div class="container-page">
        <div class="container-body">
            <div class="container-title">
                <h1 class="title-4">Profile</h1>
                <LineSeparator />
            </div>
            <div class="row-input">
                <inputField class="full-width" :model-value="profile.firstName" label="First Name"
                    :disable="!editProfile" :required="true"
                    @update:modelValue="(newVal: string) => profile.firstName = newVal" :rules="formRules.firstName"
                    :isInvalidProp="isInvalidFirstName" :errorMessage="firstNameErrorMessage"
                    @validate="validateInput('firstName')" />
                <inputField class="full-width" :model-value="profile.lastName" label="Last Name" :disable="!editProfile"
                    :required="true" @update:modelValue="(newVal: string) => profile.lastName = newVal"
                    :rules="formRules.lastName" :isInvalidProp="isInvalidLastName" :errorMessage="lastNameErrorMessage"
                    @validate="validateInput('lastName')" />
            </div>
            <div class="row-input">
                <inputField class="full-width" :model-value="profile.email" label="Email" :disable="!editProfile"
                    :required="true" @update:modelValue="(newVal: string) => profile.email = newVal"
                    :rules="formRules.email" :isInvalidProp="isInvalidEmail" :errorMessage="emailErrorMessage"
                    @validate="validateInput('email')" />
                <div class="full-width"></div>
            </div>
            <btnPrimary to="change_password" text-color="secondary" class="q-mt-lg nunito_regular" color="" height width
                border label="Change password" />
        </div>
        <LineSeparator />
        <div class="container-buttons">
            <btnPrimary v-if="editProfile" @onClickBtn="handleEditProfile" text-color="secondary"
                class="q-mt-lg nunito_regular" height width label="Save changes" />
            <dialogConfirm v-else @confirm="editProfile = !editProfile" btn-label="Edit profile" btn-btn="Confirm"
                title="Edit profile" description="Are you sure you want to edit your profile?" />
            <btnPrimary to="/request" text-color="secondary" class="q-mt-lg nunito_regular" color="" height width border
                label="Cancel" />
        </div>
    </div>
    <DiscardChanges v-if="editProfile" />
</template>

<script setup lang="ts">
import LineSeparator from 'src/components/defaultComponents/LineSeparator.vue';
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';
import dialogConfirm from 'src/components/defaultComponents/dialog/dialogConfirm.vue';
import inputField from 'src/components/defaultComponents/inputs/inputField.vue';
import { ref, Ref, computed } from 'vue';
import { useValidationRule } from 'src/composables/useValidationRule';
import formRules from 'src/conf/rules/profile'
import DiscardChanges from 'src/components/defaultComponents/dialog/discardChanges.vue';

const loading = ref(false)
const editProfile = ref(false)
const profile = ref({
    firstName: '',
    lastName: '',
    email: '',
})

const [firstNameValidate, lastNameValidate, emailValidate] = [formRules.firstName, formRules.lastName, formRules.email].map(useValidationRule)
const [isInvalidFirstName, isInvalidLastName, isInvalidEmail] = [firstNameValidate, lastNameValidate, emailValidate].map(validate => ref(validate.isInvalid))
const [firstNameErrorMessage, lastNameErrorMessage, emailErrorMessage] = [firstNameValidate, lastNameValidate, emailValidate].map(validate => ref(validate.errorMessage))

const invalidForm = computed(() => {
    return isInvalidFirstName.value || isInvalidLastName.value || isInvalidEmail.value;
});

function validateForm() {
    const errors = [
        firstNameValidate.validate(profile.value.firstName),
        lastNameValidate.validate(profile.value.lastName),
        emailValidate.validate(profile.value.email),
    ]
    return !errors.some((result) => result);
}

function validateInput(item: string) {
    const errors: Ref<(string | boolean)[]> = ref([])
    if (item === 'firstName' || item === 'lastName' || item === 'email') {
        errors.value = [
            firstNameValidate.validate(profile.value.firstName),
        ]
    }
    return !errors.value.some((result) => result);
};

async function handleEditProfile() {
    validateForm()
    if (!invalidForm.value) {
        loading.value = true;
        // edit profile
        loading.value = false;
        editProfile.value = !editProfile.value
    }
}
</script>

<style scoped></style>