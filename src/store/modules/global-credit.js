export default {
    state: {
        GlobalCredit: [
            {
                id: 1,
                checked: true,
                name: "Պայմանագրի N",
                column: 'contract_num'
            },
            {
                id: 2,
                checked: true,
                name: "Անվանում",
                column: 'name'
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
                name: "Գումար",
                column: 'money'
            },
            {
                id: 5,
                checked: true,
                name: "Ժամկետանց գումար",
                column: 'overdue_amount'
            },
            {
                id: 6,
                checked: false,
                name: "Տոկոս",
                column: 'percent'
            },
            {
                id: 7,
                checked: false,
                name: "Ժամկետանց տոկոս",
                column: 'overdue_percent'
            },
            {
                id: 8,
                checked: false,
                name: "ԲՏՀԴ տոկ.",
                column: 'anon_percent'
            },
            {
                id: 9,
                checked: false,
                name: "Ժամկետանց գումարի տույժ",
                column: 'penalty_overdue_amount'
            },
            {
                id: 10,
                checked: false,
                name: "Ժամկետանց տոկոսի տույժ",
                column: 'overdue_interest_penalty'
            },
            {
                id: 11,
                checked: false,
                name: "Վարձավճար",
                column: 'rent'
            },
            {
                id: 12,
                checked: false,
                name: "Ժամկետանց գումարի տոկոս",
                column: 'interest_overdue_amount'
            },
            {
                id: 13,
                checked: false,
                name: "Գրավի արժեք",
                column: 'pledge_value'
            },
            {
                id: 14,
                checked: false,
                name: "Երաշխավորության արժեքը",
                column: 'guarantee_cost'
            },
            {
                id: 15,
                checked: false,
                name: "Գրավի առարկա",
                column: 'subject_pledge:'
            },
            {
                id: 16,
                checked: false,
                name: "Տոկոսադրույք",
                column: 'interest_rate'
            },
            {
                id: 17,
                checked: false,
                name: "Փաստ. տոկոս.",
                column: 'fact_percentage'
            },
            {
                id: 18,
                checked: false,
                name: "Օրացույցի հաշվարկման ձև",
                column: 'calendar_calculation'
            },
            {
                id: 19,
                checked: false,
                name: "Ռ.դ.",
                column: 'r_d'
            },
            {
                id: 20,
                checked: false,
                name: "Նպատակ",
                column: 'goal'
            },
            {
                id: 21,
                checked: false,
                name: "Ծր.",
                column: 'program'
            },
            {
                id: 22,
                checked: false,
                name: "Երշ.",
                column: 'ruff'
            },
            {
                id: 23,
                checked: false,
                name: "Ձևանմ. տեսակ",
                column: 'form_type'
            },
            {
                id: 24,
                checked: false,
                name: "Մարզ",
                column: 'region'
            },
            {
                id: 25,
                checked: false,
                name: "Սահմանաչափ",
                column: 'limit'
            },
            {
                id: 26,
                checked: false,
                name: "Պայմանագրի գումար",
                column: 'contract_amount'
            },
            {
                id: 27,
                checked: false,
                name: "Կնքման ամսաթիվ",
                column: 'sealing_date'
            },
            {
                id: 28,
                checked: false,
                name: "Հատկացման ամսաթիվ",
                column: 'allocation_date'
            },
            {
                id: 29,
                checked: false,
                name: "Վերջին տրման ամսաթիվ",
                column: 'last_issue_date'
            },
            {
                id: 30,
                checked: false,
                name: "Սկզբ.մարման ժամկետ",
                column: 'initial_repayment_period'
            },
            {
                id: 31,
                checked: false,
                name: "Մարման ժամկետ",
                column: 'repayment_period'
            },
            {
                id: 32,
                checked: false,
                name: "Ժամկետանց դառնալու օրը",
                column: 'delay_day'
            },
            {
                id: 33,
                checked: false,
                name: "Ժամկ. օ.ք",
                column: 'number_expired_days'
            },
            {
                id: 34,
                checked: false,
                name: "Ընդ. ժամկ.օ.ք",
                column: 'common_number_expired_days'
            },
            {
                id: 35,
                checked: false,
                name: "Անընդ. ժամկ.լ.ք",
                column: 'over_days'
            },
            {
                id: 36,
                checked: false,
                name: "Հաճախորդ",
                column: 'client'
            },
            {
                id: 37,
                checked: false,
                name: "Իրավ. կ.",
                column: 'legal_status'
            },
            {
                id: 38,
                checked: false,
                name: "Ոլորտ",
                column: 'sphere'
            },
            {
                id: 39,
                checked: false,
                name: "Բ. աշխ.",
                column: 'b_work'
            },
            {
                id: 40,
                checked: false,
                name: "Գրանցման հասցե",
                column: 'registration_address'
            },
            {
                id: 41,
                checked: false,
                name: "Փաստացի Հասցե",
                column: 'fact-address'
            },
            {
                id: 42,
                checked: false,
                name: "Հեռախոս",
                column: 'phone'
            },
            {
                id: 43,
                checked: false,
                name: "Բջջային",
                column: 'mobile'
            },
            {
                id: 44,
                checked: false,
                name: "Անձը հաստ. փաստթ. կոդ -",
                column: 'passport_num'
            },
            {
                id: 45,
                checked: false,
                name: "Ա.հ.փ. Տրված",
                column: 'passport_authority'
            },
            {
                id: 46,
                checked: false,
                name: "Ա.հ.փ. ամսթ.",
                column: 'passport_date'
            },
            {
                id: 47,
                checked: false,
                name: "Ա.հ.փ. Տիպ",
                column: 'passport_type'
            },
            {
                id: 48,
                checked: false,
                name: "ՀՎՀՀ",
                column: 'hvhh'
            },
            {
                id: 49,
                checked: false,
                name: "Գրանցման N",
                column: 'registration_num'
            },
            {
                id: 50,
                checked: false,
                name: "Սեռը",
                column: 'gender'
            },
            {
                id: 51,
                checked: false,
                name: "Ծննդյան ամսաթիվ",
                column: 'birthdate'
            },
            {
                id: 52,
                checked: false,
                name: "Գրանցման երկիր",
                column: 'registration_country'
            },
            {
                id: 53,
                checked: false,
                name: "Արտակարգ վերանայման տեսակ",
                column: 'extraordinary_review_type'
            },
            {
                id: 54,
                checked: false,
                name: "Նշում",
                column: 'note'
            },
            {
                id: 55,
                checked: false,
                name: "Նշում 2",
                column: 'note_2'
            },
            {
                id: 56,
                checked: false,
                name: "Նշում 3",
                column: 'note_3'
            },
            {
                id: 57,
                checked: false,
                name: "Նշում 4",
                column: 'note_4'
            },
            {
                id: 58,
                checked: false,
                name: "Անվանում",
                column: 'title'
            },
            {
                id: 59,
                checked: false,
                name: "Փուլ",
                column: 'stage'
            },
            {
                id: 60,
                checked: false,
                name: "ԽՎԲ մասնագետ",
                column: 'paf_specialist'
            },
            {
                id: 61,
                checked: false,
                name: "Է.Ռ.Ա.",
                column: 'era'
            },
            {
                id: 62,
                checked: false,
                name: "ԽՎԲ մուտքի ամսաթիվ",
                column: 'paf_login_date'
            },
            {
                id: 63,
                checked: false,
                name: "Դատարան",
                column: 'court'
            },
        ],
    },
    getters: {
        GlobalCredit: state => state.GlobalCredit,
    }
}