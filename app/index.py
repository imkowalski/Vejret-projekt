
from flask import Flask, render_template, request, jsonify, redirect, make_response
from flask_cors import CORS, cross_origin
import requests
import app.util as util
import datetime


API_KEY = "8532bf33a86747305821dfbd9c8184fc"

# get the link weather data from the API at returns the 5 day weather


def get_link_5day(lat: int, lon: int) -> str:
    return f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid="+API_KEY

# get the link weather data from the API at returns the current weather


def get_link_now(lat: int, lon: int) -> str:
    return f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid="+API_KEY


# create the flask app
app = Flask(__name__)
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
    sortedData = []
    # Filter weather data to get only one data poit a day, ignoring the first day
    for i, item in enumerate(data["list"]):
        if (i) % 8 == 0 and i != 0:
            sortedData.append(data["list"][i])

    return jsonify(sortedData)


# add a route for the current weather
# get the weather data from the API and convert it to JSON
# get the weather data from the API at returns the current weather
@app.route("/weather/now")
def get_now() -> dict:
    res = requests.get(get_link_now(request.args["lat"], request.args["lon"]))
    data = res.json()
    return jsonify(data)


# add a route for the get playlist
@app.route("/getPlaylist")
def get_playlist() -> dict:
    token = request.cookies.get("token")

    mereq = requests.get("https://api.spotify.com/v1/me",
                         headers={"Authorization": "Bearer " + token})
    me = mereq.json()

    songs = util.getSongRecommendation(["1"], token)
    songURIs = util.getListSongs(songs)
    res = make_response(jsonify(songURIs))
    res.set_cookie("me", me["id"])

    return res


# add a route for the add playlist
@app.route("/addPlaylist", methods=["POST", "GET"])
def add_playlist() -> dict:
    headers = {
        "Authorization": "Bearer " + request.cookies.get("token"),
    }
    data = {
        "name": str(datetime.date.today()),
        "description": "WinterBliss Generated Playlist based on the weather",
        "public": False,
    }
    req = requests.post("https://api.spotify.com/v1/users/" +
                        request.cookies.get("me")+"/playlists", headers=headers, json=data)
    playlist = req.json()
    
    print(request.get_data())
    
    return req.json()

# route for the login popup


@app.route("/loginpopup")
def test() -> dict:
    return render_template("popup.html")
