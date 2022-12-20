<script setup>
import { Field, Form } from 'vee-validate'
import * as Yup from 'yup'
import * as yup from 'yup'

import { useAlertStore, useAuthStore } from '@/stores'
import router from '../router/router'

const schema = Yup.object().shape({
    username: yup
        .string()
        .required("Username is required!")
        .max(50, "Must be maximum 50 characters!"),
    email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
    password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
});

async function onSubmit(values) {
    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    try {
        await authStore.register(values);
        await router.push('/account/login');
        alertStore.success('Registration successful');
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <div class='h-screen grid justify-center items-center'>
        <div class='bg-gray-700 p-11 rounded-lg grid gap-4'>
            <h1>Inscription</h1>
        <div class="card-body">
            <Form v-slot="{ errors, isSubmitting }" :validation-schema="schema" @submit="onSubmit">
                <div class="form-group">
                    <label>Username</label>
                    <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <Field name="email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }" />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Register
                    </button>
                    <router-link to="login" class="btn btn-link">Cancel</router-link>
                </div>
            </Form>
        </div>
    </div>
    </div>
</template>