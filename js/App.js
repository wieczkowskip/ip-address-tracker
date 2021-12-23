// var map = L.map('map').setView([51.505, -0.09], 13);
const cordinates = [53.02080723947551, 18.623863175094407];
var map = new L.Map('map', {
    center: cordinates,
    zoom: 12,
    zoomControl: false,
    layers: [
        new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        })
    ]
});
const xhr1 = new XMLHttpRequest();
    xhr1.open('GET', 'https://api.ipify.org/?format=json');
    xhr1.responseType = 'json';
    xhr1.onload = function(){
        userIp = xhr1.response['ip'];
        console.log(userIp);
        getInformation(userIp);
    }
    xhr1.send();
    
    //getInformation(userIp);

const marker = L.marker(cordinates).addTo(map);

const apiKey = ''; //TODO -> paste your ipify APIkey

const submitBtn = document.querySelector('.form__submit');

submitBtn.addEventListener('click', showLocation);

const ipValueDiv = document.querySelector('#ip .info__value');
const locationValueDiv = document.querySelector('#location .info__value');
const timezoneValueDiv = document.querySelector('#timezone .info__value');
const ispValueDiv = document.querySelector('#isp .info__value');


function showLocation(){
    const input = document.querySelector('input').value;
    //const convertedInput = input.split(',');
    //const fixedInput = convertedInput.map((item) => parseInt(item));
    //console.log(fixedInput);
    //marker.setLatLng(fixedInput);
    //map.center = fixedInput;
    //console.log(input);
    getInformation(input);
}
function getInformation(input){
    const xhr2 = new XMLHttpRequest();
    console.log('https://geo.ipify.org/api/v2/country,city?apiKey=' + apiKey +'&ipAddress=' + input);
    xhr2.open('GET', 'https://geo.ipify.org/api/v2/country,city?apiKey=' + apiKey +'&ipAddress=' + input);
    xhr2.responseType = 'json';
    xhr2.onload = function(){
        const output = xhr2.response;
        const ip = output['ip'];
        const location = output['location']['city'] + ', ' + output['location']['region'] + ' ' + output['location']['postalCode'];
        const timezone = 'UTC ' + output['location']['timezone'];
        const isp = output['isp'];
        ipValueDiv.innerHTML = ip;
        locationValueDiv.innerHTML = location;
        timezoneValueDiv.innerHTML = timezone;
        ispValueDiv.innerHTML = isp;
        console.log(output);
        console.log(ip);
        console.log(location);
        console.log(timezone);
        console.log(isp);
        const lat = output['location']['lat'];
        const lng = output['location']['lng'];
        marker.setLatLng([lat, lng]);
        map.panTo([lat, lng]);
    }
    xhr2.send();
}