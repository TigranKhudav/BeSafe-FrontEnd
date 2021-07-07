export default {
    state: {
        userData: {
            username: "",
            perm: ['addPartners', 'addClient'],
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