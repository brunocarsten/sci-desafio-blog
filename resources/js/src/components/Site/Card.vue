<template>
    <v-card @click="navigate()" class="mb-5 mr-5" max-width="374">
        <v-img
            height="250"
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

        <v-divider class="mx-4"></v-divider>

        <v-card-title>Tag</v-card-title>

        <v-card-text>
            <v-chip-group column>
                <v-chip color="black" text-color="white">
                    {{ post.tag }}
                </v-chip>
            </v-chip-group>
        </v-card-text>
    </v-card>
</template>

<script>
import moment from "moment";

export default {
    props: {
        post: {
            type: Object
        }
    },

    data() {
        return {
            tag: null
        };
    },

    methods: {
        format(date) {
            return moment(date).format("D/MM/YYYY");
        },

        navigate() {
            this.$router.push({
                name: "post",
                query: { id: this.post.id }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    max-height: 89px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
