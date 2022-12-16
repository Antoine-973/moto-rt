<template>
    <main>
        <div class='h-screen grid justify-center items-center'>
            <div class='bg-gray-700 p-11 rounded-lg grid gap-4'>
                <h1>Inscription</h1>
                <FormRegister class='grid gap-1' :validation-schema="schema" @submit="handleRegister">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <Field name="email" type="text" class="form-control" />
                        <ErrorMessage name="email" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <Field name="password" type="password" class="form-control" />
                        <ErrorMessage name="password" class="error-feedback" />
                    </div>


                    <div class="form-group">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                          <span
                              v-show="loading"
                              class="spinner-border spinner-border-sm"
                          ></span>
                            Sign Up
                        </button>
                    </div>

                    <div
                        v-if="message"
                        class="alert"
                        :class="successful ? 'alert-success' : 'alert-danger'"
                    >
                        {{ message }}
                    </div>
                </FormRegister>
            </div>
        </div>
    </main>
</template>

<script>
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as yup from 'yup'

export default {
    name: "RegisterView",
    components: {
        FormRegister: Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
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

        return {
            successful: false,
            loading: false,
            message: "",
            schema,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    mounted() {
        if (this.loggedIn) {
            this.$router.push("/profile");
        }
    },
    methods: {
        handleRegister(user) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            this.$store.dispatch("auth/register", user).then(
                (data) => {
                    this.message = data.message;
                    this.successful = true;
                    this.loading = false;
                },
                (error) => {
                    this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.successful = false;
                    this.loading = false;
                }
            );
        },
    },
};
</script>