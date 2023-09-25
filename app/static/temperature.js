function tempMax() {
    let arrMax = [];
    let arrMin = [];
    let b = 1;
    let dt = 0;
    let day = day()
    dt = new Date(0);
    dt.setUTCSeconds(forcast[0].dt);
    let date = dt.getDate();
   
    for (i = 0; i < 8; i++) {
    
        arrMax.push(forcast[i].main.temp);
       
        if (date == day) {
            print("hello")
            
            //return Math.max(arrMax);
            
        }
        
        
    }
}