import Joi from "joi";

export class UserValidator {
    static async Auth(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        })
        try {
            await schema.validateAsync(req.body);
            next()
        } catch (err) {
            res.status(400).json({
                error: "Invalid Auth schema",
                received: req.body,
                expected: schema.describe()
            });
        }
    }
    static async SignUp(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        })
        try {
            await schema.validateAsync(req.body);
            next()
        } catch (err) {
            res.status(400).json({
                error: "Invalid User schema",
                received: req.body,
                expected: schema.describe()
            });
        }
    }
}