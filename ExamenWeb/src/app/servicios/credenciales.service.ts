import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredencialesService {
  estaLogeado = false;
  usuario1 = 'carrillojorge1395@hotmail.com';
  constructor() {
  }
  login(usuario: string, contrasena: string) {
    if (usuario === 'carrillojorge1395@hotmail.com' && contrasena === 'Jorge123') {
      this.estaLogeado = true;
    } else {
      this.estaLogeado = false;
    }

  }
}
