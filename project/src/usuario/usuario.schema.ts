import * as Joi from 'joi';
export const USUARIO_SCHEMA = Joi
    .object()
    .keys({
        nombre_usuario: Joi.string().regex(/^[a-zA-Z.,' ' ]{4,30}$/).required(),
        urlFoto: Joi.string().regex(/^[a-zA-Z0-9.,' ' ]{4,300}$/).required(),
        //pacienteId: Joi.number(),
    });