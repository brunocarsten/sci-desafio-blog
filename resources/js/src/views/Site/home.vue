<template>
    <div class="blog">
        <h1>Blog</h1>
        <v-row>
            <v-col cols="4">
                <div class="search">
                    <v-text-field
                        filled
                        label="Pesquisar por título..."
                        append-icon="mdi-magnify"
                        color="black"
                        name="search"
                        @input.native="searchPost($event)"
                    />
                </div>
            </v-col>
        </v-row>
        <div class="d-flex justify-space-between">
            <div class="posts" v-if="hasPosts">
                <div class="d-flex justify-start flex-wrap" v-if="search != ''">
                    <Card v-for="(post, i) in search" :key="i" :post="post" />
                </div>
                <div class="d-flex justify-start flex-wrap" v-else>
                    <Card v-for="(post, i) in posts" :key="i" :post="post" />
                </div>
            </div>
            <div v-else>
                <p class="text-h5 mb-1">
                    Não há posts cadastrados no momento...
                </p>
            </div>
            <div class="tags elevation-8" v-if="tags">
                <v-container>
                    <h1>Tags</h1>

                    <v-chip-group
                        active-class="green accent-4 white--text"
                        column
                    >
                        <v-chip
                            v-for="(tag, i) in tags"
                            :key="i"
                            @click="filterByTag(tag)"
                        >
                            {{ tag.name }}
                        </v-chip>
                    </v-chip-group>
                </v-container>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "../../components/Site/Card.vue";
export default {
    components: {
        Card
    },

    data() {
        return {
            loading: false
        };
    },

    computed: {
        ...mapGetters("Post", ["posts", "search"]),
        ...mapGetters("Tag", ["tags"]),

        hasPosts() {
            if (this.posts != "" || this.search != "") {
                return true;
            } else {
                return false;
            }
        }
    },

    created() {
        console.log(this.$route.params);
        if (this.$route.params.from === "tag") return;

        this.$store.dispatch("Post/fetchPosts");
        this.$store.dispatch("Tag/fetchTags");
    },

    methods: {
        searchPost({ target: { value } }) {
            this.$store.dispatch("Post/findPosts", value);
        },

        async filterByTag({ id }) {
            const response = await this.$http.get(`tag/${id}/post`);
            this.$store.commit("Post/updatePosts", response.data);
        }
    }
};
</script>

<style lang="scss" scoped>
.posts {
    max-width: 70%;
}

.tags {
    width: 30%;
    max-width: 30%;
    max-height: 400px;
}
</style>
