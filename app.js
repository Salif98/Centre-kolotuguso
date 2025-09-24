// Initialiser date minimale sur aujourd'hui
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Soumission formulaire avec fetch vers Apps Script
document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    nom: e.target.nom.value,
    prenom: e.target.prenom.value,
    age: e.target.age.value,
    sexe: e.target.sexe.value,
    service: e.target.service.value,
    date: e.target.date.value
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwh7V-UyQqBrbwoKi2KO68L1EawmTIbqYBsACyl5Hl3flBUb0mAJ-fqDGJf0xx-Vt9W/exec', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.json();

    if (result.result === 'Success') {
      alert('Rendez-vous enregistré avec succès !');
      e.target.reset();
    } else {
      alert('Erreur : ' + result.message);
    }
  } catch (error) {
    alert('Erreur serveur : ' + error.message);
  }
});
