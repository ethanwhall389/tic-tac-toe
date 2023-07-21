// COLOR MODES
let html = document.querySelector('html');
html.classList.add('mode-blue');

let swatch = document.querySelectorAll('.swatch');
swatch.forEach( (item) => {
    item.addEventListener('click', (event) => {
        let colorMode = item.getAttribute('data-color-mode');
        html.classList.remove('mode-blue');
        html.classList.add(colorMode);
    })
})