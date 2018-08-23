import { Component, OnInit } from '@angular/core';
import {CredencialesService} from "../servicios/credenciales.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  indice:number;
  usuario:string;

  constructor(private _usuario: CredencialesService) { }

  ngOnInit() {
    this.usuario=this._usuario.usuario1;
  }


}
