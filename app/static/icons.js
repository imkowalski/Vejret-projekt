//a function that returns the background picture for the weather
function background_icon(w) {
  if (weather.weather[0].main == "Clear") {
    return image(clear, pW(w), 74, pW(40), 500);
  } else if (weather.weather[0].description == "few clouds") {
    return image(few_clouds, pW(w), 74, pW(40), 500);
  } else if (weather.weather[0].description == "scattered clouds" || weather.weather[0].description == "broken clouds" || weather.weather[0].description == "overcast clouds") {
    return image(scattered_clouds, pW(w), 74, pW(40), 500);
  } else if (weather.weather[0].main == "Drizzle" || weather.weather[0].main == "Rain" || weather.weather[0].main == "Thunderstorm") {
    return image(rain, pW(w), 74, pW(40), 500);
  } else if (weather.weather[0].main == "Snow") {
    return image(snow, pW(w), 74, pW(40), 500);
  } else if (weather.weather[0].main == "50d" || weather.weather[0].main == "50n") {
    return image(mist, pW(w), 74, pW(40), 500);
  }
}

//a function that returns the icon for the weakly weather
function weather_icons(h, dag) {
  let arricons = [];
  let dth = new Date(0);
  dth.setUTCSeconds(forcast[0].dt);
  let hour = dth.getHours() + 1;

  let dt = new Date(0);
  dt.setUTCSeconds(forcast[0].dt);
  let date = dt.getDate() + dag;

  for (let i = 0; i < 40; i++) {
    let temph = new Date(0);
    temph.setUTCSeconds(forcast[i].dt);
    let now = temph.getHours() + 1;

    let temp = new Date(0);
    temp.setUTCSeconds(forcast[i].dt);
    let today = temp.getDate();

    if (date == today && hour == now) {
      let id = (forcast[i].weather[0].icon).slice(0, -1);
      if (id == "01") {
        return image(clear_icon, pW(23), h, 70, 70);
      } else if (id == "02") {
        return image(few_clouds_icon, pW(23), h, 70, 70);
      } else if (id == "03" || id == "04") {
        return image(scattered_clouds_icon, pW(23), h, 70, 70);
      } else if (id == "09" || id == "10" || id == "11") {
        return image(rain_icon, pW(23), h, 70, 70);
      } else if (id == "13") {
        return image(snow_icon, pW(23), h, 70, 70);
      } else if (id == "50") {
        return image(clear, pW(23), h, 70, 70);
      }
    }
  }
}

