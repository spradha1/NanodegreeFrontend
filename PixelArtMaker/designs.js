// Select color input
const colorPicker = document.getElementById('colorPicker');
// Select size input
const height = document.querySelector('#inputHeight');
const width = document.querySelector('#inputWidth');

const form = document.getElementById('sizePicker');

/**
* @description draws the cells by adding <td>s and attach event listeners to them
* @param {Event} event - The event that invoked the function
*/
function makeGrid(event) {
  event.preventDefault();
  const table = document.getElementById('pixelCanvas');
  const previousCells = document.querySelectorAll('tr');
  previousCells.forEach(function(item){
      item.remove();
  });
  for (let r=0; r<height.value; r++){
    const row = document.createElement('tr');
    table.appendChild(row);
    for (let c=0; c<width.value; c++){
      const cell = document.createElement('td');
      row.appendChild(cell);
      cell.addEventListener('click', function (){
        cell.style.backgroundColor = colorPicker.value;
      });
    }
  }
}

// When size is submitted by the user, call makeGrid()
form.addEventListener('submit', makeGrid);