const city = document.getElementById("city");
const btn = document.getElementById("search");
const about = document.querySelector(".description");
const feel = document.getElementById("feel");
const box = document.querySelector(".container");
const max = document.getElementById("max");
const min = document.getElementById("min");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("speed");
const conditions = document.querySelector(".conditions");
const rain = document.querySelector("#prob");
const place = document.querySelector(".place");
const next = document.querySelector(".next");
let a, p = 0;
btn.addEventListener("click", () => {
    if (p > 0) {
        a.pause();
    }
    document.body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/6/6d/Wind_vane_05643.jpg')";
    document.querySelector(".result").style.display = "none";
    document.querySelector(".wrong").style.display = "none";
    document.querySelector(".empty").style.display = "none";
    document.querySelectorAll(".b").forEach(element => {
        element.classList.remove("black");
        
    });
    if (city.value == "" || city.value == null) {
        document.querySelector(".empty").style.display = "block";
    }
    else {


        let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city.value}?unitGroup=us&key=5KRJVTXQDSPR52EMJUFGPTT8A&contentType=json`;



        try {
            let response = fetch(url);
            response.then((val) => {
                return val.json();
            }).then((e) => {
                if (p > 0) {
                    a.pause();
                }
                document.querySelector(".empty").style.display = "none";
                document.querySelector(".wrong").style.display = "none";
                let sky = e.days[0].icon;
                if (e.days[0].temp < 0) {

                    document.body.style.backgroundImage = "url('https://www.icegif.com/wp-content/uploads/winter-icegif-1.gif')";
                }

                else if (sky.toLowerCase().includes("rain")) {

                    document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/41/90/be/4190be46508500f52ec133f793ac3b5d.gif')";
                    a = new Audio("rain.mp3");
                    a.play();
                    p = p + 1;
                }
                else if (sky.toLowerCase().includes("cloudy")) {
                    document.body.style.backgroundImage = "url('https://thumbs.gfycat.com/CookedSardonicArkshell-size_restricted.gif')";

                }
                else if (sky.toLowerCase().includes("clear")) {
                    document.body.style.backgroundImage = "url('https://steamuserimages-a.akamaihd.net/ugc/913535336056989536/7DB69F45F011A7E7459B27AF8B8C890E2CE5D387/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false')";
                    document.querySelectorAll(".b").forEach(element => {
                        element.classList.add("black");
                        
                    });

                }
                else {
                    document.body.style.backgroundImage = "url('https://steamuserimages-a.akamaihd.net/ugc/913535336056989536/7DB69F45F011A7E7459B27AF8B8C890E2CE5D387/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false')";
                }

                let t;
                console.log(e);
                place.innerHTML = e.resolvedAddress;
                conditions.innerHTML = e.days[0].conditions;
                about.innerHTML = e.days[0].description;
                t = (5 * (parseFloat(e.currentConditions.feelslike) - 32)) / 9;
                feel.innerHTML = `${e.days[0].feelslike}°F || ${t.toFixed(2)}°C `;
                console.log(e.currentConditions.temp);

                t = (5 * (parseFloat(e.days[0].tempmax) - 32)) / 9;
                max.innerHTML = ` ${t.toFixed(2)}°C `;
                t = (5 * (parseFloat(e.days[0].tempmin) - 32)) / 9;
                min.innerHTML = ` ${t.toFixed(2)}°C `;
                pressure.innerHTML = `${e.days[0].pressure}mbar`;
                humidity.innerHTML = `${e.days[0].humidity}%`;
                wind.innerHTML = `${e.days[0].windspeed}km/h`;
                rain.innerHTML = `${e.days[0].precipprob
                    }%`;
                next.innerHTML = e.description;
                city.value = "";
                document.querySelector(".result").style.display = "block";




            }).catch((error) => {
                console.error(error);
                if (p > 0) {
                    a.pause();
                }
                document.body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/6/6d/Wind_vane_05643.jpg')";
                document.querySelector(".result").style.display = "none";
                document.querySelector(".wrong").style.display = "block";
                city.value = "";
            })

        } catch (error) {
            console.error(error);
            alert(error);
            document.querySelector(".wrong").style.display = "block";
        }
    }
})




