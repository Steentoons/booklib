const RefreshToken = require("../models/refreshTokenModel");
const jwt = require("jsonwebtoken");
const generateToken = require("../helpers/generateToken");

const refreshToken = async(refTokenQuotes) => {
    // Validate the inputs...
    if (!refTokenQuotes) {
        return undefined;
    }
    const refToken = refTokenQuotes.replace(/^"(.*)"$/, '$1')

    try {
        // Get refresh tokens from the database...
        const savedTokenObj = await RefreshToken.findOne();

        console.log(refToken)
        if (!savedTokenObj) {
            return undefined
        }

        const savedToken = savedTokenObj.refreshToken;
        if (!savedToken.includes(refToken)) {
            return undefined;
        }
    } catch (err) {
        return undefined
    }

    // Try to refresh the token...
    try {
        const newToken = await jwt.verify(
            refToken,
            process.env.JSON_REFRESH_TOKEN_SECRET,
            async(err, user) => {
                if (err) {
                    return undefined;
                } else {
                    const accessToken = await generateToken({ email: user.email });
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