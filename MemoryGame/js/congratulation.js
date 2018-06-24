import 'app.js';

let spans = document.querySelectorAll('span');
spans[0].textContent = moves;

if (moves > 19)
    spans[2].textContent = 1;
else if (moves > 9)
    spans[2].textContent = 2;
else
    spans[2].textContent = 3;