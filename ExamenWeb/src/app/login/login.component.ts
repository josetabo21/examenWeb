import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CredencialesService} from "../servicios/credenciales.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  contrasena = '';
  usuario= '';
  constructor(private _credencialesService: CredencialesService,
              private _router: Router,) { }

  ngOnInit() {

  }
  login() {
    this._credencialesService.login(this.usuario, this.contrasena);
    console.log(this.usuario)
    console.log(this._credencialesService)
    if(this._credencialesService.estaLogeado=== true)
    {
      const rutaHomeUsuario = [
        '/home',
      ];
      this._router.navigate(rutaHomeUsuario);
    }
    else {
      const rutaHomeUsuario = [
        '/login',

      ];
      this._router.navigate(rutaHomeUsuario);
    }

  }
}
