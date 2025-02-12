import { Time } from "./time.model";

export interface Campeonato {
  id: string;        // ID do campeonato
  nome: string;      // Nome do campeonato
  descricao: string; // Descrição do campeonato
  formato: string;   // Formato do campeonato
  numTimes: number;  // Número de times
  userId: string;    // ID do usuário criador do campeonato
  times: Time[];      // Times cadastrados no campeonato
}