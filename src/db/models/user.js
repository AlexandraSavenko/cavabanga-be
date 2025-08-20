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

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const UsersCollection = model('users', userSchema);