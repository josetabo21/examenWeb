import {Injectable, Req, Res} from "@nestjs/common";
import {InjectConnection, InjectEntityManager, InjectRepository} from "@nestjs/typeorm";
import {Connection, EntityManager, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioData} from "./usuario.data";
import {Estudiante} from "../estudiante/estudiante.service";

@Injectable()
export class UsuarioService {


    constructor(

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>

    ) {}

    async findAll(): Promise<UsuarioEntity[]> {
        //console.log(await this.usuarioRepository.find());
        return (await this.usuarioRepository.find());
    }


    crearUsuario(usuario: Usuario){
        const user = new UsuarioEntity();
        user.nombre_usuario = usuario.nombre;
        user.urlFoto = usuario.urlFoto;
        //this.connection.manager.save(user);
        this.usuarioRepository.save(user);
    }


    crearTodosUsuarios(){

        for (var indice in UsuarioData){
            const user = new UsuarioEntity();
            //console.log(usuario+"  "+UsuarioData[usuario].nombre_usuario+"  "+UsuarioData[usuario].urlFoto);
            user.nombre_usuario = UsuarioData[indice].nombre_usuario;
            user.urlFoto = UsuarioData[indice].urlFoto;
            this.usuarioRepository.save(user);
            //console.log(user.nombre_usuario + '  ' + user.urlFoto);
            //this.connection.manager.save(user);

        }
    }
}

export class Usuario {

    constructor(
        public nombre:string,
        public urlFoto:string,
    ){};

}