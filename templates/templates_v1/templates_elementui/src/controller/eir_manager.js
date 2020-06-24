
export default {
    name: 'EirManager',
    components: {
    },
    props: {
    },
    data: function() {
        return {
            curUser: {},
        }
    },
    watch: {
    },
    methods: {
        init() {
            this.curUser = this.$route.params;
        },
    },
    mounted: function() {
        this.init();
    }
}