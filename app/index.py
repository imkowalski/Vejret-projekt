from flask import Flask, render_template, request, jsonify, redirect, make_response, session
from flask_cors import CORS
import requests
import util as util
import datetime


API_KEY = "8532bf33a86747305821dfbd9c8184fc"
# get the link weather data from the API at returns the 5 day weather


def get_link_5day(lat: int, lon: int) -> str:
    return f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid="+API_KEY


# get the link weather data from the API at returns the current weather
def get_link_now(lat: int, lon: int) -> str:
    return f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid="+API_KEY


# create the flask app
app = Flask(__name__, static_folder="static", template_folder="templates")
app.secret_key = 'SECRET_KEY'
CORS(app)


# Head route and return the only page
@app.route("/")
def index() -> dict:
    return render_template(template_name_or_list="index.html", title="WinterBliss", client_id="da3f7dfb4bfa445698546301ae1e8346")


# add a route for the 5 day weather
@app.route("/weather/forcast")
def get() -> dict:
    # get the weather data from the api
    res = requests.get(get_link_5day(request.args["lat"], request.args["lon"]))
    data = res.json()
    return jsonify(data["list"])


# add a route for the current weather
# get the weather data from the API and convert it to JSON
# get the weather data from the API at returns the current weather
@app.route("/weather/now")
def get_now() -> dict:
    res = requests.get(get_link_now(request.args["lat"], request.args["lon"]))
    data = res.json()
    session["weather"] = data
    return jsonify(data)
 

# add a route for the get playlist
@app.route("/getSongs")
def get_playlist() -> dict:
    # setups the headers for the request
    token = request.cookies.get("token")
    headers = {
        "Authorization": "Bearer " + token
    }
    weather = session["weather"]

    # Get parameters from the weather and generates inputs to spotify recommendation list
    getParams = util.findParameters(weather["main"]["temp"], weather["clouds"]["all"],
                                    weather["wind"]["speed"], util.isRainingCheck(str(weather["weather"][0]["id"])))
   
    # Gets songs from the spotify recommendation list
    songs = requests.get(util.getRecommendationURI(
        getParams[1], getParams[0]["loudness"], getParams[0]["tempo"], getParams[0]["dancebility"], getParams[0]["valance"], getParams[0]["acusticness"], getParams[0]["instrumentalness"]),
        headers=headers).json()
    session["songURIs"] = [song["uri"] for song in songs["tracks"]]
    return jsonify({"status": 201, "message": " A Ok", "songs": songs})



# add a route for the add playlist
@app.route("/addPlaylist", methods=["GET"])
def add_playlist() -> dict:
    
    # checks if user is logged in
    if request.cookies.get("token") == None:
        return {"status": 401, "error": "not logged in"}

    # setups the headers for the request
    headers = {
        "Authorization": "Bearer " + request.cookies.get("token"),
    }
    # gets user id
    mereq = requests.get("https://api.spotify.com/v1/me",
                         headers=headers)
    me = mereq.json()

    # skeleton for the playlist
    data = {
        "name": f'{str(datetime.date.today())}',
        "description": "WinterBliss Generated Playlist based on the weather",
        "public": False
    }
    
    # makes the playlist on spotify and returns a link to the playlist
    req = requests.post("https://api.spotify.com/v1/users/" +
                        me["id"]+"/playlists", headers=headers, json=data)
    playlist = req.json()
    tracksURI = playlist["tracks"]["href"]
    reqs = requests.post(tracksURI, headers=headers, json={
                         "uris": session["songURIs"]})

    return jsonify(playlist)


# route for the login popup
@app.route("/loginpopup")
def test() -> dict:
    return render_template(template_name_or_list="popup.html", title="WinterBliss")
