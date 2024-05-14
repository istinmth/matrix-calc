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
        document.getElementById("convertButton").innerText = "Convert to " + rows + "x" + cols + " matrix";
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
    matrix = toEchelonForm(matrix); // First, get to Echelon form
        let stepsDiv = document.getElementById("steps");
        let stepDiv = document.createElement("div");
        stepDiv.appendChild(document.createElement("hr"));
        stepDiv.appendChild(document.createElement("p")).innerText = "Elkészült a lépcsős alak ↑";
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

    // Add the table to the step div
    stepDiv.appendChild(matrixTable);

    // Add a class to the pivot row
    if (pivotRow !== undefined) {
    matrixTable.rows[pivotRow].classList.add("pivot");
}

    // Add the step div to the steps div
    stepsDiv.appendChild(stepDiv);
}