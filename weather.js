window.addEventListener('load',() =>{
    const icon = document.querySelector('.location img');
    const degree = document.querySelector('.degree-section span');
    const degreeSec = document.querySelector('.degree-section');
    const temp = document.querySelector('.temprature-degree');
    const  weatherCon= document.querySelector('.temprature-description');
    const timeZone = document.querySelector('.location-timezone');

    let lon;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=395853dd6e6712dfd9e8ad5b8ff83856`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
            
                // Dom Update
                const {description, id} = data.current.weather[0]
                temp.textContent = data.current.temp;
                timeZone.textContent = data.timezone;
                weatherCon.textContent = description.toUpperCase();

                degreeSec.addEventListener('click', ()=>{
                    const celsius = Math.floor((data.current.temp - 32) * 5/9);
                    console.log(celsius)

                    if(degree.textContent == '°F'){
                        degree.textContent = '°C';
                        temp.textContent = celsius;
                    }
                    else {
                        degree.textContent = '°F';
                        temp.textContent = data.current.temp;
                    };

                });

                if( id <= 232){
                    icon.src = './img/thunderstrom.png'
                }
                else if(id <= 321){
                    icon.src = './img/Rain.png'
                }
                else if(id <= 531){
                    icon.src = './img/Rain.png'
                }
                else if(id <= 622){
                    icon.src = './img/snow.png'
                }
                else if(id <= 781){
                    icon.src = './img/mist.png'
                }
                else if(id == 800){
                    icon.src = './img/clearsky.png'
                }
                else if(id <= 804){
                    icon.src = './img/fewclouds.png'
                }
            });

        });

    };

});