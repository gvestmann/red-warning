// Let's store this monkey in a variable. The api includes my key, which I had to signup for.
let api = "https://api.nasa.gov/insight_weather/?api_key=bZTSj2og3ShInfizS2uO0XsucghEfJewjSLlf176&feedtype=json&ver=1.0"

// Here we grab some DOM elements
let temperature = document.querySelector('.temperature')
let wind = document.querySelector('.wind')
let sol = document.getElementById('main__top--select--location');
let checkbox = document.getElementById('input-check');

// I declare a variable for storing the API's data later on
let nasaData = [];

// Now we fetch NASA's weather API
fetch(api)

// When the API has responded, we want to put that data into something to work with, not JSON
.then(function getData(data) {
        return data.json()
})

// Finally, the data is put into that nasaData variable and we do an initial build of the website
.then(data =>{
    // Here's the data's variable updated
    nasaData = data;
    // We go and see if the user has selected the farenheit option, that info is from localStorage
    let checked = JSON.parse(localStorage.getItem('checked'));
    // If the user wants celcius ...
    if(checked != 'on') {
        // The temperature is displayed right from NASA's API. But take not, I round the number with ~~
        temperature.innerHTML = ~~data[689].AT.av  + '<span class="temperature__measurement"> °c</span>';
        // ... and here's the wind
        wind.innerHTML = ~~data[689].HWS.av  + '<span class="wind__measurement"> m/s</span>';
    // Now, if the user wants farenheit ...
    } else {
        // ... I get the temperature provided by the API and store it in a variable for conversion 
        let celcius = data[689].AT.av
        // Here's some math for converting celcius into farenheit
        let farenheit = celcius * (9/5) + 32;
        // And now that farenheit is displayed in the DOM
        temperature.innerHTML = ~~farenheit + '<span class="temperature__measurement"> °f</span>';
        // Plus the wind in M/S
        wind.innerHTML = ~~data[689].HWS.av  + '<span class="wind__measurement"> m/s</span>';
    }
}
);

// This function will be called at the end of the script. Is for checking if the user has chosen temperature preferences (c°or f°). Those prefs will be in localStorage if they exist. This is only for adding the correct CSS attribute to the switch HTML element
function checkCheck() {
    // Getting the info from localStorage, whether the temperature switch has been check. This is stored in the variable called "chacked"
    let checked = JSON.parse(localStorage.getItem('checked'));
    // If the switch has been actived before, we will give the input checked="true"
    if (checked === 'on') {
        let inputs = document.getElementById('input-check');
        inputs.checked = true;
        // However, if the switch is inactive, we will give the input checked="false"
    } else {
        let inputs = document.getElementById('input-check');
        inputs.checked = false;
    }
}

// This function is excecuted once a new Sol Rover is picked from the select list. Is pretty much the same as the first build function, so I won't go into much detail about that. In hindsight, I probably could have made less repitition in my code by creating a build function that takes the SOL number as a parameter. But hey! I already got to deep into it.
sol.addEventListener('change', function() {
    let checked = JSON.parse(localStorage.getItem('checked'));
    let sol = this.value;
    if(checked != 'on') {
        let sol = this.value;
        temperature.innerHTML = ~~nasaData[sol].AT.av  + '<span class="temperature__measurement"> °c</span>';
        wind.innerHTML = ~~nasaData[sol].HWS.av  + '<span class="wind__measurement"> m/s</span>';
    } else {
        let sol = this.value;
        let celcius = nasaData[sol].AT.av
        let farenheit = celcius * (9/5) + 32;
        console.log(farenheit)
        temperature.innerHTML = ~~farenheit + '<span class="temperature__measurement"> °f</span>';
        wind.innerHTML = ~~nasaData[sol].HWS.av  + '<span class="wind__measurement"> m/s</span>';
    }
}, false);

// This funtion is listening to the tick in the tickbox, for changing celcius into farenheit. Very much the same as the two above, except it puts check to true/false in localStorage 
checkbox.addEventListener( 'change', function() {
    // If the box is ticked ...
    if(this.checked) {
        // I'll add "on" to the localStorage's variable
        localStorage.setItem("checked", JSON.stringify(checkbox.value))
        var x = document.getElementById("main__top--select--location").selectedIndex;
        // Here I get the SOL number from the HTML document value instead of defining it in the function
        let sol = document.getElementsByTagName("option")[x].value
        let celcius = nasaData[sol].AT.av
        let farenheit = celcius * (9/5) + 32;
        temperature.innerHTML = ~~farenheit + '<span class="temperature__measurement"> °f</span>';
        wind.innerHTML = ~~data[sol].HWS.av  + '<span class="wind__measurement"> m/s</span>';
    } else {
        // If the user is turning off farenheit, that info is passed to localStorage
        localStorage.setItem("checked", JSON.stringify('off'))
        var x = document.getElementById("main__top--select--location").selectedIndex;
        let sol = document.getElementsByTagName("option")[x].value
        temperature.innerHTML = ~~nasaData[sol].AT.av  + '<span class="temperature__measurement"> °c</span>'
        wind.innerHTML = ~~data[sol].HWS.av  + '<span class="wind__measurement"> m/s</span>';
    }
});

// Hey! Here were are checking the checkCheck funftion :D
checkCheck();