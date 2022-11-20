INDEX
//////////////////////////////////////////////////////////////////
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
//////////////////////////////////////////////////////////////////



MODELO
//////////////////////////////////////////////////////////////////
export class Empleado {
    constructor(
        public idEmpleado : number ,
        public apellido : string ,
        public oficio : string ,
        public salario : number
    ) { }
}
//////////////////////////////////////////////////////////////////



SERVICE CON TOKEN
//////////////////////////////////////////////////////////////////
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable()
export class UsuariosService {
    constructor(private _http : HttpClient) { }

MANERA DE PACO//////////////////////////////////////////////////////////////////
    put(usuario : Usuario) : Observable<any> {
        var json = JSON.stringify(usuario);
        var header = new HttpHeaders().set("Content-Type", "application/json");

        var request = "/auth/login";
        var url =  environment.urlUser + request;

        return this._http.post(url, json, {headers : header});
    }

MANERA DE INTERNET//////////////////////////////////////////////////////////////////
    getEmpleados() : Observable<any> {
        const cabecera: HttpHeaders = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        const url = environment.urlUser + '/api/empleados/';
        return this._http.get(url, { headers: cabecera });
    }

    getEmpleadosId(id : string) : Observable<any> {
        const cabecera: HttpHeaders = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        const url = environment.urlUser + '/api/empleados/' + id;
        return this._http.get(url, { headers: cabecera });
    }
}
//////////////////////////////////////////////////////////////////



COMPONENT CON TOKEN O SIN EL
//////////////////////////////////////////////////////////////////
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import {Router} from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import {Params, ActivatedRoute} from '@angular/router';

public token! : string;
public empleado! : Empleado;

constructor(
    private _service : UsuariosService ,
    private _router : Router ,
    private _ActivatedRoute : ActivatedRoute
) { }

@ViewChild("username") userName! : ElementRef;
@ViewChild("password") password! : ElementRef;

cargarToken() : void {
    var userName = this.userName.nativeElement.value;
    var password = this.password.nativeElement.value;
    var newUser = new Usuario(userName, password);

    this._service.put(newUser).subscribe( res => {
        this.token = res;
        console.log(this.token)
        localStorage.setItem('token', res.response);
        this._router.navigate(["/empleados/"]);
    })
}

ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((parametros : Params) => {
        if(parametros['id'] != null) {
            var id = parametros['id'];
            this._service.getEmpleadosId(id).subscribe( res => {
                this.empleado = res;
            })
        }
    })
}
//////////////////////////////////////////////////////////////////



APP.ROUTING.TS
//////////////////////////////////////////////////////////////////
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { DetalleempleadoComponent } from "./components/detalleempleado/detalleempleado.component";

const appRoutes : Routes = [
    {path : "" , component : HOME},
    {path : "detalles/:id" , component : DetalleempleadoComponent},
    {path : "**" , component : ERROR404},
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
//////////////////////////////////////////////////////////////////



APP.MODULE.TS
//////////////////////////////////////////////////////////////////
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { appRoutingProviders, routing } from './app.routing';

imports: [
    BrowserModule ,
    FormsModule ,
    HttpClientModule ,
    routing
  ],
providers: [appRoutingProviders, UsuariosService],
//////////////////////////////////////////////////////////////////



APP.COMPONENT.HTML
//////////////////////////////////////////////////////////////////
<router-outlet></router-outlet>
//////////////////////////////////////////////////////////////////















