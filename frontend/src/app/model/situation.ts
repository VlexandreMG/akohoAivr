export interface Lot {
  id: number;
  nom: string;
  race: string;
  nombre: number;
  dateEntree: string;
  poids: number;
  sakafo: number;
  vivant: {
    totalVelona: number;
    totalVelonaLahy: number;
    totalVelonaVavy: number;
  };
  mort: {
    totalMaty: number;
    totalMatyLahy: number;
    totalMatyVavy: number;
  };
  atodyRestant: number;
  estimationAtody: number;
  estimationAkoho: number;
  achat: number;
  benefice: number;
}

export interface LotStats {
  totalLots: number;
  totalVolailles: number;
  poidsTotal: number;
  sakafaMoyenne: number;
  achatTotal: number;
  beneficeTotal: number;
  totalMortalite: number;
}
