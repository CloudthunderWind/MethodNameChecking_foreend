const getters = {
    isLogged: state => state.user.isLogged,
    history_list: state => state.user.history_list
};

export default getters;