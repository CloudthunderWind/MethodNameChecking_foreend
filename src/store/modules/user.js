const user = {
    state: {
        isLogged: false,
    },
    mutations: {
        set_userStatus(state, flag) {
            state.isLogged = flag;
        }
    },
    actions: {}
};
export default user;