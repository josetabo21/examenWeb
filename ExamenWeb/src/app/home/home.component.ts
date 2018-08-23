import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clickEnBuscar: EventEmitter<object> = new EventEmitter();
  estudiantes;
  materias;
  usuarios;
  searchText:string;
  arrayNombresEstudiantes=[];
  arrayNombresMaterias=[];
  arrayNombresUsuarios=[];

  j:string;



  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {
    const observableUsuarios$ = this._httpClient
      .get('http://localhost:3000/Usuario/mostrarUsuarios');
    observableUsuarios$
      .subscribe(
        results=>{
          console.log(results);
          //this.arrayEquipos=JSON.parse(JSON.stringify(results));
          this.usuarios=results;
          this.llenarUsuarios();

        },
        (error)=>{
          console.log('Error',error);
        },
        ()=>{
          console.log('COMPLETO!')
        }
      );

    const observableEstudiante$ = this._httpClient
      .get('http://localhost:3000/Estudiante/mostrarEstudiante');

    observableEstudiante$

      .subscribe(
        results=>{
          console.log(results);
          //this.arrayEquipos=JSON.parse(JSON.stringify(results));
          this.estudiantes=results;
          this.llenarEstudiantes();

        },
        (error)=>{
          console.log('Error',error);
        },
        ()=>{
          console.log('COMPLETO!')
        }
      );

    const observableMateria$ = this._httpClient
      .get('http://localhost:3000/Materia/mostrarMateria');

    observableMateria$
      .subscribe(
        results=>{
          console.log(results);
          this.materias=results;
          this.llenarMateria()

        },
        (error)=>{
          console.log('Error',error);
        },
        ()=>{
          console.log('COMPLETO!')
        }
      );
  }
  llenarUsuarios(){
    for (var i = 0; i < this.usuarios.length; i++) {
      this.arrayNombresUsuarios.push(this.usuarios[i].nombre_usuario);
    }
  }
  llenarEstudiantes(){
    for (var i = 0; i < this.estudiantes.length; i++) {
      this.arrayNombresEstudiantes.push(this.estudiantes[i].nombres);
    }
  }

  llenarMateria(){
    for (var i = 0; i < this.materias.length; i++) {
      this.arrayNombresMaterias.push(this.materias[i].nombre);
    }

  }








}

