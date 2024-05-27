<template>
    <div class="container-page full-height">
        <div class="container-body">
            <div class="container-title">
                <h1 class="title-4">Company Details</h1>
                <LineSeparator />
            </div>
            <inputField class="full-width" label="Name" :disable="!editCompanyDetails" :required="true"
                nameRef="companyName" :model-value="company.companyName"
                @update:modelValue="(newVal: string) => company.companyName = newVal" :rules="formRules.companyName"
                :isInvalidProp="isInvalidCompanyName" :errorMessage="companyNameErrorMessage"
                @validate="validateInput('companyName')" />
            <inputField class="full-width" label="Address" :disable="!editCompanyDetails" :required="true"
                nameRef="address" :model-value="company.address"
                @update:modelValue="(newVal: string) => company.address = newVal" :rules="formRules.address"
                :isInvalidProp="isInvalidAddress" :errorMessage="addressErrorMessage"
                @validate="validateInput('address')" />
            <div class="row-input">
                <InputSelect class="full-width" placeholder="Select a country" :disable="!editCompanyDetails"
                    :required="true" :model-value="company.country" :options="options" label="Country"
                    @update:modelValue="(newVal: string) => company.country = newVal" :rules="formRules.country"
                    :isInvalidProp="isInvalidCountry" :errorMessage="countryErrorMessage"
                    @validate="validateInput('country')" :optionsValueLabel="true" />
                <inputField class="full-width" label="State" :disable="!editCompanyDetails" :required="true"
                    nameRef="state" :model-value="company.state"
                    @update:modelValue="(newVal: string) => company.state = newVal" :rules="formRules.state"
                    :isInvalidProp="isInvalidState" :errorMessage="stateErrorMessage"
                    @validate="validateInput('state')" />
            </div>
            <div class="row-input">
                <inputField class="full-width" label="City" :disable="!editCompanyDetails" :required="true"
                    nameRef="city" :model-value="company.city"
                    @update:modelValue="(newVal: string) => company.city = newVal" :rules="formRules.city"
                    :isInvalidProp="isInvalidCity" :errorMessage="cityErrorMessage" @validate="validateInput('city')" />
                <inputField class="full-width" label="Zip Code" :disable="!editCompanyDetails" :required="true"
                    nameRef="zipCode" :model-value="company.zipCode"
                    @update:modelValue="(newVal: string) => company.zipCode = newVal" :rules="formRules.zipCode"
                    :isInvalidProp="isInvalidZipCode" :errorMessage="zipCodeErrorMessage"
                    @validate="validateInput('zipCode')" />
            </div>
            <div class="row-input">
                <inputField class="full-width" label="Phone" :disable="!editCompanyDetails" :required="true"
                    nameRef="phone" :model-value="company.phone"
                    @update:modelValue="(newVal: string) => company.phone = newVal" :rules="formRules.phone"
                    :isInvalidProp="isInvalidPhone" :errorMessage="phoneErrorMessage"
                    @validate="validateInput('phone')" />
                <inputField class="full-width" label="Website" :disable="!editCompanyDetails" :required="true"
                    nameRef="webSite" :model-value="company.webSite"
                    @update:modelValue="(newVal: string) => company.webSite = newVal" :rules="formRules.webSite"
                    :isInvalidProp="isInvalidWebSite" :errorMessage="webSiteErrorMessage"
                    @validate="validateInput('webSite')" />
            </div>
            <LineSeparator />
            <div class="container-buttons">
                <btnPrimary v-if="editCompanyDetails" text-color="secondary" class="q-mt-lg nunito_regular" height width
                    label="Save changes" @onClickBtn="handlePatchCompanyDetails" />
                <dialogConfirm v-else @confirm="editCompanyDetails = !editCompanyDetails" btn-label="Edit"
                    btn-btn="Confirm" title="Edit Company details"
                    description="Are you sure you want to edit company details?" />
                <btnPrimary to="/request" text-color="secondary" class="q-mt-lg nunito_regular" color="" height width
                    border label="Cancel" />
            </div>
        </div>
    </div>
    <DiscardChanges v-if="editCompanyDetails" />
