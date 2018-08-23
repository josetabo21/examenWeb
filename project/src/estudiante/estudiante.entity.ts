import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {MateriaEntity} from "../materia/materia.entity";

@Entity('estudiante')
export class EstudianteEntity {

    @PrimaryGeneratedColumn()
    id_estudiante: number;
    @Column()
    nombres: string;
    @Column()
    apellidos: string;
    @Column()
    fechaNacimiento: Date;
    @Column()
    semestreActual: number;
    @Column()
    graduado: boolean;
    @Column()
    urlFotoEstudiante: string;
    @ManyToOne(
        type => UsuarioEntity,
        estudianteEntity => estudianteEntity.estudianteId)
    usuarioFK: number;

    @OneToMany(
        type => MateriaEntity,
        estudianteEntity => estudianteEntity.estudianteId)
    materiaId: number;

}