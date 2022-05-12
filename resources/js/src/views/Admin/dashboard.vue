<template>
    <div>
        <template>
            <v-container>
                <v-card class="mx-auto">
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>
                            Posts
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-data-table
                        :headers="headers"
                        :items="posts"
                        sort-by="name"
                        class="elevation-1"
                        :loading="loading"
                        loading-text="Carregando..."
                    >
                        <template v-slot:item.title="prop">
                            <div class="item-name">
                                {{ prop.item.title }}
                            </div>
                        </template>

                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Buscar..."
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-spacer></v-spacer>
                                <v-btn
                                    @click="create = true"
                                    color="green"
                                    dark
                                    class="mb-2"
                                >
                                    Novo post
                                </v-btn>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="item">
                            <v-btn
                                x-small
                                color="info"
                                fab
                                @click="editItem(item)"
                            >
                                <v-icon small>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                            <v-btn
                                dark
                                x-small
                                color="red"
                                fab
                                @click="deleteItemDialog(item)"
                            >
                                <v-icon small>
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>

                    <Create
                        v-if="renderComponent"
                        @click="handleClickCreate"
                        v-model="create"
                        title="Novo post"
                        :route="route"
                        :fields="fields"
                    />
                    <Edit
                        v-if="item"
                        :item="item"
                        @click="handleClickEdit"
                        v-model="edit"
                    />

                    <v-dialog v-model="remove" persistent max-width="600px">
                        <v-card>
                            <v-card-title class="text-h5 error lighten-2">
                                Você deseja excluir esse POST?
                            </v-card-title>
                            <v-card-text>
                                Ao remover esse Post, todos os conteúdos
                                relacionados ao mesmo não serão mais exibidos.
                                <strong>
                                    Essa ação não poderá ser desfeita!
                                </strong>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="info" @click="remove = false">
                                    Cancelar
                                </v-btn>
                                <v-btn color="error" @click="deletePost">
                                    Excluir
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card>
            </v-container>
        </template>
    </div>
</template>

<script>
import Create from "../../components/forms/Create.vue";
import Edit from "../../components/forms/Edit.vue";

import { mapGetters } from "vuex";
export default {
    name: "Posts",

    components: {
        Create,
        Edit
    },

    data: () => ({
        renderComponent: true,
        id: null,
        fields: [
            { label: "Título", name: "title", type: "text" },
            { label: "Conteúdo", name: "content", type: "textarea" },
            { label: "Tag", name: "tag_id", type: "select" }
        ],
        route: "post",
        create: false,
        edit: false,
        remove: false,
        search: "",
        loading: true,
        headers: [
            {
                text: "Título",
                align: "start",
                sortable: true,
                value: "title"
            },
            { text: "Ações", align: "end", value: "actions", sortable: false }
        ],
        item: null
    }),

    async created() {
        await this.$store.dispatch("Post/fetchPosts");
        this.loading = false;
    },

    watch: {
        create() {
            this.renderComponent = false;
            this.$nextTick(() => {
                this.renderComponent = true;
            });
        }
    },

    computed: {
        ...mapGetters("Post", ["posts"])
    },

    methods: {
        newItem() {
            this.create = true;
        },

        editItem({ item }) {
            this.item = item;
            console.log(this.item);
            this.edit = true;
        },

        deleteItemDialog({ item }) {
            this.item = item;
            this.remove = true;
        },

        handleClickEdit(value) {
            this.edit = value;
        },

        handleClickCreate(value) {
            this.create = value;
        },

        async deletePost() {
            const response = await this.$http.delete(`post/${this.item.id}`);
            console.log(response.data);
            this.remove = false;
            await this.$store.dispatch("Post/fetchPosts");
        }
    }
};
</script>
