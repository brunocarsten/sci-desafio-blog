<template>
    <v-layout justify-center wrap align-center>
        <v-flex class="login" xs12 md5 align-self-center>
            <v-card
                width="100%"
                height="450"
                class="d-flex justify-center align-center"
            >
                <v-row class="pa-10">
                    <v-col cols="6">
                        <v-img
                            class="mx-auto"
                            width="180px"
                            height="180px"
                            src="/images/logo.png"
                        />
                    </v-col>
                    <v-col cols="6">
                        <v-form @submit="login">
                            <v-row justify="center">
                                <v-col cols="12">
                                    <v-text-field
                                        @input.native="handleData($event)"
                                        name="email"
                                        label="E-mail"
                                        :rules="[rules.required]"
                                        required
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        @input.native="handleData($event)"
                                        name="password"
                                        label="Senha"
                                        :rules="[rules.required]"
                                        required
                                        type="password"
                                    />
                                </v-col>

                                <v-col md="auto" cols="5">
                                    <v-btn
                                        :disabled="handleValidInput"
                                        :loading="loading"
                                        color="primary"
                                        type="submit"
                                    >
                                        Entrar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card>
        </v-flex>
        <div class="squares">
            <ul></ul>
        </div>
    </v-layout>
</template>

<script>
export default {
    name: "Login",

    data() {
        return {
            loading: false,
            data: [],
            rules: {
                required: target => !!target || `Este campo é obrigatório`
            }
        };
    },

    computed: {
        handleValidInput() {
            return Object.keys(this.data).length > 1 ? false : true;
        }
    },

    methods: {
        async login(event) {
            event.preventDefault();
            this.loading = true;
            this.$auth
                .login({
                    params: { ...this.data },
                    staySignedIn: true,
                    redirect: { name: "posts" }
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                });
        },

        handleData({ target: { name, value } }) {
            this.data = { ...this.data, [name]: value };
        }
    },

    mounted() {
        const ulSquares = document.querySelector(".squares ul");

        for (let i = 0; i < 11; i++) {
            const li = document.createElement("li");

            const random = (min, max) => Math.random() * (max - min) + min;

            const size = Math.floor(random(10, 120));
            const position = random(1, 99);
            const delay = random(5, 0.1);
            const duration = random(24, 12);

            li.style.width = `${size}px`;
            li.style.height = `${size}px`;
            li.style.bottom = `-${size}px`;

            li.style.left = `${position}%`;

            li.style.animationDelay = `${delay}s`;
            li.style.animationDuration = `${duration}s`;
            li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;

            ulSquares.appendChild(li);
        }
    }
};
</script>

<style lang="scss">
@import "@/auth/squares";
</style>
