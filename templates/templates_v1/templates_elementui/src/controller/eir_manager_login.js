
import InDB from 'indb'

export default {
    name: 'EirManagerLogin',
    components: {
    },
    props: {
    },
    data: function() {
        return {

            curPage: 0,

            usernameInputValue: "",
            passwordInputValue: "",

            eirDb: null,
        }
    },
    watch: {
    },
    methods: {
        init() {
            this.eirDb = new InDB(this.global.db_options);
        },
        loginOnClick() {

        },
        createUserOnClick() {

        },
        button1OnClick() {
            
            if (!this.usernameInputValue) {
                this.$message({
                    message: 'Please input the username',
                    type: 'warning'
                });
                return;
            }

            if (!this.passwordInputValue) {
                this.$message({
                    message: 'Please input the password',
                    type: 'warning'
                });
                return;
            }

            if (this.curPage == 0) {
                this.loginOnClick();
            } else {
                this.createUserOnClick();
            }
        },
        button2OnClick() {

            this.usernameInputValue = "";
            this.passwordInputValue = "";

            if (this.curPage == 0) {
                this.curPage = 1;
            } else {
                this.curPage = 0;
            }
        }
    },
    mounted: function() {
        this.init();
    }
}