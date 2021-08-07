export default {
    created() {
        this.getPartData({
            name: this.params,
            id: this.count,
            column: this.column,
            ascDesc: this.ascDesc,
        });
    },
    computed: {
        LineData: {
            get() {
                return this.CaseData;
            },
            set(check) {
                this.CaseData.forEach((i) => (i.checked = check));
            },
        },
        cssVar() {
            return {
                "--cols": this.header.length,
            };
        },
        admin() {
            return this.$store.getters.user.perm.some(
                (v) => v === "addPartnerCustomers"
            );
        },
        checkedRows() {
            return this.LineData.filter((v) => v.checked);
        },
    },
    methods: {
        getAll() {
            this.$store.commit("clearData");
            this.getPartData({
                name: this.params,
                id: this.count,
                column: this.column,
                ascDesc: this.ascDesc,
            });
        },
        visibilityChanged(isVisible) {
            if (isVisible && this.getData) {
                this.count++;
                this.loadData = true;
                this.getPartData({
                    name: this.params,
                    id: this.count,
                    column: this.column,
                    ascDesc: this.ascDesc,
                });
            }
        },
        setValue(data, id) {
            this.CaseData.forEach((v) => {
                if (v.id === id) v[data.column] = data.newValue;
            });
            let setVal = {
                newValue: data.newValue,
                column: data.column,
                oldValue: data.oldValue,
                id,
                params: this.params,
            };
            this.setNewValue(setVal);
        },
        sortColm(e, column) {
            this.column = column;
            this.ascDesc = e;
            this.sort({ params: this.params, column, ascDesc: e });
            this.$store.commit("clearData");
        },
        Search(event, column) {
            this.getData = false;
            this.searchTable({ page: this.params, column, text: event });
        },
        onCheck(event) {
            this.CaseData.forEach((i) => {
                if (i.id === event.id) i.checked = event.value;
            });
        },
        checkAll(e) {
            this.LineData = e;
        },
        onexport() {
            let arr = this.checkedRows.map((i) => {
                return this.header.map((v) => i[v.column]);
            });
            this.$store.commit("onexport", { header: this.header, exportTable: arr });
        },
    },
    watch: {
        CaseData() {
            if (this.CaseData.length !== 0) {
                this.loadData = false;
            } else this.loadData = false;
        },
    },
}