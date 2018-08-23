import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EstudianteEntity} from "../estudiante/estudiante.entity";

@Entity('usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id_usuario: number;
    @Column()
    nombre_usuario: string;
    @Column()
    urlFoto: string;

    @OneToMany(
        type => EstudianteEntity,
        usuarioEntity => usuarioEntity.usuarioFK)
    estudianteId: number;


}