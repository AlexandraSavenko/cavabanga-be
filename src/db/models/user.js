import { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        savedRecipes: { type: [Schema.Types.ObjectId], default: [] }
        // do we need to add ref? (ref: "recipeSchema._id"?)
    },
    {
        timestamps: true,
        versionKey:false
    }
);

export const UsersCollection = model('users', userSchema);