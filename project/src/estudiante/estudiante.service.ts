import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {EstudianteEntity} from "./estudiante.entity";
import {UsuarioData} from "../usuario/usuario.data";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {EstudianteData} from "./estudiante.data";
import {MateriaEntity} from "../materia/materia.entity";

@Injectable()

export class EstudianteService {

    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ){}
    estudiantes: Estudiante[] = [];

    //Metodo Listar Todos los estudiante
    async listarEstudiante(): Promise<EstudianteEntity[]>{
        //console.log(await this.pacienteRepository.find());
        return (await this.estudianteRepository.find());
    }

    //Metodo Crear estudiantes
    crearEstudiante(estudiante: Estudiante){

        const est = new EstudianteEntity();
        est.nombres = estudiante.nombres;
        est.apellidos = estudiante.apellidos;
        const fecha = new Date(estudiante.fechaNacimiento);
        est.fechaNacimiento = fecha;
        est.semestreActual = estudiante.semestreActual;
        est.graduado = estudiante.graduado;
        est.urlFotoEstudiante = estudiante.urlFotoEstudiante;
        est.usuarioFK = estudiante.usuarioFKIdUsuario;

        this.estudianteRepository.save(est);
    }

    crearTodosEstudiantes(){

        for (var indice in EstudianteData){
            const estudiante = new EstudianteEntity();

            estudiante.nombres = EstudianteData[indice].nombres;
            estudiante.apellidos = EstudianteData[indice].apellidos;
            estudiante.fechaNacimiento = new Date(EstudianteData[indice].fechaNacimiento);
            estudiante.semestreActual = EstudianteData[indice].semestreActual;
            estudiante.graduado= EstudianteData[indice].graduado;
            estudiante.urlFotoEstudiante= EstudianteData[indice].urlFotoEstudiante;
            estudiante.usuarioFK = parseInt(EstudianteData[indice].usuarioFKIdUsuario);

            this.estudianteRepository.save(estudiante);
        }
    }


    //Metodo obtener un estudiante
    obtenerUno(estudianteID){

        console.log(this.estudiantes[estudianteID]);
        return this.estudiantes[estudianteID];
    }


    //Metodo editar un estudiante
    editarUno(idEst, nombreEst, apellidoEst, fechaEst, semestreActualEst, graduadoEst,urlFotoEst){
        let estudianteActualizado = this.obtenerUno(idEst);

        estudianteActualizado.nombres = nombreEst;
        estudianteActualizado.apellidos = apellidoEst;
        estudianteActualizado.fechaNacimiento = fechaEst;
        estudianteActualizado.semestreActual = semestreActualEst;
        estudianteActualizado.graduado = graduadoEst;
        estudianteActualizado.urlFotoEstudiante= urlFotoEst;


        return estudianteActualizado;
    }
}


export class Estudiante {
    constructor(
        public nombres:string,
        public apellidos:string,
        public fechaNacimiento:string,
        public semestreActual:number,
        public graduado:boolean,
        public urlFotoEstudiante:string,
        public usuarioFKIdUsuario:number,
    ){};
}