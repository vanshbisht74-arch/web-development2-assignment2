let logBox = document.getElementById("logBox")
let historyBox = document.getElementById("historyBox")

function log(text){
logBox.innerHTML += text + "<br>"
}

function saveHistory(city){

let list = JSON.parse(localStorage.getItem("cities")) || []

if(!list.includes(city)){
list.push(city)
}

localStorage.setItem("cities", JSON.stringify(list))

showHistory()
}

function showHistory(){

historyBox.innerHTML = ""

let list = JSON.parse(localStorage.getItem("cities")) || []

list.forEach(function(city){

let btn = document.createElement("button")
btn.innerText = city
btn.className = "button"

btn.onclick = function(){
getWeather(city)
}

historyBox.appendChild(btn)

})
}

function searchWeather(){

let city = document.getElementById("cityInput").value

if(city == ""){
log("enter city name")
return
}

getWeather(city)
}

async function getWeather(city){

log("start")

try{

log("fetching data")

let res = await fetch("https://wttr.in/" + city + "?format=j1")

let data = await res.json()

log("data received")

document.getElementById("cityText").innerText = city
document.getElementById("tempText").innerText = data.current_condition[0].temp_C + " C"
document.getElementById("weatherText").innerText = data.current_condition[0].weatherDesc[0].value
document.getElementById("humidityText").innerText = data.current_condition[0].humidity
document.getElementById("windText").innerText = data.current_condition[0].windspeedKmph

saveHistory(city)

}catch(e){

log("error")

document.getElementById("cityText").innerText = "not found"

}

setTimeout(function(){
log("timeout done")
},0)

}

showHistory()
