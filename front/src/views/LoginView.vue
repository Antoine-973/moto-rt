<template>
    <main>
        <div class='h-screen grid justify-center items-center'>
            <div class='bg-gray-700 p-11 rounded-lg grid gap-4'>
                <h1>Connexion</h1>
<!--                <form class='grid gap-1' @submit="login">-->
<!--                    <input class="input input-bordered w-full max-w-xs" type="text" name="email" /><br>-->
<!--                    <input class="input input-bordered w-full max-w-xs" type="password" name="password" /><br>-->
<!--                    <input class='btn btn-primary' type="submit" value="Login" />-->
<!--                    <router-link :to="{ name: 'HomeView'}" class="btn btn-ghost normal-case">Annuler</router-link>-->
<!--                </form>-->
                <LoginForm :validation-schema="schema" @submit="handleLogin">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <Field name="email" type="email" class="form-control" />
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
                            <span>Login</span>
                        </button>
                    </div>

                    <div class="form-group">
                        <div v-if="message" class="alert alert-danger" role="alert">
                            {{ message }}
                        </div>
                    </div>
                </LoginForm>
            </div>
        </div>
    </main>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { computed } from 'vue'

export default {
    name: "LoginView",
    components: {
        LoginForm : Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            email: yup.string().required("Email is required!"),
            password: yup.string().required("Password is required!"),
        });

        return {
            loading: false,
            message: "",
            schema,
        };
    },
    computed: {
        loggedIn() {
            const authUserStore = useAuthUserStore()
            return computed(() => authUserStore.loggedIn)
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/profile");
        }
    },
    methods: {
        handleLogin(user) {
            this.loading = true;

            this.$store.dispatch("auth/login", user).then(
                () => {
                    this.$router.push("/profile");
                },
                (error) => {
                    this.loading = false;
                    this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
    },
};
</script>