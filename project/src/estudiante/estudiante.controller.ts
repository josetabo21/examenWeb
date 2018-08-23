import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {EstudianteService,Estudiante} from "./estudiante.service";
import {EstudiantePipe} from "../pipes/estudiante.pipe";
import {ESTUDIANTE_SCHEMA} from "./estudiante.schema";


@Controller('Estudiante')
export  class EstudianteController {

    constructor(private  estudianteService: EstudianteService){

    }
    //Body params
    @Post('registrar') //uso pipe
    crearEstudiante(@Body(new EstudiantePipe(ESTUDIANTE_SCHEMA)) bodyParams) {
            const estudiante1 = new Estudiante(
                bodyParams.nombres,
                bodyParams.apellidos,
                bodyParams.fechaNacimiento,
                bodyParams.semestreActual,
                bodyParams.graduado,
                bodyParams.urlFotoEstudiante,
                bodyParams.usuarioFKIdUsuario,
            );
            return this.estudianteService.crearEstudiante(estudiante1);
    }

    @Get('crearEstudiante')
    registrarAllEstudiante(@Res () response, @Req () request){
        this.estudianteService.crearTodosEstudiantes()
        return response.status(202).send('Estudiantes Creados');
    }

    @Get('mostrarEstudiante')
    listarTodosLosEstudiantes(@Res () response, @Req () request){
        var promise = Promise.resolve(this.estudianteService.listarEstudiante());
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No existe ningun estudiante',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }
            else{
                return response.status(202).send(value);
            }
        });
    }


    @Get('/:id')
    mostrarEstudiante(@Res () response, @Req () request, @Param() params){

        let arregloEstudiante = this.estudianteService.obtenerUno(params.id_estudiante);
        if(arregloEstudiante){
            return response.send(arregloEstudiante);
        } else{
            console.log('no encontrado');
            return response.status(400).send({
                mensaje:'Estudiante no encontrado',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                URL:request.originalUrl,
                //cabeceras: request.headers,
            });
        }

    }

    @Put('/:id') //Uso pipe
    modificarEstudiante(@Res () response, @Req () request, @Param() params, @Body(new EstudiantePipe(ESTUDIANTE_SCHEMA)) body){
        let arregloEstudiante = this.estudianteService.obtenerUno(params.id);
        if(arregloEstudiante) {
            return response.send(
                this.estudianteService.editarUno(
                    params.id_estudiante,
                    body.nombres,
                    body.apellidos,
                    body.fechaNacimiento,
                    body.semestreActual,
                    body.graduado,
                    body.urlFotoEstudiante
                ));
        } else{
            return response.send({
                mensaje:'Estudiante no encontrado. No se puede modificar',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                url:request.path,
               //headers: request.headers,
            });
        }
    }
}

