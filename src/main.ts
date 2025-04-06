// Vérifie que TS fonctionne
document.addEventListener('DOMContentLoaded', () => {
  // Récupère l'élément avec l'id "game"
  const gameElement = document.getElementById('game');
  
  // S'il existe, ajoute un élément à l'intérieur
  if (gameElement) {
    // Crée un nouveau paragraphe
    const paragraph = document.createElement('p');
    paragraph.textContent = 'TypeScript fonctionne !';
    paragraph.className = 'text-green-500 text-xl mt-4';
    
    // Ajoute-le à l'élément du jeu
    gameElement.appendChild(paragraph);
    
    // Affiche un message dans la console pour vérifier
    console.log('Script TypeScript exécuté avec succès !');
    document.body.style.border = "red solid 5px"
  }
});
