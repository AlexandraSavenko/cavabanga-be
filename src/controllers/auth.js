import { registerUser, loginUser } from "../services/auth.js";

// IMPORTANT: this const will be in src/constants/index.js later
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);
    res.status(201).json({
        status: 201,
        message: "Successfully registered a new user.",
        data: user
    });
};

export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS)
    });
    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS)
    });
    res.json({
        status: 200,
        message: "The user has been successfully loged in.",
        data: {
            accessToken: session.accessToken,
        }
    });
};