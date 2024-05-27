<template>
    <div class="container-page">
        <div class="container-body">
            <div class="row">
                <div class="btn-back cursor-pointer" @click="Router.push('/account/profile')">
                    <ArrowRightIcon />
                    <p class="text-16-semibold">Back</p>
                </div>
            </div>
            <div class="container-title">
                <h1 class="title-4">Change Password</h1>
                <LineSeparator />
            </div>
            <div class="row-input">
                <inputFieldPass class="full-width" label="New Password" :required="true" />
                <inputFieldPass class="full-width" label="Confirm New Password" :required="true" />
            </div>
            <LineSeparator />
            <div class="container-buttons">
                <btnPrimary text-color="secondary" class="q-mt-lg nunito_regular" height width
                    label="Change Password" @onClickBtn="console.log('ok')" />
                <btnPrimary to="profile" text-color="secondary" class="q-mt-lg nunito_regular" color="" height width border
                    label="Cancel" />
            </div>
        </div>
    </div>
  <DiscardChanges />
</template>

<script setup lang="ts">
import ArrowRightIcon from 'src/assets/icons/arrows/ArrowRightIcon.vue';
import LineSeparator from 'src/components/defaultComponents/LineSeparator.vue';
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';
import inputFieldPass from 'src/components/defaultComponents/inputs/inputFieldPass.vue';
import { Router } from '../../router/index';
import DiscardChanges from 'src/components/defaultComponents/dialog/discardChanges.vue';

</script>

<style scoped>
.btn-back{
    display: flex;
    gap: 4px;
    align-items: center;
}
</style>