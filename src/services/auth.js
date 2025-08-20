import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { randomBytes } from "crypto";
import { UsersCollection } from "../db/models/user.js";
import { SessionsCollection } from "../db/models/session.js";

// IMPORTANT: should transfer as export to src/constants/index.js file later
const TWO_HOURS = 2 * 60 * 60 * 1000;
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const registerUser = async (payload) => {
    const user = await UsersCollection.findOne({ email: payload.email });
    if (user) throw createHttpError(409, "Email is in use");
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    return await UsersCollection.create({
        ...payload,
        password: encryptedPassword
    });
};

export const loginUser = async (payload) => {
    const user = await UsersCollection.findOne({ email: payload.email });
    if (!user) {
        throw createHttpError(401, "Email or password is incorrect.");
    }
    const isEqual = await bcrypt.compare(payload.password, user.password);
    if (!isEqual) {
        throw createHttpError(401, "Email or password is incorrect.");
    }

    await SessionsCollection.deleteOne({ userId: user._id });

    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");

    return await SessionsCollection.create(
        {
            userId: user._id,
            accessToken,
            refreshToken,
            accessTokenValidUntil: new Date(Date.now() + TWO_HOURS),
            refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS)
        }
    );
};