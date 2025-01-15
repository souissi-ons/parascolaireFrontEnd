export interface EventReq {
  _id?: string; // ID de l'événement (optionnel car généré par MongoDB)
  name: string; // Nom de l'événement
  startDateTime: Date; // Date et heure de début
  endDateTime: Date; // Date et heure de fin
  imageUrl?: string; // URL de l'image (optionnelle)
  roomId: string; // Référence à la salle (Classroom)
  organizerId: string; // Référence à l'organisateur (User)
  description: string; // Description de l'événement
  status: 'pending' | 'confirmed' | 'canceled' | 'refused'; // Statut de l'événement
  private: boolean; // Indique si l'événement est privé
  createdAt?: Date; // Date de création (optionnelle, ajoutée par Mongoose)
  updatedAt?: Date; // Date de mise à jour (optionnelle, ajoutée par Mongoose)
}
