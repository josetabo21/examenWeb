import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {EstudianteEntity} from "../estudiante/estudiante.entity";

@Entity('materia')
export class MateriaEntity {

    @PrimaryGeneratedColumn()
    id_materia: number;
    @Column()
    codigo: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @Column()
    activo: string;
    @Column()
    fechaCreacion: Date;
    @Column()
    numeroHorasSemana: number;
    @Column()
    urlFotoMateria: string;

    @ManyToOne(
        type => EstudianteEntity,
        materiaEntity => materiaEntity.materiaId)
    estudianteId: number;

}
