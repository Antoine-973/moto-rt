<template>
    <div>
        <main>
            <h3>{{ content }}</h3>
        </main>
    </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
    name: "BoardUser",
    data() {
        return {
            content: "",
        };
    },
    mounted() {
        UserService.getUserBoard().then(
            (response) => {
                this.content = response.data;
            },
            (error) => {
                this.content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
            }
        );
    },
};
</script>