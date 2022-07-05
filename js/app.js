"use strict"
//Variables
const mobileItem = document.querySelector('#mobile-item');
const mobileNav = document.querySelector('.hidden-mobile-nav')
document.addEventListener('DOMContentLoaded', () => {
  //Mostrar Nav Mobile
  mobileItem.addEventListener("click", showNav);
})
//Funciones
//Mostrar Nav
function showNav() {
  if (mobileNav.classList.contains('hidden-mobile-nav')) {
    mobileNav.classList.remove('hidden-mobile-nav')
    mobileNav.classList.add('show-mobile-nav')
  } else {
    mobileNav.classList.remove('show-mobile-nav')
    mobileNav.classList.add('hidden-mobile-nav')
  }
}