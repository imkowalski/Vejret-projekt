# WinterBliss


## How to use git

**Gør det her før du starter at programmer eller gør noget som helst med filerne**
````bash
git pull
````

**Gør det her når du er færdig med at programmere noget vigtigt**
````bash
git add .
git commit -m "<skriv kort hvad du har lavet>"
git push
````

**Ny feature? Gør det her for at starte**
````
git branch <feature-navn>
git checkout <feature-navn>
````
lav det du ved med nogen git commits ligesom normalt
når din feature er færdig, testet og beskrivet med kommentar gør det her
````
git checkout main
git merge <feature-navn>
git branch -d <feature-navn>
````