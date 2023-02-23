const bcrypt = require('bcrypt')

const hashPass = async(userSchema) => {
    userSchema.pre('save', async function(next) {
        try {
            const salt = await bcrypt.genSalt(10)
            console.log(salt)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
            next()
        } catch (err) {
            next(err)
        }
    })
}

module.exports = hashPass