<template>
    <v-dialog v-model="value" persistent max-width="600px">
        <v-card class="mx-auto">
            <v-toolbar color="primary" dark>
                <v-toolbar-title>
                    {{ title }}
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-row>
                                <v-col
                                    cols="12"
                                    v-for="({ name, type, label }, i) in fields"
                                    :key="i"
                                >
                                    <v-text-field
                                        v-if="type === 'text'"
                                        :label="label"
                                        :name="name"
                                        required
                                        @input.native="handleData($event)"
                                    ></v-text-field>

                                    <v-textarea
                                        v-if="type === 'textarea'"
                                        solo
                                        :label="label"
                                        :name="name"
                                        @input.native="handleData($event)"
                                    ></v-textarea>

                                    <v-select
                                        v-model="selected"
                                        v-if="type === 'select'"
                                        :items="tags"
                                        :label="label"
                                        item-text="name"
                                        item-value="id"
                                        :name="name"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
                <small>* indica que o campo é obrigatório</small>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    :loading="loading"
                    dark
                    color="green"
                    @click="createItem()"
                >
                    SALVAR
                </v-btn>
                <v-btn dark color="red" @click="handleDialog">
                    CANCELAR
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        value: {
            type: Boolean
        },

        title: {
            type: String
        },

        fields: {
            type: Array
        },

        route: {
            type: String
        }
    },

    created() {
        this.$store.dispatch("Tag/fetchTags");
    },

    data() {
        return {
            selected: null,
            loading: false,
            data: []
        };
    },

    watch: {
        selected(newValue) {
            this.data = { ...this.data, ["tag_id"]: newValue };
        }
    },

    computed: {
        ...mapGetters("Tag", ["tags"])
    },

    methods: {
        handleDialog() {
            this.$emit("click", false);
        },

        handleData({ target: { name, value } }) {
            this.data = { ...this.data, [name]: value };
        },

        async createItem() {
            this.loading = true;
            console.log(this.data);
            const response = await this.$http
                .post(this.route, { ...this.data })
                .catch(err => {
                    console.log(err);
                });
            this.data = [];
            await this.$store.dispatch("Tag/fetchTags");
            await this.$store.dispatch("Post/fetchPosts");
            this.handleDialog();
        }
    }
};
</script>
