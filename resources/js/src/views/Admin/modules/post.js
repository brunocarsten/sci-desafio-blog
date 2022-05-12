import Vue from "vue";

export default {
    namespaced: true,
    state: {
        posts: [],
        search: []
    },
    getters: {
        posts: state => {
            return state.posts;
        },
        search: state => {
            return state.search;
        }
    },
    mutations: {
        updatePosts(state, payload) {
            state.posts = payload;
        },

        updateSearch(state, payload) {
            const find = state.posts.filter(item => {
                return (
                    item.title.toUpperCase().indexOf(payload.toUpperCase()) > -1
                );
            });
            state.search = find;
        }
    },
    actions: {
        async fetchPosts({ commit }) {
            const response = await Vue.$http.get("post");
            commit("updatePosts", response.data);
        },

        findPosts({ commit }, payload) {
            commit("updateSearch", payload);
        }
    }
};
