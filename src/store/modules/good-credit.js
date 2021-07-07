export default {
    state: {
        GoodCredit: [
            {
                id: 1,
                checked: true,
                name: "Պայմանագիր",
                column: 'contract'
            },
            {
                id: 2,
                checked: true,
                name: "Անվանում",
                column: 'title'
            },
            {
                id: 3,
                checked: true,
                name: "Արժ.",
                column: 'value'
            },
            {
                id: 4,
                checked: true,
                name: "Ընդհանուր պարտք",
                column: "total_debt",
            },
            {
                id: 5,
                checked: true,
                name: "Գումար",
                column: "money",
            },
            {
                id: 6,
                checked: false,
                name: "Ժամկետանց գումար",
                column: 'overdue_amount'
            },
            {
                id: 7,
                checked: false,
                name: "Տոկոս",
                column: 'percent'
            },
            {
                id: 8,
                checked: false,
                name: "Ժամկետանց տոկոս",
                column: 'overdue_percent'
            },
            {
                id: 9,
                checked: false,
                name: "ԲՏՀԴ տոկ.",
                column: "anon_percent",
            },
            {
                id: 10,
                checked: false,
                name: "Ժամկետանց գումարի տույժ",
                column: 'penalty_overdue_amount'
            },
            {
                id: 11,
                checked: false,
                name: "Ժամկետանց տոկոսի տույժ",
                column: 'overdue_interest_penalty'
            },
            {
                id: 12,
                checked: false,
                name: "Վարձավճար",
                column: 'rent'
            },
            {
                id: 13,
                checked: false,
                name: "Ժամկետանց գումարի տոկոս",
                column: 'interest_overdue_amount'
            },
            {
                id: 14,
                checked: false,
                name: "Ձևանմուշի տեսակ",
                column: 'form_type'
            },
            {
                id: 15,
                checked: false,
                name: "Մարզ",
                column: 'region'
            },
            {
                id: 16,
                checked: false,
                name: "Պայմանագրի գումար",
                column: 'contract_amount'
            },
            {
                id: 17,
                checked: false,
                name: "Կնքման ամսաթիվ",
                column: 'sealing_date'
            },
            {
                id: 18,
                checked: false,
                name: "Մարման ժամկետ",
                column: 'repayment_period'
            },
            {
                id: 19,
                checked: false,
                name: "Ժամկետանց դառնալու օրը",
                column: 'delay_day'
            },
            {
                id: 20,
                checked: false,
                name: "Ժամկ.օ.ք",
                column: 'number_expired_days'
            },
            {
                id: 21,
                checked: false,
                name: "Ընդհ.ժամկ.օ.ք.",
                column: 'common_number_expired_days'
            },
            {
                id: 22,
                checked: false,
                name: "Մաքս.ժամկ.օ.ք",
                column: 'delay_max'
            },
            {
                id: 23,
                checked: false,
                name: "Բնակավայրի անուն",
                column: 'settlement'
            },
            {
                id: 24,
                checked: false,
                name: "Մարզի անուն",
                column: 'state_name'
            },
            {
                id: 25,
                checked: false,
                name: "Գրանցման հասցե",
                column: 'registration_address'
            },
            {
                id: 26,
                checked: false,
                name: "Հեռախոս",
                column: 'phone'
            },
            {
                id: 27,
                checked: false,
                name: "Բջջային",
                column: 'mobile'
            },
            {
                id: 28,
                checked: false,
                name: "Անձը հաստ.փաստթղթ.կոդ",
                column: 'passport_num'
            },
            {
                id: 29,
                checked: false,
                name: "Ա.հ.փ. Տրված",
                column: 'passport_authority'
            },
            {
                id: 30,
                checked: false,
                name: "Ա.հ.փ. Ամսաթիվ",
                column: 'passport_date'
            },
            {
                id: 31,
                checked: false,
                name: "Ա.հ.փ. Տիպ",
                column: 'passport_type'
            },
            {
                id: 32,
                checked: false,
                name: "ՀՎՀՀ",
                column: 'hvhh'
            },
            {
                id: 33,
                checked: false,
                name: "Գրանցման N",
                column: 'registration_num'
            },
            {
                id: 34,
                checked: false,
                name: "Սեռը",
                column: 'gender'
            },
            {
                id: 35,
                checked: false,
                name: "Ծննդյան ամսաթիվ",
                column: 'birthdate'
            },
            {
                id: 36,
                checked: false,
                name: "Էլ.փոստ",
                column: 'email'
            },
            {
                id: 37,
                checked: false,
                name: "Վճարման ենթակա մինիմալ գումար",
                column: 'min_amount'
            },
        ],
    },
    getters: {
        GoodCredit: state => state.GoodCredit,
    }
}