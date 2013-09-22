module.exports = {
    db: 'mongodb://localhost/app-boilerplate',
    resources: {
        user: {
            schema: {
                username: String,
                password: String
            }
        }
    }
}
