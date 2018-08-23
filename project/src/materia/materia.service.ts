import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MateriaEntity} from "./materia.entity";
import {Repository} from "typeorm";
import {EstudianteEntity} from "../estudiante/estudiante.entity";
import {MateriaData} from "./materia.data";

@Injectable()
export class MateriaService {

    constructor(
        @InjectRepository(MateriaEntity)
        private readonly materiaRepository: Repository<MateriaEntity>
    ){}
    materias: Materia[] = [];

    //Metodo Listar Todos los materia
    async  listarMateria(): Promise<MateriaEntity[]>{
        //console.log(await this.pacienteRepository.find());
        return (await this.materiaRepository.find());
    }


    crearMateria(materia: Materia){
        const mat = new MateriaEntity();

        mat.codigo = materia.codigo;
        mat.nombre = materia.nombre;
        mat.descripcion = materia.descripcion;
        mat.activo = materia.activo;
        mat.fechaCreacion = new Date(materia.fechaCreacion);
        mat.numeroHorasSemana = materia.numeroHorasSemana;
        mat.urlFotoMateria = materia.urlFotoMateria;
        mat.estudianteId = materia.estudianteIdIdEstudiante;

        this.materiaRepository.save(mat);
    }

    crearTodosMaterias(){
        for (var indice in MateriaData){
            const mat = new MateriaEntity();
            mat.codigo = MateriaData[indice].codigo;
            mat.nombre = MateriaData[indice].nombre;
            mat.descripcion = MateriaData[indice].descripcion;
            mat.activo = MateriaData[indice].activo;
            mat.fechaCreacion = new Date(MateriaData[indice].fechaCreacion);
            mat.urlFotoMateria = MateriaData[indice].urlFotoMateria;
            mat.numeroHorasSemana = parseInt(MateriaData[indice].numeroHorasSemana);
            mat.estudianteId = parseInt(MateriaData[indice].estudianteIdIdEstudiante);

            this.materiaRepository.save(mat);
        }
    }

    //Metodo obtener un medicamento
    obtenerUno(materiaID){

        console.log(this.materias[materiaID]);
        return this.materias[materiaID];
    }

    //Metodo editar un medicamento
    editarUno(materiaID, codigo, nombre, descripcion, activo, fechaCreacion, numeroHorasSemana,urlFotoMateria, estudianteId){
        let materiaActualizado = this.obtenerUno(materiaID);

        materiaActualizado.codigo = codigo;
        materiaActualizado.nombre = nombre;
        materiaActualizado.descripcion = descripcion;
        materiaActualizado.activo = activo;
        materiaActualizado.fechaCreacion = fechaCreacion;
        materiaActualizado.numeroHorasSemana = numeroHorasSemana;
        materiaActualizado.urlFotoMateria = urlFotoMateria;
        materiaActualizado.estudianteIdIdEstudiante = estudianteId;

        return materiaActualizado;
    }

}


export class Materia {
    constructor(
        public codigo:number,
        public nombre:string,
        public descripcion:string,
        public activo:string,
        public fechaCreacion:string,
        public numeroHorasSemana:number,
        public urlFotoMateria:string,
        public estudianteIdIdEstudiante:number,
    ){};
}