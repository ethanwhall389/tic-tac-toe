// COLOR MODES
let html = document.querySelector('html');
html.classList.add('mode-blue');

let swatch = document.querySelectorAll('.swatch');
swatch.forEach( (item) => {
    item.addEventListener('click', (event) => {
        let currentColorMode = html.classList.value;
        let colorMode = item.getAttribute('data-color-mode');
        html.classList.remove(currentColorMode);
        html.classList.add(colorMode);
    })
})