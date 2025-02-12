import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-camp',
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-camp.component.html',
  styleUrl: './criar-camp.component.css'
})
export class CriarCampComponent {
  nomeCampeonato: string = '';
  descricao: string = '';
  formato: string = 'eliminatorio';
  numTimes: number = 2;
  campeonatoCriado: boolean = false;

  constructor(private router: Router) { }

  criarCampeonato(): void {
    if (this.nomeCampeonato.trim() !== '' && this.numTimes >= 2) {
      const campeonato = {
        nome: this.nomeCampeonato,
        descricao: this.descricao,
        formato: this.formato,
        numTimes: this.numTimes
      };

      const campeonatos = JSON.parse(localStorage.getItem('campeonatos') || '[]');

      campeonatos.push(campeonato);

      localStorage.setItem('campeonatos', JSON.stringify(campeonatos));
      this.campeonatoCriado = true;
      this.nomeCampeonato = '';
      this.descricao = '';
      this.numTimes = 2;
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

  voltarHome(router: string) {
    this.router.navigate([router]);
  }
}  