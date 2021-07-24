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
                checked: true,
                name: "Տոկոս",
                column: 'percent'
            },
            {
                id: 7,
                checked: true,
                name: "Ժամկետանց տոկոս",
                column: 'overdue_percent'
            },
            {
                id: 8,
                checked: true,
                name: "ԲՏՀԴ տոկ.",
                column: 'anon_percent'
            },
            {
                id: 9,
                checked: true,
                name: "Ժամկետանց գումարի տույժ",
                column: 'penalty_overdue_amount'
            },
            {
                id: 10,
                checked: true,
                name: "Ժամկետանց տոկոսի տույժ",
                column: 'overdue_interest_penalty'
            },
            {
                id: 11,
                checked: true,
                name: "Վարձավճար",
                column: 'rent'
            },
            {
                id: 12,
                checked: true,
                name: "Ժամկետանց գումարի տոկոս",
                column: 'interest_overdue_amount'
            },
            {
                id: 13,
                checked: true,
                name: "Գրավի արժեք",
                column: 'pledge_value'
            },
            {
                id: 14,
                checked: true,
                name: "Երաշխավորության արժեքը",
                column: 'guarantee_cost'
            },
            {
                id: 15,
                checked: true,
                name: "Գրավի առարկա",
                column: 'subject_pledge:'
            },
            {
                id: 16,
                checked: true,
                name: "Տոկոսադրույք",
                column: 'interest_rate'
            },
            {
                id: 17,
                checked: true,
                name: "Փաստ. տոկոս.",
                column: 'fact_percentage'
            },
            {
                id: 18,
                checked: true,
                name: "Օրացույցի հաշվարկման ձև",
                column: 'calendar_calculation'
            },
            {
                id: 19,
                checked: true,
                name: "Ռ.դ.",
                column: 'r_d'
            },
            {
                id: 20,
                checked: true,
                name: "Նպատակ",
                column: 'goal'
            },
            {
                id: 21,
                checked: true,
                name: "Ծր.",
                column: 'program'
            },
            {
                id: 22,
                checked: true,
                name: "Երշ.",
                column: 'ruff'
            },
            {
                id: 23,
                checked: true,
                name: "Ձևանմ. տեսակ",
                column: 'form_type'
            },
            {
                id: 24,
                checked: true,
                name: "Մարզ",
                column: 'region'
            },
            {
                id: 25,
                checked: true,
                name: "Սահմանաչափ",
                column: 'limit'
            },
            {
                id: 26,
                checked: true,
                name: "Պայմանագրի գումար",
                column: 'contract_amount'
            },
            {
                id: 27,
                checked: true,
                name: "Կնքման ամսաթիվ",
                column: 'sealing_date'
            },
            {
                id: 28,
                checked: true,
                name: "Հատկացման ամսաթիվ",
                column: 'allocation_date'
            },
            {
                id: 29,
                checked: true,
                name: "Վերջին տրման ամսաթիվ",
                column: 'last_issue_date'
            },
            {
                id: 30,
                checked: true,
                name: "Սկզբ.մարման ժամկետ",
                column: 'initial_repayment_period'
            },
            {
                id: 31,
                checked: true,
                name: "Մարման ժամկետ",
                column: 'repayment_period'
            },
            {
                id: 32,
                checked: true,
                name: "Ժամկետանց դառնալու օրը",
                column: 'delay_day'
            },
            {
                id: 33,
                checked: true,
                name: "Ժամկ. օ.ք",
                column: 'number_expired_days'
            },
            {
                id: 34,
                checked: true,
                name: "Ընդ. ժամկ.օ.ք",
                column: 'common_number_expired_days'
            },
            {
                id: 35,
                checked: true,
                name: "Անընդ. ժամկ.լ.ք",
                column: 'over_days'
            },
            {
                id: 36,
                checked: true,
                name: "Հաճախորդ",
                column: 'client'
            },
            {
                id: 37,
                checked: true,
                name: "Իրավ. կ.",
                column: 'legal_status'
            },
            {
                id: 38,
                checked: true,
                name: "Ոլորտ",
                column: 'sphere'
            },
            {
                id: 39,
                checked: true,
                name: "Բ. աշխ.",
                column: 'b_work'
            },
            {
                id: 40,
                checked: true,
                name: "Գրանցման հասցե",
                column: 'registration_address'
            },
            {
                id: 41,
                checked: true,
                name: "Փաստացի Հասցե",
                column: 'fact-address'
            },
            {
                id: 42,
                checked: true,
                name: "Հեռախոս",
                column: 'phone'
            },
            {
                id: 43,
                checked: true,
                name: "Բջջային",
                column: 'mobile'
            },
            {
                id: 44,
                checked: true,
                name: "Անձը հաստ. փաստթ. կոդ -",
                column: 'passport_num'
            },
            {
                id: 45,
                checked: true,
                name: "Ա.հ.փ. Տրված",
                column: 'passport_authority'
            },
            {
                id: 46,
                checked: true,
                name: "Ա.հ.փ. ամսթ.",
                column: 'passport_date'
            },
            {
                id: 47,
                checked: true,
                name: "Ա.հ.փ. Տիպ",
                column: 'passport_type'
            },
            {
                id: 48,
                checked: true,
                name: "ՀՎՀՀ",
                column: 'hvhh'
            },
            {
                id: 49,
                checked: true,
                name: "Գրանցման N",
                column: 'registration_num'
            },
            {
                id: 50,
                checked: true,
                name: "Սեռը",
                column: 'gender'
            },
            {
                id: 51,
                checked: true,
                name: "Ծննդյան ամսաթիվ",
                column: 'birthdate'
            },
            {
                id: 52,
                checked: true,
                name: "Գրանցման երկիր",
                column: 'registration_country'
            },
            {
                id: 53,
                checked: true,
                name: "Արտակարգ վերանայման տեսակ",
                column: 'extraordinary_review_type'
            },
            {
                id: 54,
                checked: true,
                name: "Նշում",
                column: 'note'
            },
            {
                id: 55,
                checked: true,
                name: "Նշում 2",
                column: 'note_2'
            },
            {
                id: 56,
                checked: true,
                name: "Նշում 3",
                column: 'note_3'
            },
            {
                id: 57,
                checked: true,
                name: "Նշում 4",
                column: 'note_4'
            },
            {
                id: 58,
                checked: true,
                name: "Անվանում",
                column: 'title'
            },
            {
                id: 59,
                checked: true,
                name: "Փուլ",
                column: 'stage'
            },
            {
                id: 60,
                checked: true,
                name: "ԽՎԲ մասնագետ",
                column: 'paf_specialist'
            },
            {
                id: 61,
                checked: true,
                name: "Է.Ռ.Ա.",
                column: 'era'
            },
            {
                id: 62,
                checked: true,
                name: "ԽՎԲ մուտքի ամսաթիվ",
                column: 'paf_login_date'
            },
            {
                id: 63,
                checked: true,
                name: "Դատարան",
                column: 'court'
            },
        ],
    },
    getters: {
        GlobalCredit: state => state.GlobalCredit,
    }
}