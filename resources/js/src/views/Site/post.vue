<template>
    <div class="single-post d-flex justify-space-between">
        <div class="post">
            <v-card v-if="post">
                <v-img
                    height="400"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                ></v-img>

                <v-card-title>{{ post.title }}</v-card-title>

                <v-card-text>
                    <div class="my-4 text-subtitle-1">
                        Data: {{ format(post.created_at) }}
                    </div>

                    <div class="content">
                        {{ post.content }}
                    </div>
                </v-card-text>
            </v-card>
        </div>

        <div class="tags elevation-8" v-if="tags">
            <v-container>
                <h1>Tags</h1>

                <v-chip-group active-class="green accent-4 white--text" column>
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
</template>

<script>
import moment from "moment";

import { mapGetters } from "vuex";

export default {
    data() {
        return {
            post: null
        };
    },

    computed: {
        ...mapGetters("Tag", ["tags"])
    },

    created() {
        this.fetchPost();
    },

    methods: {
        async fetchPost() {
            const response = await this.$http.get(
                `post/${this.$route.query.id}}`
            );
            this.post = response.data;
        },

        async filterByTag({ id }) {
            const response = await this.$http.get(`tag/${id}/post`);
            this.$store.commit("Post/updatePosts", response.data);
            this.$router.push({ name: "site", params: { from: "tag" } });
        },

        format(date) {
            return moment(date).format("D/MM/YYYY");
        }
    }
};
</script>

<style lang="scss" scoped>
.post {
    width: 65%;
    max-width: 65%;
}

.tags {
    width: 30%;
    max-width: 30%;
    max-height: 400px;
}
</style>
