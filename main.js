// Purpose: This file contains the JavaScript code for the matrix operations.
    function addRow() {
        const table = document.getElementById("matrixTable");
        const row = table.insertRow(-1);
        const cells = table.rows[0].cells.length;
        for (let i = 0; i < cells; i++) {
            const cell = row.insertCell(i);
            cell.innerHTML = '<input type="text">';
    updateMatrixSize()
}
}

    function addColumn() {
        const table = document.getElementById("matrixTable");
        const rows = table.rows.length;
        for (let i = 0; i < rows; i++) {
            const cell = table.rows[i].insertCell(-1);
            cell.innerHTML = '<input type="text">';
    updateMatrixSize()
}
}

    function removeRow() {
        const table = document.getElementById("matrixTable");
        const rows = table.rows.length;
        if (rows > 1) {
    table.deleteRow(-1);
    updateMatrixSize()
}
}

    function removeColumn() {
        const table = document.getElementById("matrixTable");
        const rows = table.rows.length;
        const cells = table.rows[0].cells.length;
        if (cells > 1) {
    for (let i = 0; i < rows; i++) {
    table.rows[i].deleteCell(-1);
    updateMatrixSize()
}
}
}
    function updateMatrixSize() {
        const table = document.getElementById("matrixTable");
        const rows = table.rows.length;
        const cols = table.rows[0].cells.length;
        document.getElementById("convertButton").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
            <path d="M 3 4 L 3 20 L 6 20 L 6 18 L 5 18 L 5 6 L 6 6 L 6 4 L 3 4 z M 18 4 L 18 6 L 19 6 L 19 18 L 18 18 L 18 20 L 21 20 L 21 4 L 18 4 z M 14.751953 8.4238281 C 14.253244 8.4137617 13.749578 8.5373281 13.345703 8.8144531 C 13.085703 8.9934531 12.862469 9.2224063 12.605469 9.4414062 C 12.214469 8.6644063 11.508172 8.4573594 10.701172 8.4433594 C 9.8831719 8.4303594 9.2496406 8.8005156 8.6816406 9.4785156 L 8.6816406 8.640625 L 7 8.640625 L 7 14.988281 L 8.7871094 14.988281 C 8.7871094 14.988281 8.7840625 12.608594 8.7890625 11.433594 C 8.7900625 11.224594 8.80075 11.011641 8.84375 10.806641 C 8.97575 10.178641 9.5142031 9.79175 10.158203 9.84375 C 10.771203 9.89375 11.050078 10.227172 11.080078 10.951172 C 11.085078 11.077172 11.087891 14.984375 11.087891 14.984375 L 12.898438 14.984375 C 12.898437 14.984375 12.891344 12.512891 12.902344 11.462891 C 12.905344 11.191891 12.932047 10.914344 12.998047 10.652344 C 13.146047 10.064344 13.623484 9.7766563 14.271484 9.8476562 C 14.843484 9.9096562 15.129875 10.225656 15.171875 10.847656 L 15.171875 15 L 16.974609 15 C 16.974609 15 17.003609 11.880438 16.974609 10.398438 C 16.968609 10.095438 16.871375 9.7710938 16.734375 9.4960938 C 16.401875 8.8292188 15.583135 8.4406055 14.751953 8.4238281 z"></path>
        </svg> (${rows} × ${cols}) → Számol`;
}
    function tableToMatrix() {
    let table = document.getElementById("matrixTable");
    let matrix = [];
    for (let i = 0, row; (row = table.rows[i]); i++) {
    let rowArray = [];
    for (let j = 0, cell; (cell = row.cells[j]); j++) {
    try {
    let inputValue = parseFloat(cell.children[0].value);
    if (isNaN(inputValue)) {
    rowArray.push(0);
}
    else {
    rowArray.push(inputValue);
}
} catch (e) {
    alert("Invalid input");
    return;
}
}
    matrix.push(rowArray);
}
    console.log(matrix);
    matrix = toRREF(matrix); // Call the function here
    return matrix;
}

    function gcd(a, b) {
    if (!b) {
    return a;
}
    return gcd(b, a % b);
}


    function roundToNearestInteger(num) {
    let tolerance = 0.0000000000001; // You can adjust this value as needed
    if (Math.abs(Math.round(num) - num) < tolerance) {
    return Math.round(num);
}
    return num;
}

    function toEchelonForm(matrix) {
    document.getElementById("steps").innerHTML = "";
    let h = 0;
    let k = 0;

    while (h < matrix.length && k < matrix[0].length) {
    if (matrix[h][k] === 0) {
    k++;
} else {
    for (let i = h + 1; i < matrix.length; i++) {
    let x = matrix[i][k];
    let y = matrix[h][k];
    let g = gcd(Math.abs(x), Math.abs(y));
    x /= g;
    y /= g;
    if (y < 0) {
    x = -x;
    y = -y;
}
    for (let j = k; j < matrix[0].length; j++) {
    matrix[i][j] = roundToNearestInteger(matrix[i][j] * y - matrix[h][j] * x);
}
    addStep("Subtracted " + x + " times row " + (h+1) + " from row " + (i+1), matrix, h);
}

    h++;
    k++;
}
}

    for (let i = 0; i < matrix.length; i++) {
    let pivot = matrix[i][i];
    if (pivot < 0) {
    for (let j = 0; j < matrix[0].length; j++) {
    matrix[i][j] = roundToNearestInteger(-matrix[i][j]);
}
    addStep("Scaled row " + (i+1) + " by -1", matrix, i);
}
}

    return matrix;
}
    function toEchelonFormWithPartialPivoting(matrix) {
    document.getElementById("steps").innerHTML = "";
    let h = 0;
    let k = 0;

    while (h < matrix.length && k < matrix[0].length) {
    let i_max = h;
    for (let i = h + 1; i < matrix.length; i++) {
    if (Math.abs(matrix[i][k]) > Math.abs(matrix[i_max][k])) {
    i_max = i;
}
}

    if (matrix[i_max][k] === 0) {
    k++;
} else {
    let temp = matrix[h];
    matrix[h] = matrix[i_max];
    matrix[i_max] = temp;
    addStep("Swapped row " + (h+1) + " with row " + (i_max+1), matrix, h);

    for (let i = h + 1; i < matrix.length; i++) {
    let x = matrix[i][k];
    let y = matrix[h][k];
    let g = gcd(Math.abs(x), Math.abs(y));
    x /= g;
    y /= g;
    if (y < 0) {
    x = -x;
    y = -y;
}
    for (let j = k; j < matrix[0].length; j++) {
    matrix[i][j] = roundToNearestInteger(matrix[i][j] * y - matrix[h][j] * x);
}
    addStep("Subtracted " + x + " times row " + (h+1) + " from row " + (i+1), matrix, h);
}

    h++;
    k++;
}
}

    for (let i = 0; i < matrix.length; i++) {
    let pivot = matrix[i][i];
    if (pivot < 0) {
    for (let j = 0; j < matrix[0].length; j++) {
    matrix[i][j] = roundToNearestInteger(-matrix[i][j]);
}
    addStep("Scaled row " + (i+1) + " by -1", matrix, i);
}
}

    return matrix;
}
    function toRREF(matrix) {
    matrix = toEchelonFormWithPartialPivoting(matrix); // First, get to Echelon form
        let stepsDiv = document.getElementById("steps");
        let stepDiv = document.createElement("div");
        stepDiv.className = "elkeszult";
        let greenText = document.createElement("p");
        greenText.innerText = "Elkészült a lépcsős alak ↑";
        greenText.classList.add("green-text");
        stepDiv.appendChild(greenText);
        stepDiv.appendChild(document.createElement("p")).innerText = "Innentől a redukált lépcsős alak következik.";
        stepDiv.appendChild(document.createElement("hr"));
        stepsDiv.appendChild(stepDiv);
    for (let i = matrix.length - 1; i >= 0; i--) {
    let pivotIndex = -1;
    for (let j = 0; j < matrix[0].length; j++) {
    if (matrix[i][j] !== 0) {
    pivotIndex = j;
    break;
}
}

    if (pivotIndex === -1) continue;

    let pivot = matrix[i][pivotIndex];
    for (let j = 0; j < matrix[0].length; j++) {
    matrix[i][j] = roundToNearestInteger(matrix[i][j] / pivot);
}
    addStep("Scaled row " + (i+1) + " by " + (1/pivot), matrix, i);

    for (let h = i - 1; h >= 0; h--) {
    let x = matrix[h][pivotIndex];
    for (let j = 0; j < matrix[0].length; j++) {
    matrix[h][j] = roundToNearestInteger(matrix[h][j] - matrix[i][j] * x);
}
    addStep("Subtracted " + x + " times row " + (i+1) + " from row " + (h+1), matrix, h);
}
}

    return matrix;
}

    function addStep(description, matrix, pivotRow) {
    // Get the steps div
    let stepsDiv = document.getElementById("steps");

    // Create a new div for this step
    let stepDiv = document.createElement("div");

    // Create a paragraph for the description and add it to the step div
    let descriptionP = document.createElement("p");
    descriptionP.innerText = description;
    stepDiv.appendChild(descriptionP);

    // Create a table for the matrix
    let matrixTable = document.createElement("table");
    matrixTable.classList.add("stepMatrixTable");
    for (let i = 0; i < matrix.length; i++) {
    // Create a new row
    let row = document.createElement("tr");

    for (let j = 0; j < matrix[i].length; j++) {
    // Create a new cell and add it to the row
    let cell = document.createElement("td");
    console.log(typeof matrix[i][j]); // Add this line

    if (matrix[i][j] !== undefined) {
    cell.innerText = matrix[i][j];
} else {
    cell.innerText = '0';
}


    row.appendChild(cell);
}

    // Add the row to the table
    matrixTable.appendChild(row);
}
        let maxLength = 0;

// Find the maximum length of cell content
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                let cellContent = matrix[i][j].toString();
                maxLength = Math.max(maxLength, cellContent.length);
            }
        }

// Set the width of all cells based on the maximum length
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                let cell = matrixTable.rows[i].cells[j];
                cell.style.width = `${maxLength * 0.6}em`;
            }
        }

    // Add the table to the step div
    stepDiv.appendChild(matrixTable);

    // Add a class to the pivot row
    if (pivotRow !== undefined) {
    matrixTable.rows[pivotRow].classList.add("pivot");
}

    // Add the step div to the steps div
    stepsDiv.appendChild(stepDiv);
}

function createMarqueeEffect() {
    const tableCells = document.querySelectorAll('.stepMatrixTable td');

    tableCells.forEach(cell => {
        const cellText = cell.textContent.trim();
        const cellWidth = cell.offsetWidth;
        const textWidth = getTextWidth(cellText, cell);

        if (textWidth > cellWidth) {
            const marqueeContainer = document.createElement('div');
            marqueeContainer.classList.add('marquee-container');

            const marqueeText = document.createElement('span');
            marqueeText.classList.add('marquee-text');
            marqueeText.textContent = cellText;

            marqueeContainer.appendChild(marqueeText);
            cell.textContent = '';
            cell.appendChild(marqueeContainer);
        }
    });
}

// Helper function to get the width of a text string
function getTextWidth(text, element) {
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
    const context = canvas.getContext('2d');
    context.font = window.getComputedStyle(element).font;
    return context.measureText(text).width;
}

// Call the function when the page loads or when the table is updated
window.addEventListener('load', createMarqueeEffect);