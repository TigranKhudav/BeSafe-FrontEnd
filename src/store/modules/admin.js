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
    },
    getters: {
        LawyerPerm: state => state.LawyerPerm,
        AllPerm: state => [...state.LawyerPerm, ...state.Perm],
        Subsection: state => state.Subsection,
        UserType: state => state.UserType,
    }
}