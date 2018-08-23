import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {PeticionIncorrectaException} from "../exceptions/peticion-incorrecta.exception";
import * as Joi from 'joi';
@Injectable()
export class EstudiantePipe implements PipeTransform{
    constructor (private readonly _schema){
    }

    transform(jsonValidarEstudiante: any, metadata: ArgumentMetadata){
        const  {error}= Joi.validate(jsonValidarEstudiante, this._schema);
        if(error){
            throw  new PeticionIncorrectaException(
                {
                    erorr: error,
                    mensaje: 'Json de Estudiante no valido',
                },
                10
            )
        }else{
            return jsonValidarEstudiante;
        }

    }
}