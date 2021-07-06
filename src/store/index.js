import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/utils/axios'
import acba from './modules/acba.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    acba
  },
  state: {
    componentNumber: 0,
    showHistory: false,
    showSendEmail: false,
    showInfo: false,
    showRepaymentSchedule: false,
    UserData: {
      type: Object
    },
    Statuses: [
      { id: 1, name: "Թերի փաստաթղթեր" },
      { id: 2, name: "Բանակցություն" },
      { id: 3, name: "Դատարան. Հայցադիմումը ուղարկվել է դատարան" },
      { id: 4, name: "Դատարան.ՎԿ վերացվել է (ծանուցման խնդիր)" },
      { id: 5, name: "Դատարան. ՎԿ վերացվել է (Առարկություն)" },
      { id: 6, name: "Դատարան. ՎԿ վերացվել է (Վճարել է)" },
      { id: 7, name: "Դատարան. Կատարողական թերթի դիմում.պարտապան" },
      { id: 8, name: "Դատարան. Տրամադրվել է Կատարողական Թերթ" },
      { id: 9, name: "ԴԱՀԿ որոշում վարույթ հարուցելու մասին" },
      { id: 10, name: "ԴԱՀԿ (Կասեցված)" },
      { id: 11, name: "ԴԱՀԿ (Ավարտված)" },
      { id: 12, name: "ԴԱՀԿ ( Կարճված)" },
      { id: 13, name: "Դատարան. Հայցադիմումն ընդունվել է վարույթ" },
      { id: 14, name: "Դատարան. Նշանակվել է դատական նիստ" },
      { id: 15, name: "Դատարան. Գործի վարույթը կասեցվել է" },
      { id: 16, name: "Դատարան. Վճիռ ( Բավարարվել է ամբողջությամբ)" },
      { id: 17, name: "Դատարան. Վճիռ (Բավարարվել է մասնակի)" },
      { id: 18, name: "Դատարան. Վճիռ ( Մերժվել է)" },
      { id: 19, name: "Դատարան. Վճիռ ( Կարճված)" },
      { id: 20, name: "Դատարան. ՎԿ մի մասով արձակվել մյուս մասով մերժվել է" },
      { id: 21, name: "Դատարան. Հայցային վարույթի նախապատրաստում" },
      {
        id: 22,
        name: "Դատարան./ ՎԿ-ն մտել է օրինական ուժի մեջ ամբողջությամբ",
      },
      { id: 23, name: "ԴԱՀԿ (կատարողական վարույթը վերսկսվելու մասին)" },
      { id: 24, name: "Դատարան. Սնանկ է ճանաչվել" },
      { id: 25, name: "Կատարողական թերթը դատարանի կողմից ուղարկվել է ԴԱՀԿ" },
      { id: 26, name: "Դատարան.ՎԿ մերժվել է" },
      { id: 27, name: "Դատարան.ՎԿ ուժի մեջ է մտել մասնակի" },
      { id: 28, name: "Ժամկետանց կ/թ" },
      { id: 29, name: "Դատարան. Հայցադիմումը վերադարձվել է" },
      { id: 30, name: "Վճարված" },
      { id: 31, name: "Թերի պայմանագիր" },
      { id: 32, name: "Թերի քաղվածք" },
      { id: 33, name: "Դատարան. Վճիռ (առանց քննության)" },
      { id: 34, name: "Դատարան. Հայցադիմումի ընդունումը մերժվել է" },
      { id: 35, name: "Դատարան. Պարտավորագիր (գրություն դատարանին)" },
      { id: 36, name: "Դատարան. Պարտավորագիր ( զանգ դատարանին)" },
      { id: 37, name: "ԴԱՀԿ.(Պարտավորագիր արգելանքների վերացմամբ)" },
      { id: 38, name: "ԴԱՀԿ .( Պարտավորագիր առանց արգելանքների վերացման)" },
      { id: 39, name: "ԴԱՀԿ.(Հետաձգում)" },
      {
        id: 40,
        name: "ՎԿ փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
      },
      {
        id: 41,
        name: "Հայցադիմումի փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
      },
      { id: 42, name: "ՎԿ-2 փաստաթղթերը տրամադրված են կատարողին" },
      {
        id: 43,
        name: "2-րդ հայցադիմումի փաստաթղթերը տրամադրված են կատարողին",
      },
      { id: 44, name: "Կատ.թերթի վրիպակ" },
      { id: 45, name: "Հարգելի դիմում( կ/թ-ի ժամկետը բաց է թողնվել )" },
      { id: 46, name: "Հայցադիմումը մուտքագրված է դատարան(ԴԱՀԿ-ից հետո)" },
      { id: 47, name: "Թերի հասցե" },
      { id: 48, name: "Լուծարված" },
      { id: 49, name: "Վճարված(գրությունը ուղարկված է)" },
      { id: 50, name: "Կատարողական թերթը թողնվել է անհետևանք" },
      { id: 51, name: "Կատարողական թերթը ուղարկվել է դատարան" },
      { id: 52, name: "Դատարան. Կատարողական թերթի դիմում" },
      { id: 53, name: "Չուղարկած կատթերթ" },
      { id: 54, name: "ժամկետանց" },
      { id: 55, name: "Դուրսգրված" },
      { id: 56, name: "Բանակցություն" },
      { id: 57, name: "Փակված այլ պատճառներով" },
    ],
    Ucom: [
      {
        id: 1,
        checked: true,
        name: "Հերթական համար",
      },
      {
        id: 2,
        checked: true,
        name: "Հիմնական պարտք",
      },
      {
        id: 3,
        checked: true,
        name: "ID",
      },
      {
        id: 4,
        checked: true,
        name: "Account",
      },
      {
        id: 5,
        checked: true,
        name: "Ընկերության անուն",
      },
      {
        id: 6,
        checked: false,
        name: "Կարգավիճակ",
      },
      {
        id: 7,
        checked: false,
        name: "Վերջին ստատուսի փոփոխման ամսաթիվ",
      },
      {
        id: 8,
        checked: false,
        name: "Հեռախոսի համար",
      },
      {
        id: 9,
        checked: false,
        name: "Սակագին",
      },
      {
        id: 10,
        checked: false,
        name: "Անուն",
      },
      {
        id: 11,
        checked: false,
        name: "Անձնագիր",
      },
      {
        id: 12,
        checked: false,
        name: "Անձնագրի տրման ամսաթիվ",
      },
      {
        id: 13,
        checked: false,
        name: "Անձնագիրը ում կողմից է տրված",
      },
      {
        id: 14,
        checked: false,
        name: "Հաշվառման հասցե",
      },
      {
        id: 15,
        checked: false,
        name: "Մարզ",
      },
      {
        id: 16,
        checked: false,
        name: "Համայնք",
      },
      {
        id: 17,
        checked: false,
        name: "Հասցեի տեսակ",
      },
      {
        id: 18,
        checked: false,
        name: "Բնակավայր",
      },
      {
        id: 19,
        checked: false,
        name: "Փողոց",
      },
      {
        id: 20,
        checked: false,
        name: "Շենք/Շինություն",
      },
      {
        id: 21,
        checked: false,
        name: "Շենք/Շինություն տեսակ",
      },
      {
        id: 22,
        checked: false,
        name: "Բնակարան/Տարածք",
      },
      {
        id: 23,
        checked: false,
        name: "Ծառայության պարտք",
      },
      {
        id: 24,
        checked: false,
        name: "Ընթացքում վճարված",
      },
      {
        id: 25,
        checked: false,
        name: "Ծննդյան ամսաթիվ",
      },
      {
        id: 26,
        checked: false,
        name: "Պայմանագրի համար",
      },
      {
        id: 27,
        checked: false,
        name: "Պայմանագրի կնքման ամսաթիվ",
      },
      {
        id: 28,
        checked: false,
        name: "Պարտքի սկզբի ամսաթիվ",
      },
      {
        id: 29,
        checked: false,
        name: "Device name 1",
      },
      {
        id: 30,
        checked: false,
        name: "Device price 1",
      },
      {
        id: 31,
        checked: false,
        name: "Device prepayment 1",
      },
      {
        id: 32,
        checked: false,
        name: "Device_penalty 1",
      },
      {
        id: 33,
        checked: false,
        name: "Device commitment period 1",
      },
      {
        id: 34,
        checked: false,
        name: "Device name 2",
      },
      {
        id: 35,
        checked: false,
        name: "Device price 2",
      },
      {
        id: 36,
        checked: false,
        name: "Device prepayment 2",
      },
      {
        id: 37,
        checked: false,
        name: "Device penalty 2",
      },
      {
        id: 38,
        checked: false,
        name: "Device commitment period 2",
      },
      {
        id: 39,
        checked: false,
        name: "Lուծման ամսաթիվ",
      },
      {
        id: 40,
        checked: false,
        name: "Promo Commitment period 1",
      },
      {
        id: 41,
        checked: false,
        name: "Promo Commitment period 2",
      },
      {
        id: 42,
        checked: false,
        name: "Promo name 1",
      },
      {
        id: 43,
        checked: false,
        name: "Promo commitment penalty 1",
      },
      {
        id: 44,
        checked: false,
        name: "Promo name 2",
      },
      {
        id: 45,
        checked: false,
        name: "Promo commitment penalty 2",
      },
      {
        id: 46,
        checked: false,
        name: "Contract cost",
      },
      {
        id: 47,
        checked: false,
        name: "Guarantor name",
      },
      {
        id: 48,
        checked: false,
        name: "Guarantor passport",
      },
      {
        id: 49,
        checked: false,
        name: "Guarantor address",
      },
      {
        id: 50,
        checked: false,
        name: "Guarantor Մարզ",
      },
      {
        id: 51,
        checked: false,
        name: "Guarantor Համայնք",
      },
      {
        id: 52,
        checked: false,
        name: "Guarantor Հասցեի տեսակ",
      },
      {
        id: 53,
        checked: false,
        name: "Guarantor Բնակավայր",
      },
      {
        id: 54,
        checked: false,
        name: "Guarantor Փողոց",
      },
      {
        id: 55,
        checked: false,
        name: "Guarantor Շենք/Շինություն",
      },
      {
        id: 56,
        checked: false,
        name: "Guarantor Շենք/Շինություն տեսակ",
      },
      {
        id: 57,
        checked: false,
        name: "Guarantor Բնակարան/Տարածք",
      },
      {
        id: 58,
        checked: false,
        name: "Guarantor number",
      },
      {
        id: 59,
        checked: false,
        name: "Colored number",
      },
      {
        id: 60,
        checked: false,
        name: "Colored number period",
      },
      {
        id: 61,
        checked: false,
        name: "Colored number penalty",
      },
      {
        id: 62,
        checked: false,
        name: "Սկզբնական պարտք",
      },
      {
        id: 63,
        checked: false,
        name: "Վարույթի կոդ",
      },
      {
        id: 64,
        checked: false,
        name: "E-request",
      },
      {
        id: 65,
        checked: false,
        name: "Գույքի տեսակ",
      },
      {
        id: 66,
        checked: false,
        name: "ԴԱՀԿ հոդված",
      },
      {
        id: 67,
        checked: false,
        name: "Պետտուրք",
      },
      {
        id: 68,
        checked: false,
        name: "Guarantee agreement signing date",
      },
      {
        id: 69,
        checked: false,
        name: "Guarantor birth date",
      },
      {
        id: 70,
        checked: false,
        name: "Social card number",
      },
      {
        id: 71,
        checked: false,
        name: "Service application",
      },
      {
        id: 72,
        checked: false,
        name: "Daily penalty",
      },
      {
        id: 73,
        checked: false,
        name: "Դատարանի անուն",
      },
      {
        id: 74,
        checked: false,
        name: "Դիմող",
      },
      {
        id: 75,
        checked: false,
        name: "Գործի համար",
      },
      {
        id: 76,
        checked: false,
        name: "Դատավոր",
      },
      {
        id: 77,
        checked: false,
        name: "Նշում",
      },
      {
        id: 78,
        checked: false,
        name: "Մուտքագրման ամսաթիվ",
      },
      {
        id: 79,
        checked: false,
        name: "Էլ․ հասցե",
      },
      {
        id: 80,
        checked: false,
        name: "Դատարանի ծախսեր",
      },
      {
        id: 81,
        checked: false,
        name: "Հայցագին",
      },
      {
        id: 82,
        checked: false,
        name: "API-ի վերադաձրած անվանում",
      },
      {
        id: 83,
        checked: false,
        name: "API-ի վերադաձրած ստատուս",
      },
      {
        id: 84,
        checked: false,
        name: "API-ի ուղարկման ամսաթիվ",
      },
      {
        id: 85,
        checked: false,
        name: "Նախորդ ստատուս",
      },
      {
        id: 86,
        checked: false,
        name: "Նախորդ ստատուսի փոփոխման ամսաթիվ",
      },
    ],
    GlobalCredit: [
      {
        id: 1,
        checked: true,
        name: "Պայմանագրի N",
      },
      {
        id: 2,
        checked: true,
        name: "Անվանում",
      },
      {
        id: 3,
        checked: true,
        name: "Արժ.",
      },
      {
        id: 4,
        checked: true,
        name: "Գումար",
      },
      {
        id: 5,
        checked: true,
        name: "Ժամկետանց գումար",
      },
      {
        id: 6,
        checked: false,
        name: "Տոկոս",
      },
      {
        id: 7,
        checked: false,
        name: "Ժամկետանց տոկոս",
      },
      {
        id: 8,
        checked: false,
        name: "ԲՏՀԴ տոկ.",
      },
      {
        id: 9,
        checked: false,
        name: "Ժամկետանց գումարի տույժ",
      },
      {
        id: 10,
        checked: false,
        name: "Ժամկետանց տոկոսի տույժ",
      },
      {
        id: 11,
        checked: false,
        name: "Վարձավճար",
      },
      {
        id: 12,
        checked: false,
        name: "Ժամկետանց գումարի տոկոս",
      },
      {
        id: 13,
        checked: false,
        name: "Գրավի արժեք",
      },
      {
        id: 14,
        checked: false,
        name: "Երաշխավորության արժեքը",
      },
      {
        id: 15,
        checked: false,
        name: "Գրավի առարկա",
      },
      {
        id: 16,
        checked: false,
        name: "Տոկոսադրույք",
      },
      {
        id: 17,
        checked: false,
        name: "Փաստ. տոկոս.",
      },
      {
        id: 18,
        checked: false,
        name: "Օրացույցի հաշվարկման ձև",
      },
      {
        id: 19,
        checked: false,
        name: "Ռ.դ.",
      },
      {
        id: 20,
        checked: false,
        name: "Նպատակ",
      },
      {
        id: 21,
        checked: false,
        name: "Ծր.",
      },
      {
        id: 22,
        checked: false,
        name: "Երշ.",
      },
      {
        id: 23,
        checked: false,
        name: "Ձևանմ. տեսակ",
      },
      {
        id: 24,
        checked: false,
        name: "Մարզ",
      },
      {
        id: 25,
        checked: false,
        name: "Սահմանաչափ",
      },
      {
        id: 26,
        checked: false,
        name: "Պայմանագրի գումար",
      },
      {
        id: 27,
        checked: false,
        name: "Կնքման ամսաթիվ",
      },
      {
        id: 28,
        checked: false,
        name: "Հատկացման ամսաթիվ",
      },
      {
        id: 29,
        checked: false,
        name: "Վերջին տրման ամսաթիվ",
      },
      {
        id: 30,
        checked: false,
        name: "Սկզբ.մարման ժամկետ",
      },
      {
        id: 31,
        checked: false,
        name: "Մարման ժամկետ",
      },
      {
        id: 32,
        checked: false,
        name: "Ժամկետանց դառնալու օրը",
      },
      {
        id: 33,
        checked: false,
        name: "Ժամկ. օ.ք",
      },
      {
        id: 34,
        checked: false,
        name: "Ընդ. ժամկ.օ.ք",
      },
      {
        id: 35,
        checked: false,
        name: "Անընդ. ժամկ.լ.ք",
      },
      {
        id: 36,
        checked: false,
        name: "Հաճախորդ",
      },
      {
        id: 37,
        checked: false,
        name: "Իրավ. կ.",
      },
      {
        id: 38,
        checked: false,
        name: "Ոլորտ",
      },
      {
        id: 39,
        checked: false,
        name: "Բ. աշխ.",
      },
      {
        id: 40,
        checked: false,
        name: "Գրանցման հասցե",
      },
      {
        id: 41,
        checked: false,
        name: "Փաստացի Հասցե",
      },
      {
        id: 42,
        checked: false,
        name: "Հեռախոս",
      },
      {
        id: 43,
        checked: false,
        name: "Բջջային",
      },
      {
        id: 44,
        checked: false,
        name: "Անձը հաստ. փաստթ.    կոդ -",
      },
      {
        id: 45,
        checked: false,
        name: "Ա.հ.փ. Տրված",
      },
      {
        id: 46,
        checked: false,
        name: "Ա.հ.փ. ամսթ.",
      },
      {
        id: 47,
        checked: false,
        name: "Ա.հ.փ. Տիպ",
      },
      {
        id: 48,
        checked: false,
        name: "ՀՎՀՀ",
      },
      {
        id: 49,
        checked: false,
        name: "Գրանցման N",
      },
      {
        id: 50,
        checked: false,
        name: "Սեռը",
      },
      {
        id: 51,
        checked: false,
        name: "Ծննդյան ամսաթիվ",
      },
      {
        id: 52,
        checked: false,
        name: "Գրանցման երկիր",
      },
      {
        id: 53,
        checked: false,
        name: "Արտակարգ վերանայման տեսակ",
      },
      {
        id: 54,
        checked: false,
        name: "Նշում",
      },
      {
        id: 55,
        checked: false,
        name: "Նշում 2",
      },
      {
        id: 56,
        checked: false,
        name: "Նշում 3",
      },
      {
        id: 57,
        checked: false,
        name: "Նշում 4",
      },
      {
        id: 58,
        checked: false,
        name: "Անվանում",
      },
      {
        id: 59,
        checked: false,
        name: "Փուլ",
      },
      {
        id: 60,
        checked: false,
        name: "ԽՎԲ մասնագետ",
      },
      {
        id: 61,
        checked: false,
        name: "Է.Ռ.Ա.",
      },
      {
        id: 62,
        checked: false,
        name: "ԽՎԲ մուտքի ամսաթիվ",
      },
      {
        id: 63,
        checked: false,
        name: "Դատարան",
      },
    ],
    GoodCredit: [
      {
        id: 1,
        checked: true,
        name: "Պայմանագիր",
      },
      {
        id: 2,
        checked: true,
        name: "Անվանում",
      },
      {
        id: 3,
        checked: true,
        name: "Արժ.",
      },
      {
        id: 4,
        checked: true,
        name: "Total Debt",
      },
      {
        id: 5,
        checked: true,
        name: "Գումար",
      },
      {
        id: 6,
        checked: false,
        name: "Ժամկետանց գումար",
      },
      {
        id: 7,
        checked: false,
        name: "Տոկոս",
      },
      {
        id: 8,
        checked: false,
        name: "Ժամկետանց տոկոս",
      },
      {
        id: 9,
        checked: false,
        name: "ԲՏՀԴ տոկ.",
      },
      {
        id: 10,
        checked: false,
        name: "Ժամկետանց գումարի տույժ",
      },
      {
        id: 11,
        checked: false,
        name: "Ժամկետանց տոկոսի տույժ",
      },
      {
        id: 12,
        checked: false,
        name: "Վարձավճար",
      },
      {
        id: 13,
        checked: false,
        name: "Ժամկետանց գումարի տոկոս",
      },
      {
        id: 14,
        checked: false,
        name: "Ձևանմուշի տեսակ",
      },
      {
        id: 15,
        checked: false,
        name: "Մարզ",
      },
      {
        id: 16,
        checked: false,
        name: "Պայմանագրի գումար",
      },
      {
        id: 17,
        checked: false,
        name: "Կնքման ամսաթիվ",
      },
      {
        id: 18,
        checked: false,
        name: "Մարման ժամկետ",
      },
      {
        id: 19,
        checked: false,
        name: "Ժամկետանց դառնալու օրը",
      },
      {
        id: 20,
        checked: false,
        name: "Ժամկ.օ.ք",
      },
      {
        id: 21,
        checked: false,
        name: "Ընդհ.ժամկ.օ.ք.",
      },
      {
        id: 22,
        checked: false,
        name: "Մաքս.ժամկ.օ.ք",
      },
      {
        id: 23,
        checked: false,
        name: "Բնակավայրի անուն",
      },
      {
        id: 24,
        checked: false,
        name: "Մարզի անուն",
      },
      {
        id: 25,
        checked: false,
        name: "Գրանցման հասցե",
      },
      {
        id: 26,
        checked: false,
        name: "Հեռախոս",
      },
      {
        id: 27,
        checked: false,
        name: "Բջջային",
      },
      {
        id: 28,
        checked: false,
        name: "Անձը հաստ.փաստթղթ.կոդ",
      },
      {
        id: 29,
        checked: false,
        name: "Ա.հ.փ. Տրված",
      },
      {
        id: 30,
        checked: false,
        name: "Ա.հ.փ. Ամսաթիվ",
      },
      {
        id: 31,
        checked: false,
        name: "Ա.հ.փ. Տիպ",
      },
      {
        id: 32,
        checked: false,
        name: "ՀՎՀՀ",
      },
      {
        id: 33,
        checked: false,
        name: "Գրանցման N",
      },
      {
        id: 34,
        checked: false,
        name: "Սեռը",
      },
      {
        id: 35,
        checked: false,
        name: "Ծննդյան ամսաթիվ",
      },
      {
        id: 36,
        checked: false,
        name: "Էլ.փոստ",
      },
      {
        id: 37,
        checked: false,
        name: "Վճարման ենթակա մինիմալ գումար",
      },
    ],
  },
  mutations: {
    setComponent(state, id) {
      state.componentNumber = id
    },
    historyModal(state, value) {
      state.showHistory = value
    },
    sendEmailModal(state, value) {
      state.showSendEmail = value
    },
    getInfoModal(state, value) {
      state.showInfo = value
    },
    showRepaymentSchedule(state, value) {
      state.showRepaymentSchedule = value
    },
    userData(state, data) {
      state.UserData = data
    },
    formData(files) {
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files[" + i + "]", files[i]);
      }
      return formData;
    },
  },
  actions: {
    uploadFile({ commit }, data) {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      let dataFiles = commit.formData(data.files);
      axios.post(`customers/${data.id}/upload`, { id: data.id, files: dataFiles }, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    sendEmail({ commit }, data) {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      let dataFiles = commit.formData(data.files);
      axios.post('users/sendEmail', { ...data, files: dataFiles }, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    createUser(_, data) {
      axios.post('users/createUser', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    editUser(_, data) {
      axios.put('users/createUser', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    login(_, data) {
      axios.post('login', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  },
  getters: {
    Statuses: state => state.Statuses,
    Ucom: state => state.Ucom,
    GlobalCredit: state => state.GlobalCredit,
    GoodCredit: state => state.GoodCredit,
    NewPartner: state => [...state.Acba],
  }
})