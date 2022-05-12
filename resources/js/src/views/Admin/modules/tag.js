import Vue from "vue";

export default {
    namespaced: true,
    state: {
        tags: []
    },
    getters: {
        tags: state => {
            return state.tags;
        }
    },
    mutations: {
        updateTags(state, payload) {
            state.tags = payload;
        }
    },
    actions: {
        async fetchTags({ commit }) {
            const response = await Vue.$http.get("tag");
            commit("updateTags", response.data);
        }
    }
};
