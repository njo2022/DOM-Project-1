// Récupération de tous les éléments nécessaires pour le panier
// Ces sélecteurs cherchent les boutons et éléments d'affichage dans le DOM
const plusButtons = document.querySelectorAll('.fa-plus-circle');
const minusButtons = document.querySelectorAll('.fa-minus-circle');
const deleteButtons = document.querySelectorAll('.fa-trash-alt');
const likeButtons = document.querySelectorAll('.fa-heart');
const quantities = document.querySelectorAll('.quantity');
const unitPrices = document.querySelectorAll('.unit-price');
const totalPrice = document.querySelector('.total');

// Fonction pour mettre à jour le prix total
// Calcule la somme des (quantité × prix unitaire) pour chaque article
// Met également à jour le badge du panier avec le nombre total d'articles
function updateTotal() {
  let total = 0;
  quantities.forEach((qty, index) => {
    const price = parseInt(unitPrices[index].innerText);
    total += price * parseInt(qty.innerText);
  });
  totalPrice.innerText = total + ' $';
  
  // Mise à jour du badge indiquant le nombre d'articles dans le panier
  const cartBadge = document.querySelector('.badge');
  const totalItems = Array.from(quantities).reduce((sum, qty) => sum + parseInt(qty.innerText), 0);
  cartBadge.textContent = totalItems;
  cartBadge.querySelector('.visually-hidden').textContent = 'articles dans le panier';
}

// Ajouter une quantité
// Incrémente de 1 la quantité de l'article correspondant lors du clic sur le bouton plus
plusButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    quantities[index].innerText = parseInt(quantities[index].innerText) + 1;
    updateTotal();
  });
});

// Diminuer la quantité
// Décrémente de 1 la quantité de l'article si elle est supérieure à 0
minusButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    if (parseInt(quantities[index].innerText) > 0) {
      quantities[index].innerText = parseInt(quantities[index].innerText) - 1;
      updateTotal();
    }
  });
});

// Supprimer un produit
// Remet à zéro la quantité de l'article sélectionné
deleteButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const quantity = parseInt(quantities[index].innerText);
    if (quantity > 0) {
      quantities[index].innerText = 0;
      updateTotal();
    }
  });
});

// Aimer un produit
// Bascule l'état "aimé" du produit en changeant la couleur du cœur
likeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('liked');
    if (btn.classList.contains('liked')) {
      btn.style.color = 'red';
    } else {
      btn.style.color = 'black';
    }
  });
});

// Fonction pour mettre à jour le compteur d'articles du panier
// Crée ou met à jour un badge affichant le nombre total d'articles
// Cache le badge si le panier est vide
function updateCartCount() {
  const cartIcon = document.querySelector('.fa-shopping-cart');
  const itemCount = document.querySelectorAll('.card-body').length;
  
  // Création ou mise à jour du badge de comptage
  let countBadge = cartIcon.nextElementSibling;
  if (!countBadge || !countBadge.classList.contains('cart-count')) {
    countBadge = document.createElement('span');
    countBadge.classList.add('cart-count');
    cartIcon.parentNode.insertBefore(countBadge, cartIcon.nextSibling);
  }
  
  countBadge.textContent = itemCount;
  
  // Masquer le badge s'il n'y a pas d'articles
  if (itemCount === 0) {
    countBadge.style.display = 'none';
  } else {
    countBadge.style.display = 'inline';
  }
}