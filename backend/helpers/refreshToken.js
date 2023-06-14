const RefreshToken = require("../models/refreshTokenModel");
const jwt = require("jsonwebtoken");
const generateToken = require("../helpers/generateToken");

const refreshToken = async(refToken) => {
    // console.log(refTokenQuotes)
    // Validate the inputs...
    if (!refToken) {
        return undefined;
    }
    // const refToken = refTokenQuotes.replace(/^"(.*)"$/, '$1')

    try {
        // Get refresh tokens from the database...
        const savedTokenObj = await RefreshToken.findOne();
        if (!savedTokenObj) {
            return undefined
        }

        console.log(savedTokenObj)

        const savedToken = savedTokenObj.refreshToken;
        if (!savedToken.includes(refToken)) {
            console.log("Wasn't found")
            return undefined;
        }

    } catch (err) {
        return undefined
    }

    // Try to refresh the token...
    try {
        const newToken = jwt.verify(
            refToken,
            process.env.JSON_REFRESH_TOKEN_SECRET,
            async(err, user) => {
                if (err) {
                    return undefined;
                } else {
                    const accessToken = generateToken({ email: user.email });
                    return accessToken;
                }
            }
        );
        return newToken;
    } catch (err) {
        return undefined;
    }
};

module.exports = refreshToken;