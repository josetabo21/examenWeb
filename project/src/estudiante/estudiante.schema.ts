import * as Joi from 'joi';
export const ESTUDIANTE_SCHEMA = Joi
    .object()
    .keys({
        nombres:Joi.string().regex(/^[a-zA-Z ]{4,30}$/).required(),
        apellidos: Joi.string().regex(/^[a-zA-Z ]{4,30}$/).required(),
        fechaNacimiento:Joi.date().required(),
        semestreActual:Joi.number().integer().min(0).max(8).required(),
        graduado:Joi.boolean().required(),
        urlFotoEstudiante: Joi.string(),
        usuarioFKIdUsuario: Joi.number().integer().required(),
    });
