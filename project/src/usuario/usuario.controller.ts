import {Body, Controller, Get, HttpStatus, Post, Req, Res} from "@nestjs/common";
import {Usuario, UsuarioService} from "./usuario.service";
import {EstudiantePipe} from "../pipes/estudiante.pipe";
import {ESTUDIANTE_SCHEMA} from "../estudiante/estudiante.schema";
import {UsuarioPipe} from "../pipes/usuario.pipe";
import {USUARIO_SCHEMA} from "./usuario.schema";
import {Estudiante} from "../estudiante/estudiante.service";

@Controller('Usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService){

    }

    @Get('mostrarUsuarios')
    listarUsuarios(@Res () response, @Req () request){
        var promise = Promise.resolve(this.usuarioService.findAll());
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No existe ningun usuario',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(value);
            }
        });
    }

    @Get('crearUsuarios')
    registrarAllUser(@Res () response, @Req () request){
        this.usuarioService.crearTodosUsuarios();
        return response.status(202).send('Usuarios Creados');
    }

    @Post('registrar')
    registrarUsuario(@Body(new UsuarioPipe(USUARIO_SCHEMA)) bodyParams){
        const usuario = new Usuario(
            bodyParams.nombre_usuario,
            bodyParams.urlFoto
        );
        return this.usuarioService.crearUsuario(usuario);
    }
}