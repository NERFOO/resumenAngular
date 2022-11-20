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



MENU
//////////////////////////////////////////////////////////////////
<nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" [routerLink]="['/']">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" [routerLink]="['/newpersonaje']">Nuevo personaje</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" [routerLink]="['/updatepersonaje']">Modificar personaje</a>
        </li>
        <li class="nav-item dropdown" *ngIf="series">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Series
            </a>
            <ul class="dropdown-menu">
                <li><a *ngFor="let serie of series" class="dropdown-item" [routerLink]="['/serie', serie.idSerie]">{{serie.nombre}}</a></li>
            </ul>
        </li>
        <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
        </li>
        </ul>
        <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
    </div>
    </div>
</nav>
//////////////////////////////////////////////////////////////////



CARD CON IMAGEN ARRIBA
//////////////////////////////////////////////////////////////////
<div>
    <div class="card" style="width: 18rem;">
        <img src="{{serie.imagen}}" class="card-img-top" alt="foto Personaje">
        <div class="card-body">
            <h5 class="card-title">{{serie.nombre}}</h5>
            <p class="card-text">{{serie.puntuacion}}</p>
            <a [routerLink]="['/personajes', serie.idSerie]" class="btn btn-success">Personajes</a>
        </div>
    </div>
</div>
//////////////////////////////////////////////////////////////////



TABLA COMPLETA
//////////////////////////////////////////////////////////////////
<div style="width: 80%; margin: auto;">
    <div *ngIf="!departamentos">
        <img src="./../../../assets/images/loading.gif" alt="loading" style="width:100%">
    </div>
    <table class="table table-striped table-hover" *ngIf="departamentos">
        <thead>
            <tr>
                <th>Numero</th>
                <th>Nombre</th>
                <th>Localidad</th>
                <th>Opciones</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let dept of departamentos">
                <td>{{dept.numero}}</td>
                <td>{{dept.nombre}}</td>
                <td>{{dept.localidad}}</td>
                <td>
                    <a [routerLink]="['/edit', dept.numero, dept.nombre, dept.localidad]" class="btn btn-info">Modificar</a>
                    <a [routerLink]="['/delete', dept.numero]" class="btn btn-warning">Eliminar (link)</a>
                    <a [routerLink]="['/detalle', dept.numero]" class="btn btn-success">Detalles</a>
                    <button (click)="eliminarDepartamento(dept.numero)" class="btn btn-danger">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
//////////////////////////////////////////////////////////////////



FORMULARIO EDITAR INPUT
//////////////////////////////////////////////////////////////////
<div>
    <form #modificarForm="ngForm" *ngIf="departamento">
        <input type="hidden" name="cajanumero" #cajanumero><br/>
        <label>Nombre</label>
        <input type="text"name="cajanombre" #cajanombre value="{{departamento.nombre}}"><br/>
        <label>Localidad</label>
        <input type="text"name="cajalocalidad" #cajalocalidad value="{{departamento.localidad}}"><br/>

        <button (click)="modificarDepartamento()" class="btn btn-info">Modificar</button>
    </form>
</div>
//////////////////////////////////////////////////////////////////



FORMULARIO EDITAR CON SELECT
//////////////////////////////////////////////////////////////////
<div>
    <h1>Personajes y series</h1>

    <form #updatePersonajeForm="ngForm">
        <label>Seleccione una serie</label>
        <select name="cajaidserie" #cajaidserie class="form-select" *ngIf="series">
            <option *ngFor="let serie of series" value="{{serie.idSerie}}">{{serie.nombre}}</option>
        </select>

        <label>Seleccione un personaje</label>
        <select name="cajaidpersonaje" #cajaidpersonaje class="form-select" *ngIf="series">
            <option *ngFor="let pers of personajes" value="{{pers.idPersonaje}}">{{pers.nombre}}</option>
        </select>

        <button (click)="actualizarPersonaje()" class="btn btn-success">Insertar personaje</button>
    </form>
</div>
//////////////////////////////////////////////////////////////////