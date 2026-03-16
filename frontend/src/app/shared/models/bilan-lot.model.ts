// src/app/shared/models/bilan-lot.model.ts
export interface BilanLot {
  id: number;
  id_lot: number;
  nom_lot: string;
  nombre_poulets: number;
  prix_achat_total: number;
  cout_nourriture_total: number;
  nombre_morts: number;
  poids_moyen: number;
  prix_vente_lot: number;
  nombre_oeufs: number;
  valeur_oeufs_total: number;
  benefice: number;
}