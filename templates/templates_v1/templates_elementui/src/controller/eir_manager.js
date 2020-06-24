import InDB from 'indb'

export default {
    name: 'EirManager',
    components: {
    },
    props: {
    },
    data: function() {
        return {
            curActivatedUsername: "",

            eirDb: null,
            eirUser: null,
        }
    },
    watch: {
    },
    methods: {
        init() {
            if (Object.keys(this.$route.params).length == 0 && !sessionStorage.getItem("username")) {
                this.$router.push("/emlogin");
                return;
            }

            for (var key in this.$route.params) {
                sessionStorage.setItem(key, this.$route.params[key])
            }

            this.eirDb = new InDB(this.global.db_options);
            this.eirUser = this.eirDb.use("eir_user");

            this.getCurActivatedUser();
        },
        async getCurActivatedUser() {
            
            var user = await this.eirUser.find('activited', "1")

            this.curActivatedUsername = "";
            if (user && Object.keys(user).length > 0) {
                this.curActivatedUsername = user.username;
            }
        },
        async activateMeOnClick() {

            var user = await this.eirUser.find('username', sessionStorage.getItem("username"))

            if (this.curActivatedUsername == "") {

                this.eirUser.put({
                    "id": parseInt(sessionStorage.getItem("id")),
                    "username": sessionStorage.getItem("username"),
                    "password": user.password,
                    "page": sessionStorage.getItem("page"),
                    "activited": "1",
                });
            } else {
                
                var userActivated = await this.eirUser.find('username', this.curActivatedUsername)
                await this.eirUser.put({
                    "id": parseInt(userActivated.id),
                    "username": userActivated.username,
                    "password": userActivated.password,
                    "page": userActivated.page,
                    "activited": "0",
                });
                
                await this.eirUser.put({
                    "id": parseInt(sessionStorage.getItem("id")),
                    "username": sessionStorage.getItem("username"),
                    "password": user.password,
                    "page": sessionStorage.getItem("page"),
                    "activited": "1",
                });
            }

            this.getCurActivatedUser();
        },
    },
    mounted: function() {
        this.init();
    }
}