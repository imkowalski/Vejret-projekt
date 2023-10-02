function background_icon(){
    if (weather.weather[0].main == "Clear") {
        return image(clear, pW(55), 74, pW(40), 500);
      } else if (weather.weather[0].description == "few clouds") {
        return image(few_clouds, pW(55), 74, pW(40), 500);
      } else if (weather.weather[0].description == "scattered clouds" || weather.weather[0].description == "broken clouds" || weather.weather[0].description == "overcast clouds") {
        return image(scattered_clouds, pW(55), 74, pW(40), 500);
      } else if (weather.weather[0].main == "Drizzle" || weather.weather[0].main == "Rain" || weather.weather[0].main == "Thunderstorm") {
        return image(rain, pW(55), 74, pW(40), 500);
      } else if (weather.weather[0].main == "Snow") {
        return image(snow, pW(55), 74, pW(40), 500);
      } else if (weather.weather[0].main == "50d" || weather.weather[0].main == "50n") {
        return image(mist, pW(55), 74, pW(40), 500);
      }
}
function weather_icons(h){
    if (weather.weather[0].main == "Clear") {
        return image(1, pW(55), h, 50, 50);
      } else if (weather.weather[0].description == "few clouds") {
        return image(2, pW(55), h, 50, 50);
      } else if (weather.weather[0].description == "scattered clouds" || weather.weather[0].description == "broken clouds" || weather.weather[0].description == "overcast clouds") {
        return image(3, pW(55), h, 50, 50);
      } else if (weather.weather[0].main == "Drizzle" || weather.weather[0].main == "Rain" || weather.weather[0].main == "Thunderstorm") {
        return image(4, pW(55), h, 50, 50);
      } else if (weather.weather[0].main == "Snow") {
        return image(5, pW(55), h, 50, 50);
      } else if (weather.weather[0].main == "50d" || weather.weather[0].main == "50n") {
        return image(6, pW(55), h, 50, 50);
      }
}