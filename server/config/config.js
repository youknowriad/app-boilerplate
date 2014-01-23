module.exports = {
    db: 'mongodb://localhost/app-boilerplate',
    resources: {
        user: {
            type: "document",
            schema: {
                attributes: {
                    username: String,
                    password: String
                }
            }
        }
    }
}
