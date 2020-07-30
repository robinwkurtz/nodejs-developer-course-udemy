const weatherForm = document.querySelector('form');
const weatherFormAddressInput = document.querySelector('input');
const weatherFormMessageOne = document.querySelector('#message-one');
const weatherFormMessageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset content
    weatherFormMessageOne.textContent = 'Loading...';
    weatherFormMessageTwo.textContent = '';

    fetch(`/weather?address=${weatherFormAddressInput.value}`).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    weatherFormMessageOne.textContent = data.error;
                } else {
                    weatherFormMessageOne.textContent = data.location;
                    weatherFormMessageTwo.textContent = data.forecast;
                }
            });
        }
    );
});
