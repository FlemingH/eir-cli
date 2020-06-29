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

            urlData: [],
            showUrlDialog: false,
            urlNameInputValue: "",
            urlInputValue: "",
            createOrUpdate: 0,
            curUpdateIndex: 0,

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

            this.urlData = JSON.parse(sessionStorage.getItem("page"));

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

            this.$message({
                message: 'Activated User Success',
                type: 'success'
            });

            this.getCurActivatedUser();
        },

        newBindingOnClick() {
            this.urlNameInputValue = "";
            this.urlInputValue = "";
            this.showUrlDialog = true;
            this.createOrUpdate = 0;
        },
        urlDeleteOnClick(row) {

            var pageArray = JSON.parse(sessionStorage.getItem("page"));

            for (var i = 0; i < pageArray.length; i++) {
                if (pageArray[i].urlName == row.urlName) {
                    pageArray.splice(i, 1);
                }
            }

            var self = this;

            this.$confirm('Sure about delete this binding', 'Warning', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                self.updateUrlData(pageArray);

                self.$message({
                    message: 'Delete Url Binding Success',
                    type: 'success'
                });
            }).catch(() => {
            });
        },
        urlUpdateOnClick(row, index) {
            this.urlNameInputValue = row.urlName;
            this.urlInputValue = row.url;
            this.showUrlDialog = true;
            this.createOrUpdate = 1;
            this.curUpdateIndex = index;
        },
        urlEnableOnClick(index) {

            var self = this;

            this.$confirm('Sure about enable this binding', 'Warning', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                self.enableUrl(index);
            }).catch(() => {
            });
        },
        urlDisableOnClick(index) {

            var self = this;

            this.$confirm('Sure about disable this binding', 'Warning', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                self.disableUrl(index);
            }).catch(() => {
            });
        },

        confirmUpdateUrl() {

            if (!this.urlNameInputValue) {
                this.$message({
                    message: 'Please input the url name',
                    type: 'warning'
                });
                return;
            }

            if (!this.urlInputValue) {
                this.$message({
                    message: 'Please input the url',
                    type: 'warning'
                });
                return;
            }
            
            this.updatePageUrl();
        },
        updatePageUrl() {

            var pageArray = JSON.parse(sessionStorage.getItem("page"));

            if (this.createOrUpdate == 0) {

                for (var page of pageArray) {

                    if (page.urlName == this.urlNameInputValue) {
                        this.$message({
                            message: 'Url Name exists',
                            type: 'warning'
                        });
                        return;
                    }
                }

                var pageObj = {
                    "urlName": this.urlNameInputValue,
                    "url": this.urlInputValue,
                    "enable": true,
                }
                pageArray.push(pageObj);
            } else {
                pageArray[this.curUpdateIndex].urlName = this.urlNameInputValue;
                pageArray[this.curUpdateIndex].url = this.urlInputValue;
            }

            this.updateUrlData(pageArray);

            this.$message({
                message: this.createOrUpdate==0? 'New':'Update' + ' Url Binding Success',
                type: 'success'
            });
            
            this.showUrlDialog = false;
        },
        disableUrl(index) {

            var pageArray = JSON.parse(sessionStorage.getItem("page"));
            pageArray[index].enable = false;

            this.updateUrlData(pageArray);

            this.$message({
                message: 'Disable url success',
                type: 'success'
            });
        },
        enableUrl(index) {

            var pageArray = JSON.parse(sessionStorage.getItem("page"));
            pageArray[index].enable = true;

            this.updateUrlData(pageArray);

            this.$message({
                message: 'Enables url success',
                type: 'success'
            });
        },
        async updateUrlData(pageArray) {

            sessionStorage.setItem("page", JSON.stringify(pageArray));
 
            var user = await this.eirUser.find('username', sessionStorage.getItem("username"))
            this.eirUser.put({
                "id": parseInt(sessionStorage.getItem("id")),
                "username": sessionStorage.getItem("username"),
                "password": user.password,
                "page": sessionStorage.getItem("page"),
                "activited": sessionStorage.getItem("activited"),
            });

            this.urlData = JSON.parse(sessionStorage.getItem("page"));
        }
    },
    mounted: function() {
        this.init();
    }
}