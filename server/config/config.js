module.exports = {
    prefix: 'api',
    db: 'mongodb://localhost/app-boilerplate',
    resources: {

        user: {
            type: "document",
            schema: {
                attributes: {}
            },
            user: true
        },

        post: {
            type: "document",
            schema: {
                attributes: {
                    title: String,
                    content: String
                },
                hasMany: {
                    comments: { type: 'id', target: 'comment' }
                },
                hasOne: {
                    author: { type: 'id', target: 'user' }
                },
            }
        },

        comment: {
            type: "document",
            schema: {
                attributes: {
                    author: String,
                    message: String
                }
            }
        }

    }
}
