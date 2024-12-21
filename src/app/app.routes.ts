import { Routes } from '@angular/router';
import { CadastroClienteComponent } from './components/cadastro-cliente/cadastro-cliente.component';
import { ConsultaClienteComponent } from './components/consulta-cliente/consulta-cliente.component';
import { EdicaoClienteComponent } from './components/edicao-cliente/edicao-cliente.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
{
    path: "clientes/cadastro",
    component: CadastroClienteComponent
},
{
    path: "clientes/consulta",
    component: ConsultaClienteComponent
},
{
    path: "clientes/edicao/:id",
    component: EdicaoClienteComponent
},
{
    path: "clientes/dashboard",
    component: DashboardComponent
},
{
    path: "",
    pathMatch: "full",
    redirectTo: "/clientes/dashboard"
}

];
