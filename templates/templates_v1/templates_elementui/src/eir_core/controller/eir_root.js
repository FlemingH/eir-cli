import InDB from 'indb'

export default {
    name: 'EirRoot',
    components: {
    },
    props: {
    },
    data: function() {
        return {
            eirDb: null,
            eirUser: null,

            curActivatedUserPage: [],
        }
    },
    watch: {
    },
    methods: {
        init() {
            this.eirDb = new InDB(this.global.db_options);
            this.eirUser = this.eirDb.use("eir_user");
            this.initSideBarData();
        },
        async initSideBarData() {
            var curActivatedUser = await this.eirUser.find('activited', "1");
            this.curActivatedUserPage = JSON.parse(curActivatedUser["page"]);
        },
        sideBarItemOnClick(key) {
            console.log(key);
        }
    },
    mounted: function() {
        this.init();
    }
}