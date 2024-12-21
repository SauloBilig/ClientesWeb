import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edicao-cliente',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-cliente.component.html',
  styleUrl: './edicao-cliente.component.css'
})



export class EdicaoClienteComponent {

  mensagem: string = '';
  id: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    //capturar o id enviado na URL
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //console.log(this.id);
    this.httpClient.get('http://localhost:5148/api/clientes/' + this.id)
        .subscribe({ //aguardando o retorno da API
          next: (data: any) => { //capturar os dados retornados pela api
            this.form.patchValue(data);
          }
        })
  }


 form = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(150)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    cpf : new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    categoria : new FormControl('', [Validators.required])
  });

 get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.httpClient.put('http://localhost:5148/api/clientes/' + this.id, this.form.value)
    .subscribe({ //aguardando o retorno da API
      next: (data: any) => { //capturar os dados retornados pela api
        //guardar a mensagem obtida da API
        this.mensagem = data.mensagem;
      }
    })
  }


}
