import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-consulta-cliente',
  imports: [
    CommonModule, //biblioteca de funções / diretivas básicas do Angular
    RouterLink,
    NgxPaginationModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './consulta-cliente.component.html',
  styleUrl: './consulta-cliente.component.css'
})
export class ConsultaClienteComponent  {
  isLoading = true;

  /*
    Variável para guardar os dados dos clientes
    que iremos exibir na página HTML
  */
  clientes: any[] = []; //array (lista) de objetos


  /*
    Criando um método construtor no componente
    para que possamos instanciar a classe HttpClient
  */
  constructor(private httpClient: HttpClient) { }


  /*
    Função padrão do Angular executado no momento que
    o componente é carregado / exibido no navegador
  */
  ngOnInit() : void {
    
    //fazendo uma requisição para consultar (GET) os clientes na API
    this.httpClient.get('http://localhost:5148/api/clientes')
      .subscribe({ //aguardando o retorno da API
        next: (data) => { //capturando os dados que a API devolveu
          //data -> nome de variável para receber os dados da consulta
          //guardando os dados obtidos em uma variável chamada 'clientes'
          this.clientes = data as any[];
          this.isLoading = false;
        }
      })
      setTimeout(() => { this.isLoading = false; }, 15000);
      //this.isLoading = false; 
  }


  /*
    Função para ser executada quando o usuário clicar no botão
    de exclusão da tabela de consulta de clientes
  */
  onDelete(id: string) {
    if(confirm('Deseja realmente excluir o cliente?')) {
      this.isLoading = true;
      //fazendo uma requisição DELETE para a API
      this.httpClient.delete('http://localhost:5148/api/clientes/' + id)
        .subscribe({ //aguardando a resposta da API
          next: (data: any) => { //capturando resposta de sucesso
            alert(data.mensagem); //exibir mensagem de sucesso
            this.ngOnInit(); //executando a consulta novamente
          }
        });      
    }
    setTimeout(() => { this.isLoading = false; }, 1000);
  }
  
 //função para realizar a paginação dos dados
 pagina: number = 1;
 pageChange(event: any) {
   this.pagina = event;
 }


}
