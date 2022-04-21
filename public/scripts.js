"use strict"

if (!navigator.geolocation){
    alert("Su dispositivo no cuenta con geolocalizacion")
};

//VARIABLES
let mycyty = document.getElementById("mycity");
let searchcity = document.getElementById("searchcity");
let search = document.getElementById("search");

//PANTALLA DE CARGA
addEventListener("load",()=>{
    setTimeout(()=>{
        document.getElementById("load").style.opacity = "0";
        document.getElementById("load").style.visibility = "hidden";
    },1000);
});


//PETICION API CLIMA
const requestWeather = (inf)=>{
    let error = document.getElementById("error");
    const data = inf.data;

    if (data.cod == 404) {
        error.textContent = "La ubicacion no pudo ser encontrada";
    } else {
        error.textContent = "";

        let degrees = document.getElementById("celcius"); degrees.textContent = `${Math.round(data.main.temp)}°C`;
        let city = document.getElementById("city"); city.textContent = data.name;
        let country = document.getElementById("country"); country.textContent = data.sys.country;
        let humidity = document.getElementById("humidity"); humidity.textContent = `humedad: ${data.main.humidity}`;
    
        let weather = document.getElementById("weather");
        let iconWeather = document.getElementById("iconWeather");
        //CLIMA E ICONO ACORDE AL JSON
        switch(data.weather[0].main) {
            case "Clouds":
                weather.textContent = "Nublado";
                iconWeather.src = "animated/cloudy-day-3.svg";
                break;
            case "Clear":
                weather.textContent = "Despejado";
                iconWeather.src = "animated/day.svg";
                break;
            case "Mist":
                weather.textContent = "Neblina";
                iconWeather.src = "animated/cloudy.svg";
                break;
            case "Rain":
                weather.textContent = "LLuvia";
                iconWeather.src = "animated/rainy-6.svg";
                break;
            case "Thunderstorm":
                weather.textContent = "Tormenta Electrica"
                iconWeather.src = "animated/thunder.svg";
        };
    };
};

//URL UBICACION ACTUAL
const urlCurrent = (call)=>{
    navigator.geolocation.getCurrentPosition( async (position)=>{
        let coords = position.coords;
        let lat = coords.latitude;
        let lon = coords.longitude;
    
        let peticion = await fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                kind: 1,
                lat,
                lon
            })
        });
    
        const data = await peticion.json();
        call(data);
    });
};

//CARGA LA WEB CON LA UBICACION ACTUAL
urlCurrent(requestWeather);

//BOTON CIUDAD ACTUAL
mycyty.addEventListener("click",()=> urlCurrent(requestWeather));

//URL POR CIUDAD
searchcity.addEventListener("click", async ()=>{
    let city = search.value || "h";
    
    let peticion = await fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            kind: 2,
            city
        })
    });

    const data = await peticion.json();
    requestWeather(data);
});