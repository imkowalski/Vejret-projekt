import requests

def isRainingCheck(icondId:str) -> bool:
    if icondId[:-1] == "09" or icondId[:-1] == "10" or icondId[:-1] == "11":
        return True
    return False



def findParameters(temp:int , wind:int, cloud:int, isRaining:bool) -> str:
    dist=[]
    for mood in moods:
        dist.append((temp-mood[0])**2 + (wind-mood[1])**2 + (cloud-mood[2])**2 + (isRaining-mood[3])**2)
    
    return moods[dist.index(min(dist))]


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


def getSongRecommendation(bestMoood:str,token: str)-> dict:
    headers = {
        "Authorization": "Bearer " + token
    }
    req = requests.get(getRecommendationURI(["rock","pop","jazz"], 0.5, 0.5, 0.5, 0.5, 0.5, 0.5), headers=headers)
    return req.json()





'''
GET https://api.spotify.com/v1/recommendations?limit=50&seed_genres=rock,pop,jazz&target_loudness=0.5&target_tempo=0.5&target_danceability=0.5&target_valence=0.5&target_acousticness=0.5&target_instrumentalness=0.5 HTTP/1.1
Host: api.spotify.com
Authorization: Bearer BQCm6UmwcZ83AnURa2olapNHlG0WwfUwH36pKMUWJ-rrgvcAd4TOq_s8B619NwxvgDUiu6x-7v_APge7YN6ey8OD9d7MFfDF4uhmAKHAYnvGk2nJgn0_BxtJdegWrbQmws-EbdoKFTC3eijbYJU5EkeUd-fLO9L01idK38dZyo2pJM5e8oUxxYZrXwIi8csl7WE4O6Ko3xYMzBm41UI6LjurT5uOP9kC5ZGvz7zs-lq7FeTpzVJ_t5mfRbiI5xsLMvlj
'''    

