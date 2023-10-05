// finds the max temp for the day and retuns it
function tempMax(dag) {
    let arrMax = [];
    let dt = 0;
    dt = new Date(0);
    dt.setUTCSeconds(forcast[0].dt);
    let date = dt.getDate() + dag;
    let maxtemp;
    for (i = 0; i < 40; i++) {
        let temp = new Date(0);
        temp.setUTCSeconds(forcast[i].dt);
        let date1 = temp.getDate();
        
        if (date == date1) {
            arrMax.push(forcast[i].main.temp);
            maxtemp = Math.max(...arrMax);
           
        }
    }
    return Math.round(maxtemp);
}

// finds the min temp for the day and retuns it
function tempMin(dag) {
    let arrMin = [];
    let dt = 0;
    dt = new Date(0);
    dt.setUTCSeconds(forcast[0].dt);
    let date = dt.getDate() + dag;
    let mintemp;
    for (i = 0; i < 40; i++) {
        let temp = new Date(0);
        temp.setUTCSeconds(forcast[i].dt);
        let date1 = temp.getDate();

        if (date == date1) {
            arrMin.push(forcast[i].main.temp);
            mintemp = Math.min(...arrMin);
        }
    }
    return Math.round(mintemp);
}

// finds the max temp for the day and retuns the time
function timeForMaxTemp() {
    let dt = new Date(0);
    dt.setUTCSeconds(forcast[0].dt);
    let date = dt.getDate();
    let maxtemp = forcast[0];
    for (let i = 0; i < 8; i++) {
        let temp = new Date(0);
        temp.setUTCSeconds(forcast[i].dt);
        let today = temp.getDate();

        if (date == today) {
            if (forcast[i].main.temp > maxtemp.main.temp) {
                maxtemp = forcast[i];
            }
        }
    }
    return maxtemp;
}