<template>
    <div>
        <template>
            <v-container>
                <v-card class="mx-auto">
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>
                            Tags
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-data-table
                        :headers="headers"
                        :items="tags"
                        sort-by="name"
                        class="elevation-1"
                        :loading="loading"
                        loading-text="Carregando..."
                    >
                        <template v-slot:item.nome="prop">
                            <div class="item-name">
                                {{ prop.item.name }}
                            </div>
                        </template>

                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Buscar por nome..."
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
                                    Cadastrar tag
                                </v-btn>
                            </v-toolbar>
                        </template>
                    </v-data-table>
                    <Create
                        v-if="renderComponent"
                        @click="handleClick"
                        v-model="create"
                        title="Nova Tag"
                        :route="route"
                        :fields="fields"
                    />
                </v-card>
            </v-container>
        </template>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Create from "../../components/forms/Create.vue";

export default {
    name: "Tags",

    components: {
        Create
    },

    data: () => ({
        renderComponent: true,
        fields: [{ label: "Nome", name: "name", type: "text" }],
        route: "tag",
        create: false,
        edit: false,
        delete: false,
        deleteItemId: 0,
        search: "",
        loading: true,
        headers: [
            {
                text: "Nome",
                align: "start",
                sortable: true,
                value: "nome"
            },
            { text: "Ações", align: "end", value: "actions", sortable: false }
        ],
        items: []
    }),

    computed: {
        ...mapGetters("Tag", ["tags"])
    },

    watch: {
        create() {
            // Remove my-component from the DOM
            this.renderComponent = false;

            this.$nextTick(() => {
                // Add the component back in
                this.renderComponent = true;
            });
        }
    },

    async created() {
        await this.$store.dispatch("Tag/fetchTags");
        this.loading = false;
    },

    methods: {
        newItem() {
            this.create = true;
        },

        handleClick(value) {
            this.create = value;
        }
    }
};
</script>
