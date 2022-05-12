const getDefaultState = () => {
    return {
        snack: {
            active: false,
            text: null,
            color: null
        }
    };
};

const state = getDefaultState();

const getters = {
    snack: state => {
        return state.snack;
    }
};

const mutations = {
    resetState(state) {
        Object.assign(state, getDefaultState());
    },

    updateSnack(state, payload) {
        state.snack = payload;
    }
};

const actions = {
    updateSnack({ commit }, payload) {
        commit("updateSnack", payload);
    },

    resetInfoState({ commit }) {
        commit("resetState");
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
