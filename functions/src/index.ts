// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

// admin.initializeApp();

// export const resetAtMidnight = functions.pubsub.schedule('every day 18:20').onRun(async (context) => {
//   const db = admin.database();

//   try {
//     // Ottieni tutti gli oggetti nella "attivitaGiornaliere"
//     const snapshot = await db.ref('attivitaGiornaliere').once('value');

//     // Itera su ogni elemento nel risultato
//     snapshot.forEach((childSnapshot) => {
//       const data = childSnapshot.val();

//       // Controlla se il campo "completed" è true e aggiornalo a false se lo è
//       if (data.completed === true) {
//         // Aggiorna il campo "completed" nel database
//         db.ref(`attivitaGiornaliere/${childSnapshot.key}/completed`).set(false)
//           .then(() => {
//             console.log(`Campo "completed" aggiornato a false per l'elemento con chiave: ${childSnapshot.key}`);
//           })
//           .catch(error => {
//             console.error(`Errore durante l'aggiornamento del campo "completed" per l'elemento con chiave: ${childSnapshot.key}`, error);
//           });
//       }
//     });

//     return null;
//   } catch (error) {
//     console.error('Errore durante il recupero degli oggetti da "attivitaGiornaliere":', error);
//     return null;
//   }
// });