</template>

<script setup lang="ts">
import LineSeparator from 'src/components/defaultComponents/LineSeparator.vue';
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';
import dialogConfirm from 'src/components/defaultComponents/dialog/dialogConfirm.vue';
import inputField from 'src/components/defaultComponents/inputs/inputField.vue';
import InputSelect from 'src/components/defaultComponents/inputs/inputSelect.vue';
import { ref, Ref, computed } from 'vue';
//validations
import formRules from 'src/conf/rules/company'
import { useValidationRule } from 'src/composables/useValidationRule';
import options from 'src/utils/const/countries'
import DiscardChanges from 'src/components/defaultComponents/dialog/discardChanges.vue';

const editCompanyDetails = ref(false)
const loading = ref(false)

const company = ref({
    companyName: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    phone: '',
    webSite: '',
})

const [companyNameValidate, addressValidate, countryValidate, stateValidate, cityValidate, zipCodeValidate, phoneValidate, webSiteValidate] = [formRules.companyName, formRules.address, formRules.country, formRules.state, formRules.city, formRules.zipCode, formRules.phone, formRules.webSite].map(useValidationRule)
const [isInvalidCompanyName, isInvalidAddress, isInvalidCountry, isInvalidState, isInvalidCity, isInvalidZipCode, isInvalidPhone, isInvalidWebSite,] = [companyNameValidate, addressValidate, countryValidate, stateValidate, cityValidate, zipCodeValidate, phoneValidate, webSiteValidate].map(validate => ref(validate.isInvalid))
const [companyNameErrorMessage, addressErrorMessage, countryErrorMessage, stateErrorMessage, cityErrorMessage, zipCodeErrorMessage, phoneErrorMessage, webSiteErrorMessage] = [companyNameValidate, addressValidate, countryValidate, stateValidate, cityValidate, zipCodeValidate, phoneValidate, webSiteValidate].map(validate => ref(validate.errorMessage))


const invalidForm = computed(() => {
    return isInvalidCompanyName.value || isInvalidAddress.value || isInvalidCountry.value || isInvalidState.value || isInvalidCity.value || isInvalidZipCode.value || isInvalidPhone.value || isInvalidWebSite.value;
});

function validateForm() {
    const errors = [
        companyNameValidate.validate(company.value.companyName),
        addressValidate.validate(company.value.companyName),
        countryValidate.validate(company.value.country),
        stateValidate.validate(company.value.state),
        cityValidate.validate(company.value.city),
        zipCodeValidate.validate(company.value.zipCode),
        phoneValidate.validate(company.value.phone),
        webSiteValidate.validate(company.value.webSite),
    ]
    return !errors.some((result) => result);
};

function validateInput(input: string) {
    const errors: Ref<(string | boolean)[]> = ref([])
    if (input === 'companyName' || input === 'address' || input === 'country' || input === 'state' || input === 'city' || input === 'zipCode' || input === 'phone' || input === 'webSite') {
        errors.value = [companyNameValidate.validate(company.value[input])]
    }
    return !errors.value.some((result) => result);
};

async function handlePatchCompanyDetails() {
    validateForm()
    if (!invalidForm.value) {
        loading.value = true;
        editCompanyDetails.value = false
        //useComposable fetch
        loading.value = false;
    }
}

/* const updateCompany = (obj: ICompany) => {
    company.value.companyName = obj.companyName,
    company.value.address = obj.address,
    company.value.country = obj.country,
    company.value.state = obj.state,
    company.value.city = obj.city,
    company.value.zipCode = obj.zipCode,
    company.value.phone = obj.phone,
    company.value.webSite = obj.webSite,
} */
</script>

<style scoped></style>