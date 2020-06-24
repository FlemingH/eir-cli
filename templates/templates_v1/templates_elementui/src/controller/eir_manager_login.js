
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
            eirUser: null,
        }
    },
    watch: {
    },
    methods: {
        init() {
            this.eirDb = new InDB(this.global.db_options);
            this.eirUser = this.eirDb.use("eir_user");
        },
        async loginOnClick() {

            var user_obj = await this.eirUser.find("username", this.usernameInputValue);

            if (user_obj && Object.keys(user_obj).length > 0) {

                if (user_obj.password != this.passwordInputValue) {
                    this.$message({
                        message: 'Username or password not correct',
                        type: 'warning'
                    });
                } else {
                    this.$router.push({name:'em', params: {
                        username: user_obj.username,
                        page: user_obj.page
                    }});
                }
            } else {
                this.$message({
                    message: 'User not exists',
                    type: 'warning'
                });
            }
        },
        async createUserOnClick() {

            var user_obj = await this.eirUser.find("username", this.usernameInputValue);
            if (user_obj && Object.keys(user_obj).length > 0) {
                this.$message({
                    message: 'User already exists',
                    type: 'warning'
                });
                return;
            }

            try {
                this.eirUser.put({
                    "username": this.usernameInputValue,
                    "password": this.passwordInputValue,
                    "page": "[]",
                });

                this.$message({
                    message: 'Create user success',
                    type: 'success'
                });
            } catch (e) {

                this.$message({
                    message: 'Create user fail',
                    type: 'error'
                });
                console.log(e);
            }
        },
        async putUser(store, userObj) {
            await store.put(userObj);
        },
        async findUserByUsername(store, username) {
            return await store.find("username", username);
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