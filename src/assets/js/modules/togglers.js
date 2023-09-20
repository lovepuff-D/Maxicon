const mobileMenuTgl = document.querySelector('button[data-open-mobile-menu]')

if (mobileMenuTgl) {
  mobileMenuTgl.addEventListener('click', () => {
    document.body.classList.toggle('mobile-menu-is-active')
  })
}