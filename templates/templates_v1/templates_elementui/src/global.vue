<script>
    const db_options = {
        "name": "eir_db",
        "version": 1,
        "stores": [
            {
                "name": "eir_user",
                "keyPath": "id",
                "indexes": [
                    {
                        "name": "username",
                        "keyPath": "username",
                        "unique": true,
                    },
                    {
                        "name": "password",
                        "keyPath": "password",
                        "unique": false,
                    },
                    {
                        "name": "page",
                        "keyPath": "page",
                        "unique": false,
                    },
                    {
                        "name": "activited",
                        "keyPath": "activited",
                        "unique": false,
                    },
                ],
                "autoIncrement": true,
                "isKv": false
            }
        ]
    };
    export default {
        db_options,
    }
</script>