export default {
    state: {
        userData: {
            username: "",
            perm: [],
            role: "admin",
        }
    },
    mutations: {
        getUserData(state, data) {
            state.userData = data
        }
    },
    getters: {
        username: state => state.userData.username,
        userperm: state => state.userData.perm,
        userrole: state => state.userData.role,
    }
}