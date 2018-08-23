import * as Joi from 'joi';
export const MATERIA_SCHEMA = Joi
    .object()
    .keys({
        codigo:Joi.number().precision(2).required(),
        nombre: Joi.string().regex(/^[a-zA-Z.,' ' ]{4,30}$/).required(),
        descripcion:Joi.string().regex(/^[a-zA-Z0-9 ]{4,30}$/).required(),
        activo:Joi.string().regex(/^[a-zA-Z,.' ' ]{4,50}$/).required(),
        fechaCreacion:Joi.date().required(),
        numeroHorasSemana:Joi.number().integer().required(),
        urlFotoMateria:Joi.string().regex(/^[a-zA-Z0-9 ]{4,300}$/).required(),
        estudianteIdIdEstudiante:Joi.number().integer().required(),
    });