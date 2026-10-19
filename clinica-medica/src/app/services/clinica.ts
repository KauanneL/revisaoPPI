import { Injectable } from '@angular/core';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  private consultas: Consulta[] = [];

  constructor() {
    this.carregarConsultas();
  }

  adicionarConsulta(consulta: Consulta): void {
    this.consultas.push(consulta);
    this.salvarConsultas();
  }

  listarConsultas(): Consulta[] {
    return this.consultas;
  }

  private salvarConsultas(): void {
    sessionStorage.setItem(
      'consultas',
      JSON.stringify(this.consultas)
    );
  }

  private carregarConsultas(): void {
    const dados = sessionStorage.getItem('consultas');

    if (dados) {
      this.consultas = JSON.parse(dados);
    }
  }

  calcularTotal(): number {
    return this.consultas.reduce(
      (total, consulta) => total + consulta.preco,
      0
    );
  }
}