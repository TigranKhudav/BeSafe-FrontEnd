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
                checked: true,
                name: "Ժամկետանց գումար",
                column: 'overdue_amount'
            },
            {
                id: 7,
                checked: true,
                name: "Տոկոս",
                column: 'percent'
            },
            {
                id: 8,
                checked: true,
                name: "Ժամկետանց տոկոս",
                column: 'overdue_percent'
            },
            {
                id: 9,
                checked: true,
                name: "ԲՏՀԴ տոկ.",
                column: "anon_percent",
            },
            {
                id: 10,
                checked: true,
                name: "Ժամկետանց գումարի տույժ",
                column: 'penalty_overdue_amount'
            },
            {
                id: 11,
                checked: true,
                name: "Ժամկետանց տոկոսի տույժ",
                column: 'overdue_interest_penalty'
            },
            {
                id: 12,
                checked: true,
                name: "Վարձավճար",
                column: 'rent'
            },
            {
                id: 13,
                checked: true,
                name: "Ժամկետանց գումարի տոկոս",
                column: 'interest_overdue_amount'
            },
            {
                id: 14,
                checked: true,
                name: "Ձևանմուշի տեսակ",
                column: 'form_type'
            },
            {
                id: 15,
                checked: true,
                name: "Մարզ",
                column: 'region'
            },
            {
                id: 16,
                checked: true,
                name: "Պայմանագրի գումար",
                column: 'contract_amount'
            },
            {
                id: 17,
                checked: true,
                name: "Կնքման ամսաթիվ",
                column: 'sealing_date'
            },
            {
                id: 18,
                checked: true,
                name: "Մարման ժամկետ",
                column: 'repayment_period'
            },
            {
                id: 19,
                checked: true,
                name: "Ժամկետանց դառնալու օրը",
                column: 'delay_day'
            },
            {
                id: 20,
                checked: true,
                name: "Ժամկ.օ.ք",
                column: 'number_expired_days'
            },
            {
                id: 21,
                checked: true,
                name: "Ընդհ.ժամկ.օ.ք.",
                column: 'common_number_expired_days'
            },
            {
                id: 22,
                checked: true,
                name: "Մաքս.ժամկ.օ.ք",
                column: 'delay_max'
            },
            {
                id: 23,
                checked: true,
                name: "Բնակավայրի անուն",
                column: 'settlement'
            },
            {
                id: 24,
                checked: true,
                name: "Մարզի անուն",
                column: 'state_name'
            },
            {
                id: 25,
                checked: true,
                name: "Գրանցման հասցե",
                column: 'registration_address'
            },
            {
                id: 26,
                checked: true,
                name: "Հեռախոս",
                column: 'phone'
            },
            {
                id: 27,
                checked: true,
                name: "Բջջային",
                column: 'mobile'
            },
            {
                id: 28,
                checked: true,
                name: "Անձը հաստ.փաստթղթ.կոդ",
                column: 'passport_num'
            },
            {
                id: 29,
                checked: true,
                name: "Ա.հ.փ. Տրված",
                column: 'passport_authority'
            },
            {
                id: 30,
                checked: true,
                name: "Ա.հ.փ. Ամսաթիվ",
                column: 'passport_date'
            },
            {
                id: 31,
                checked: true,
                name: "Ա.հ.փ. Տիպ",
                column: 'passport_type'
            },
            {
                id: 32,
                checked: true,
                name: "ՀՎՀՀ",
                column: 'hvhh'
            },
            {
                id: 33,
                checked: true,
                name: "Գրանցման N",
                column: 'registration_num'
            },
            {
                id: 34,
                checked: true,
                name: "Սեռը",
                column: 'gender'
            },
            {
                id: 35,
                checked: true,
                name: "Ծննդյան ամսաթիվ",
                column: 'birthdate'
            },
            {
                id: 36,
                checked: true,
                name: "Էլ.փոստ",
                column: 'email'
            },
            {
                id: 37,
                checked: true,
                name: "Վճարման ենթակա մինիմալ գումար",
                column: 'min_amount'
            },
        ],
    },
    getters: {
        GoodCredit: state => state.GoodCredit,
    }
}