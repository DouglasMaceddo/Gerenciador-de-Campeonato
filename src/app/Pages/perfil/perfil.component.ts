import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { Campeonato } from '../../Models/camp.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  campeonatos: Campeonato[] = [];
  userId: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.uid) {
      this.userId = user.uid;
      this.carregarCampeonatos();
    } else {
      console.error('Usuário não encontrado ou sem ID!');
    }
  }
  
  carregarCampeonatos(): void {
    const campeonatos = JSON.parse(localStorage.getItem('campeonatos') || '[]');
    this.campeonatos = campeonatos.filter((camp: Campeonato) => camp.userId === this.userId);
  }
  
  logout() {
    this.authService.logout();
  }

  navegarcriarcamp() {
    this.router.navigate(['/Criar_Campeonato']);
  }

  visuzalizarcamp(campeonatoId: string) {
    this.router.navigate([`/Visualizar_Campeonato/${campeonatoId}`]);
  }
}
