export const clickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      const button = document.getElementById('user-menu-button')
      if (button && (button === event.target || button.contains(event.target))) {
        return
      }
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
