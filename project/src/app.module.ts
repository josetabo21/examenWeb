import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EstudianteController} from "./estudiante/estudiante.controller";
import {MateriaController} from "./materia/materia.controller";
import {AutorizacionController} from "./controladores/autorizacion.controller";
import {EstudianteService} from "./estudiante/estudiante.service";
import {MateriaService} from "./materia/materia.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EstudianteEntity} from "./estudiante/estudiante.entity";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MateriaEntity} from "./materia/materia.entity";
import {UsuarioService} from "./usuario/usuario.service";
import {UsuarioController} from "./usuario/usuario.controller";

@Module({
  imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'web2018examen.mysql.database.azure.com',
        port: 3306,
        username: 'JorgeCarrillo@web2018examen',
        password: 'Web2018A',
        database: 'WebExamen',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: true
      }),
      TypeOrmModule.forFeature([
          EstudianteEntity,
          UsuarioEntity,
          MateriaEntity,
      ]),
  ],
  controllers: [AppController, EstudianteController, MateriaController, AutorizacionController, UsuarioController],
  providers: [AppService, EstudianteService, MateriaService, UsuarioService],
})
export class AppModule {}
