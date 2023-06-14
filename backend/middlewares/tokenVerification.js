const jwt = require("jsonwebtoken");
const refreshToken = require("../helpers/refreshToken");
const verifyToken = async(req, res, next) => {

    // res.status(400).json({
    //     error: "There was a problem when verifying"
    // })

    if (!req.cookies.accessToken) {
        // Try to refresh the token...
        try {
            if (!req.cookies.refreshToken) {
                req.refreshTokenFailed = true;
            } else {
                const newToken = await refreshToken(req.cookies.refreshToken);

                if (!newToken) {
                    return res.status(403).json({ error: "Please login first" })
                } else {
                    req.cookies.accessToken = newToken;

                    // Verify the token and save the user on request...
                    jwt.verify(
                        req.cookies.accessToken,
                        process.env.JSON_TOKEN_SECRET,
                        (err, user) => {
                            if (err) {
                                req.tokenRefreshFailed = true;
                            } else {
                                req.user = user;
                            }
                        }
                    );
                }
            }
        } catch {
            req.tokenRefreshFailed = true;
        }
    } else {
        if (!req.cookies.refreshToken) {
            req.refreshTokenFailed = true;
        } else {
            jwt.verify(JSON.parse(req.cookies.accessToken), process.env.JSON_TOKEN_SECRET, (err, user) => {
                if (err) {
                    req.tokenRefreshFailed = true;
                } else {
                    req.user = user;
                }
            })
        }
    }

    if (!req.tokenRefreshFailed) {
        next();
    }
};

module.exports = verifyToken;