import requests
import random

# checks if it is raining
def isRainingCheck(icondId:str) -> bool:
    if icondId[:-1] == "09" or icondId[:-1] == "10" or icondId[:-1] == "11":
        return True
    return False


    
# finds the parameters for the spotify recommendation list
def findParameters(temp:int , wind:int, cloud:int, isRaining:bool) -> str:
    params = {
        "valance": 0.5,
        "acusticness": 0.5,
        "loudness": 0.5,
        "tempo": 0.5,
        "instrumentalness": 0.5,
        "dancebility": 0.5
    }
    genres = []
    budge = 0.15
    if isRaining:
        params["valance"] += budge
        params["acusticness"] += budge
        params["loudness"] -= budge
        params["tempo"] -= budge
        params["instrumentalness"] += budge
        params["dancebility"] -= budge
        genres.extend(["chill","piano","jazz","rainy-day"])
    else:
        params["valance"] -= budge
        params["acusticness"] -= budge
        params["loudness"] += budge
        params["tempo"] += budge
        params["instrumentalness"] -= budge
        params["dancebility"] += budge
        genres.extend(["work-out","funk","happy"])
            
    if (cloud > 40):
        params["valance"] += budge
        params["acusticness"] += budge
        params["loudness"] -= budge
        params["tempo"] -= budge
        params["instrumentalness"] += budge
        params["dancebility"] -= budge
        genres.extend(["guitar","chill","sleep"])
        
    else:
        params["valance"] -= budge
        params["acusticness"] -= budge
        params["loudness"] += budge
        params["tempo"] += budge
        params["instrumentalness"] -= budge
        params["dancebility"] += budge
        genres.extend(["work-out","happy"])
        
    if (wind > 10):
        params["valance"] += budge
        params["acusticness"] += budge
        params["loudness"] -= budge
        params["tempo"] += budge
        params["instrumentalness"] += budge
        params["dancebility"] -= budge
        genres.extend(["guitar","chill","jazz"])
        
    else:
        params["valance"] -= budge
        params["acusticness"] -= budge
        params["loudness"] += budge
        params["tempo"] -= budge
        params["instrumentalness"] -= budge
        params["dancebility"] += budge
        genres.extend(["work-out","happy","funk"])
    
    if (temp > 12):
        params["valance"] -= budge
        params["acusticness"] -= budge
        params["loudness"] += budge
        params["tempo"] += budge
        params["instrumentalness"] -= budge
        params["dancebility"] += budge
        genres.extend(["work-out","happy","funk"])
        
    else:
        params["valance"] += budge
        params["acusticness"] += budge
        params["loudness"] -= budge
        params["tempo"] -= budge
        params["instrumentalness"] += budge
        params["dancebility"] -= budge
        genres.extend(["sleep","chill","jazz","piano"])
    
    for key in params:
        if params[key] > 1:
            params[key] = 1
        elif params[key] < 0:
            params[key] = 0  
            
    # generate 4 random genres  
    genre = []
    for i in range(4):
        genre.append(random.choice(genres))
    
    
    return [params, genre]


# generates the URI for the spotify recommendation list
def getRecommendationURI(genre:list, loudness:float, tempo:float, dancebility:float, valence:float, acusticness:float, instrumentalness:float) -> str:
    baseURI = "https://api.spotify.com/v1/recommendations?limit=50&market=DK&"
    # Add genre
    baseURI  += "seed_genres="+genre[0]
    for g in genre[1:]: # [1:] means from index 1 to the end of the list 
        baseURI += ","+g
    
    # Add loudness
    baseURI += "&target_loudness="+str(loudness)
    # Add tempo
    baseURI += "&target_tempo="+str(tempo)
    # Add dancebility
    baseURI += "&target_danceability="+str(dancebility)
    # Add valence
    baseURI += "&target_valence="+str(valence)
    # Add acusticness
    baseURI += "&target_acousticness="+str(acusticness)
    # Add instrumentalness
    baseURI += "&target_instrumentalness="+str(instrumentalness)
    return baseURI


# gets the spotify recommendation list
def getSongRecommendation(bestMoood:str,token: str)-> dict:
    headers = {
        "Authorization": "Bearer " + token
    }
    req = requests.get(getRecommendationURI(["rock","pop","jazz"], 0.5, 0.5, 0.5, 0.5, 0.5, 0.5), headers=headers)
    return req.json()


