import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-criar-camp',
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-camp.component.html',
  styleUrl: './criar-camp.component.css'
})
export class CriarCampComponent implements OnInit {
  nomeCampeonato: string = '';
  descricao: string = '';
  formato: string = 'eliminatorio';
  numTimes: number = 2;
  campeonatoCriado: boolean = false;
  userId: any;

  constructor(private router: Router, private AuthService: AuthService) { }

  ngOnInit(): void {
    
  }

  criarCampeonato(): void {
    if (this.nomeCampeonato.trim() !== '' && this.numTimes >= 2) {
      const campeonato = {
        id: this.generateUID(),
        nome: this.nomeCampeonato,
        descricao: this.descricao,
        formato: this.formato,
        numTimes: this.numTimes,
        userId: this.AuthService.getUser().uid,
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
  
  generateUID(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  voltarHome(router: string) {
    this.router.navigate([router]);
  }
}  