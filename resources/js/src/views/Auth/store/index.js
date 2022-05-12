import axios from "axios";

export default {
    namespaced: true,

    state: {
        user: []
    },
    getters: {
        user: state => {
            return state.user;
        }
    },
    mutations: {
        SET_CURRENT_USER(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async FETCH_USER({ commit }) {
            const response = await axios.get("user");
            commit("SET_CURRENT_USER", response.data);
        }
    }
};
