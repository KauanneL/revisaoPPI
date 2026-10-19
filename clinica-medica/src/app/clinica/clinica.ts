import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Consulta } from '../models/consulta';
import { ClinicaService } from '../services/clinica';

@Component({
  selector: 'app-clinica',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './clinica.html',
  styleUrl: './clinica.css'
})
export class ClinicaComponent {

  consultas: Consulta[] = [];

  consultaForm;

  constructor(
    private formBuilder: FormBuilder,
    private clinicaService: ClinicaService
  ) {

    this.consultaForm = this.formBuilder.group({
      nomePaciente: ['', Validators.required],

      preco: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      data: ['', Validators.required]
    });

    this.carregarConsultas();
  }

  cadastrarConsulta(): void {

    if (this.consultaForm.invalid) {
      this.consultaForm.markAllAsTouched();
      return;
    }

    const consulta: Consulta = {
      nomePaciente: this.consultaForm.value.nomePaciente!,
      preco: Number(this.consultaForm.value.preco),
      data: this.consultaForm.value.data!
    };

    this.clinicaService.adicionarConsulta(consulta);

    this.carregarConsultas();

    this.consultaForm.reset({
      nomePaciente: '',
      preco: 0,
      data: ''
    });
  }

  carregarConsultas(): void {
    this.consultas = this.clinicaService.listarConsultas();
  }

  calcularTotal(): number {
    return this.clinicaService.calcularTotal();
  }
}