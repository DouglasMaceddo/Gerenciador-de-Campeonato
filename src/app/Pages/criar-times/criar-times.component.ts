import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { Time } from '../../Models/time.model';
import { Campeonato } from '../../Models/camp.model';

@Component({
  selector: 'app-criar-times',
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-times.component.html',
  styleUrl: './criar-times.component.css'
})
export class CriarTimesComponent {
  nomeTime: string = '';
  logoUrl: string = '';
  jogadores: string = '';
  campeonatoId: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.campeonatoId = this.router.url.split('/')[2];
  }

  adicionarTime(): void {
    if (this.nomeTime.trim() !== '') {
      const jogadoresArray: string[] = this.jogadores.split(',').map((jogador: string) => jogador.trim());

      const time: Time = {
        id: this.generateUID(),
        nome: this.nomeTime,
        logoUrl: this.logoUrl,
        jogadores: jogadoresArray
      };

      const campeonatos = JSON.parse(localStorage.getItem('campeonatos') || '[]');
      const campeonato = campeonatos.find((camp: Campeonato) => camp.id === this.campeonatoId);
      
      if (campeonato) {
        if (!campeonato.times) {
          campeonato.times = [];
        }
        campeonato.times.push(time);
        localStorage.setItem('campeonatos', JSON.stringify(campeonatos));
        this.router.navigate([`/visualizar-camp/${this.campeonatoId}`]);  // Voltar para a tela do campeonato após adicionar o time
      } else {
        alert('Campeonato não encontrado');
      }
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

  generateUID(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  voltarHome(router: string) {
    this.router.navigate([router]);
  }
}