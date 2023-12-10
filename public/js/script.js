console.log('huuu');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationMessage = document.querySelector('#location')
const temperatureMessage = document.querySelector('#temperature');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;


    locationMessage.textContent = 'loading..';
    temperatureMessage.textContent = '';


    console.log(location);

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                locationMessage.textContent = data.error;

            }
            else {
                locationMessage.textContent = `location: ${data.location}`;
                temperatureMessage.textContent = `temperature: ${data.temperature}`


            }
        })
    })
})