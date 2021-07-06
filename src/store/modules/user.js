export default {
    state: {
        userData: {
            username: null,
            perm: []
        }
    },
    mutations: {
        getUserData(state, data) {
            state.userData = data
        }
    },
    getters: {
        username: state => state.userData.username,
        userperm: state => state.userData.perm
    }
}