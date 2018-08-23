import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
  estudiante;
  materia;
  _parametros:any;
  constructor(private _httpClient: HttpClient, private _activetedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.cargarEstudiante();
    this.cargarMateria();
  }
  cargarMateria(){
    this._activetedRoute.params.subscribe(parametros=>{
      this._parametros=parametros;
      this._httpClient.get('http://localhost:3000/materia/mostrarMateria?estudianteIdIdEstudiante='+this._parametros.idequipo)
        .subscribe(
          (res)=>{
            this.materia=res;
            console.log(this.materia);
          },
          (err)=>{
            console.log(err);
          }
        )
    });
  }

  cargarEstudiante(){
    this._activetedRoute.params.subscribe(parametros=>{
      this._parametros=parametros;
      this._httpClient.get('http://localhost:3000/Estudiante/mostrarEstudiante?id='+this._parametros.idequipo)
        .subscribe(
          (res)=>{
            this.estudiante=res;
            console.log(this.estudiante);
          },
          (err)=>{
            console.log(err);
          }
        )
    });
  }

}
