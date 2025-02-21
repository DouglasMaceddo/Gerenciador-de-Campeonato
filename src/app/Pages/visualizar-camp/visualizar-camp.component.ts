import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Campeonato } from '../../Models/camp.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-visualizar-camp',
  imports: [CommonModule, FormsModule],
  templateUrl: './visualizar-camp.component.html',
  styleUrls: ['./visualizar-camp.component.css']
})
export class VisualizarCampComponent implements OnInit {
  campeonato: Campeonato | undefined;
  campeonatoId: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.campeonatoId = this.route.snapshot.paramMap.get('id') || '';
    this.carregarCampeonato();
  }

  carregarCampeonato(): void {
    const campeonatos = JSON.parse(localStorage.getItem('campeonatos') || '[]');
    this.campeonato = campeonatos.find((camp: Campeonato) => camp.id === this.campeonatoId);
    if (!this.campeonato) {
      console.error('Campeonato não encontrado!');
    }
  }

  marcarJogos(): void {
    if (this.campeonato && this.campeonato.times) {
      const jogos = [];
      for (let i = 0; i < this.campeonato.times.length; i++) {
        for (let j = i + 1; j < this.campeonato.times.length; j++) {
          jogos.push({
            time1: this.campeonato.times[i],
            time2: this.campeonato.times[j],
            data: null // Aqui você pode adicionar um campo de data
          });
        }
      }
      console.log(jogos);  // Exibindo os jogos no console para teste
    }
  }

  adicionartimes() {
    this.router.navigate(['/Criar_Times']);
  }
  voltarHome() {
    this.router.navigate(['/Home']);
  }
}
