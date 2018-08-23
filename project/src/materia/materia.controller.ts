import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {Materia, MateriaService} from "./materia.service";
import {MateriaPipe} from "../pipes/materia.pipe";
import {MATERIA_SCHEMA} from "./materia.schema";

@Controller('Materia')
export class MateriaController {

    constructor(private  materiaService: MateriaService){

    }

    //Body params
    @Post('registrar')
    crearMateria(@Body(new MateriaPipe(MATERIA_SCHEMA)) bodyParams){
        const materia1 = new  Materia(
            bodyParams.codigo,
            bodyParams.nombre,
            bodyParams.descripcion,
            bodyParams.activo,
            bodyParams.fechaCreacion,
            bodyParams.numeroHorasSemana,
            bodyParams.urlFotoMateria,
            bodyParams.estudianteIdIdEstudiante,
        );

        return this.materiaService.crearMateria(materia1);

    }

    @Get('crearMateria')
    registrarAllMateria(@Res () response, @Req () request){
        this.materiaService.crearTodosMaterias()
        return response.status(202).send('Materias Creadas');
    }

    @Get('mostrarMateria')
    listarTodosLasMaterias(@Res () response, @Req () request){
        var promise = Promise.resolve(this.materiaService.listarMateria())

        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No existe ninguna Materia',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }
            else{
                return response.status(202).send(value);
            }
        });
    }


    @Get('/:id')
    mostrarUnMateria(@Res () response, @Req () request, @Param() params){
        let arregloMateria = this.materiaService.obtenerUno(params.id);
        if(arregloMateria){
            return response.send(arregloMateria);
        } else{
            console.log('no encontrado');
            return response.status(400).send({
                mensaje:'Materia no encontrado',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                URL:request.originalUrl,
            });
        }
    }

    @Put('/:id')
    modificarMateria(@Res () response, @Req () request, @Param() params, @Body(new MateriaPipe(MATERIA_SCHEMA)) body){
        let arregloMateria = this.materiaService.obtenerUno(params.id);
        if(arregloMateria){
            return response.send(
                this.materiaService.editarUno(
                    params.id,
                    body.codigo,
                    body.nombre,
                    body.descripcion,
                    body.activo,
                    body.fechaCreacion,
                    body.numeroHorasSemana,
                    body.urlFotoMateria,
                    body.materiaId,
                ));
        } else{
            return response.send({
                mensaje:'Materia no encontrado. No se puede modificar',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                url:request.path,
            });
        }
    }
}