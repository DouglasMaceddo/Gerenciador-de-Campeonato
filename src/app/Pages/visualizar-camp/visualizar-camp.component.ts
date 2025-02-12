import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizar-camp',
  imports: [CommonModule],
  templateUrl: './visualizar-camp.component.html',
  styleUrl: './visualizar-camp.component.css'
})
export class VisualizarCampComponent {

  campeonatos: any [] = [];

  constructor(private router: Router){
  }

  ngOnInit(): void {
    this.campeonatos = JSON.parse(localStorage.getItem('campeonatos') || '[]');
  }

  voltarHome(router: string){
    this.router.navigate([router]);
}
}
