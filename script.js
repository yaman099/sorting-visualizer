const arrayContainer = document.querySelector('.array-container');
const generateArrayBtn = document.getElementById('generate-array');
const startSortingBtn = document.getElementById('start-sorting');
const algorithmSelect = document.getElementById('algorithm-select');
const speedInput = document.getElementById('speed');
let array = [];
let delay = 1000 / speedInput.value;

speedInput.addEventListener('input', () => {
    delay = 1000 / speedInput.value;
});

function generateRandomArray(size = 50) {
    array = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 500) + 10;
        array.push(value);
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value}px`;
        bar.style.width = `${600 / size}px`; // Ensure bars fit within the container
        arrayContainer.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            if (array[j] > array[j + 1]) {
                await sleep(delay);
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            bars[j].style.backgroundColor = '#61dafb';
            bars[j + 1].style.backgroundColor = '#61dafb';
        }
        bars[array.length - i - 1].style.backgroundColor = 'green'; // Mark sorted element
    }
    bars[0].style.backgroundColor = 'green'; // Last element is sorted
}

async function selectionSort() {
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = 'red';

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'red';
            await sleep(delay);

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }

            bars[j].style.backgroundColor = '#61dafb';
        }

        if (minIndex !== i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;

            bars[i].style.height = `${array[i]}px`;
            bars[minIndex].style.height = `${array[minIndex]}px`;
        }

        bars[i].style.backgroundColor = 'green'; // Mark sorted element
    }
}

async function insertionSort() {
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = 'red';

        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = 'red';
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j]}px`;

            await sleep(delay);

            bars[j].style.backgroundColor = '#61dafb';
            j--;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
        bars[i].style.backgroundColor = '#61dafb';
    }

    for (let k = 0; k < array.length; k++) {
        bars[k].style.backgroundColor = 'green';
    }
}

generateArrayBtn.addEventListener('click', () => generateRandomArray());

startSortingBtn.addEventListener('click', () => {
    const algorithm = algorithmSelect.value;
    switch (algorithm) {
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'selectionSort':
            selectionSort();
            break;
        case 'insertionSort':
            insertionSort();
            break;
        // Add more cases for different algorithms
    }
});

// Initial array generation
generateRandomArray();
