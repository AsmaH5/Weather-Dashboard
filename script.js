

fetch('http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=8151685b3130e0cde5b604d6f9b2e0d4')
    .then(function(response) {
    return response.json()
    }).then(function(data) {
        console.log(data)
})


fetch('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=8151685b3130e0cde5b604d6f9b2e0d4')
    .then(function(response) {
    return response.json()
    }).then(function(data) {
        console.log(data)
})

