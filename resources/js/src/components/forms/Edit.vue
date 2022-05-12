<template>
    <v-dialog v-model="value" persistent max-width="600px">
        <v-card class="mx-auto">
            <v-toolbar color="primary" dark>
                <v-toolbar-title>
                    Editar Post
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        :value="item.title"
                                        label="Título"
                                        name="title"
                                        required
                                        @input.native="handleData($event)"
                                    ></v-text-field>

                                    <v-textarea
                                        solo
                                        label="Descrição"
                                        name="content"
                                        :value="item.content"
                                        @input.native="handleData($event)"
                                    ></v-textarea>

                                    <v-select
                                        disabled
                                        :items="tags"
                                        :value="item.tag_id"
                                        item-text="name"
                                        item-value="id"
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
                    @click="editItem()"
                >
                    ATUALIZAR
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

        item: {
            type: Object
        }
    },

    data() {
        return {
            selected: null,
            loading: false,
            data: []
        };
    },

    computed: {
        ...mapGetters("Tag", ["tags"])
    },

    created() {
        this.$store.dispatch("Tag/fetchTags");
    },

    methods: {
        handleDialog() {
            this.$emit("click", false);
        },

        handleData({ target: { name, value } }) {
            this.data = { ...this.data, [name]: value };
        },

        async editItem() {
            this.loading = true;
            const response = await this.$http
                .put(`post/${this.item.id}`, { ...this.data })
                .catch(err => {
                    console.log(err);
                });
            await this.$store.dispatch("Post/fetchPosts");
            this.loading = false;
            this.handleDialog();
        }
    }
};
</script>
