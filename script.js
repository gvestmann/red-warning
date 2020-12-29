let api = "https://api.nasa.gov/insight_weather/?api_key=bZTSj2og3ShInfizS2uO0XsucghEfJewjSLlf176&feedtype=json&ver=1.0"

let temperature = document.querySelector('.temperature')
let wind = document.querySelector('.wind')
let sol = document.getElementById('main__top--select--location');
let checkbox = document.getElementById('input-check');

let nasaData = [];

fetch(api)

.then(function getData(data) {
        return data.json()
})

.then(data =>{
    let nasaData = data;
    let optionSelect = document.getElementById("main__top--select--location");
    for (var i = 0; i < data.sol_keys.length; i++) {
        var option = document.createElement("option");
        option.value = data.sol_keys[i];
        option.text = `Sol ${data.sol_keys[i]}`;
        optionSelect.appendChild(option);
    }
    let value = optionSelect.options[optionSelect.selectedIndex].value;
    let checked = JSON.parse(localStorage.getItem('checked'));
    if(checked != 'on') {
        temperature.innerHTML = ~~data[value].AT.av  + '<span class="temperature__measurement"> °c</span>';
        wind.innerHTML = ~~data[value].HWS.av  + '<span class="wind__measurement"> m/s</span>';
    } else {
        let celcius = data[value].AT.av
        let farenheit = celcius * (9/5) + 32;
        temperature.innerHTML = ~~farenheit + '<span class="temperature__measurement"> °f</span>';
        wind.innerHTML = ~~data[value].HWS.av  + '<span class="wind__measurement"> m/s</span>';
    }

    function checkCheck() {
        let checked = JSON.parse(localStorage.getItem('checked'));
        if (checked === 'on') {
            let inputs = document.getElementById('input-check');
            inputs.checked = true;
        } else {
            let inputs = document.getElementById('input-check');
            inputs.checked = false;
        }
    }

    sol.addEventListener('change', function() {
        let checked = JSON.parse(localStorage.getItem('checked'));
        let sol = this.value;
        if(checked != 'on') {
            console.log(nasaData)
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

    checkbox.addEventListener( 'change', function() {
        if(this.checked) {
            localStorage.setItem("checked", JSON.stringify(checkbox.value))
            var x = document.getElementById("main__top--select--location").selectedIndex;
            let sol = document.getElementsByTagName("option")[x].value
            let celcius = nasaData[sol].AT.av
            let farenheit = celcius * (9/5) + 32;
            temperature.innerHTML = ~~farenheit + '<span class="temperature__measurement"> °f</span>';
            wind.innerHTML = ~~data[sol].HWS.av  + '<span class="wind__measurement"> m/s</span>';
        } else {
            localStorage.setItem("checked", JSON.stringify('off'))
            var x = document.getElementById("main__top--select--location").selectedIndex;
            let sol = document.getElementsByTagName("option")[x].value
            temperature.innerHTML = ~~nasaData[sol].AT.av  + '<span class="temperature__measurement"> °c</span>'
            wind.innerHTML = ~~data[sol].HWS.av  + '<span class="wind__measurement"> m/s</span>';
        }
    });

    checkCheck();

}
);