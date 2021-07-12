import axios from '@/utils/axios'

export default {
    state: {
        LawyerPerm: [
            { id: 1, checked: false, val: "createUser", name: "Ստեղծել նոր user" },
            {
                id: 2,
                checked: false,
                val: "resetPass",
                name: "Գաղտնաբառի վերականգնում",
            },
            { id: 3, checked: false, val: "editInfo", name: "Խմբագրել ինֆորմացիա" },
            { id: 4, checked: false, val: "removeInfo", name: "Ջնջել ինֆորմացիա" },
        ],
        Perm: [
            {
                id: 5,
                checked: false,
                val: "updateSubjectDay",
                name: "Թարմացնել <<Օրվա ենթակա>>-ի ցանկը",
            },
            {
                id: 6,
                checked: false,
                val: "addPartners",
                name: "<<Գործընկերներ>> բաժնում ավելացնել գործընկեր",
            },
            {
                id: 7,
                checked: false,
                val: "addClient",
                name: "Ներմուծել հաճախորդ",
            },
            {
                id: 8,
                checked: false,
                val: "editReport",
                name: "Խմբագրել/ջնջել <<Հաշվետվություն>> բաժնի ամսաթվերը",
            },
            {
                id: 9,
                checked: false,
                val: "updateReport",
                name: "Թարմացնել <<Հաշվետվություն>> բաժնի գործերը/ինֆորմացիան",
            },
            {
                id: 10,
                checked: false,
                val: "confirmReport",
                name: "Հաստատել <<Հաշվետվություն>> բաժնի ամսաթվերի փոփոխությունները",
            },
        ],
        Subsection: [
            { id: 1, access: "lawyer", name: "Փաստաբանական" },
            { id: 2, access: "debts", name: "Պարտքերի հավաքագրման" },
            { id: 3, access: "two", name: "Փաստաբանական/Պարտքերի հավաքագրման" },
        ],
        UserType: [
            { id: 1, name: "Օգտագործող", role: "user" },
            { id: 2, name: "Ադմին", role: "admin" },
        ],
        Users: [
            {
                id: 1,
                name: "Anushavagyan",
                role: "user",
                access: "debts",
            },
            {
                id: 2,
                name: "Bnushavagyan",
                role: "user",
                access: "lawyer",
            },
            {
                id: 3,
                name: "banushavagyan",
                role: "admin",
                access: "two",
            },
        ],
    },
    actions: {
        createUser({ state }, data) {
            axios.post('users', data)
                .then(res => state.Users = res)
                .catch(err => console.log(err))
        },
        editUser(_, data) {
            axios.put('users', data)
                .then(res => state.Users = res)
                .catch(err => console.log(err))
        },
        removeUser({ state }, data) {
            axios.delete('users', data)
                .then(res => state.Users = res)
                .catch(err => console.log(err))
        },
        getUsers({ state }) {
            axios.get('users')
                .then(res => state.Users = res)
                .catch(err => console.log(err))
        }
    },
    getters: {
        Users: state => state.Users,
        LawyerPerm: state => state.LawyerPerm,
        AllPerm: state => [...state.LawyerPerm, ...state.Perm],
        Subsection: state => state.Subsection,
        UserType: state => state.UserType,
    }
}