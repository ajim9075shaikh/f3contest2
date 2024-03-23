const apiKey = 'hdCPEMwh10sU7MMKCv9fSuahfBdCSH1m3ZnSB8Qi'

document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    addSearchToHistory();
});

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split('T')[0];
    getImageOfTheDay(currentDate);
}

function getImageOfTheDay(date) {
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayImage(data);
            saveSearch(date);
            addSearchToHistory();
        })
        .catch(error => console.error('Error fetching image:', error));
}

function displayImage(data) {
    const currentImageContainer = document.getElementById('current-image-container');
    currentImageContainer.innerHTML = `
        <div>
            <h2>${data.title}</h2>
            <img src="${data.url}" alt="${data.title}">
            <p>${data.explanation}</p>
        </div>
    `;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory() {
    const searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = '';
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(search => {
        const listItem = document.createElement('li');
        listItem.textContent = search;
        listItem.addEventListener('click', () => getImageOfTheDay(search));
        searchHistory.appendChild(listItem);
    });
}

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchDate = document.getElementById('search-input').value;
    getImageOfTheDay(searchDate);
});
