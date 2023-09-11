
from flask import Flask, render_template, request, jsonify, redirect
import requests
import app.util as util
 

API_KEY = "8532bf33a86747305821dfbd9c8184fc"

# get the link weather data from the API at returns the 5 day weather
def get_link_5day(lat: int, lon: int) -> str:
    return f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid="+API_KEY

# get the link weather data from the API at returns the current weather
def get_link_now(lat: int, lon: int) -> str:
    return f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid="+API_KEY
 

app = Flask(__name__)


# Head route and return the only page
@app.route("/")
def index() -> dict:
    return render_template(template_name_or_list="index.html", title="Weather App 🔥🔥",client_id="da3f7dfb4bfa445698546301ae1e8346")


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
    pass

# add a route for the add playlist
@app.route("/addPlaylist")
def add_playlist() -> dict:
    pass

# route for the login popup
@app.route("/loginpopup")
def test() -> dict:
    return render_template("popup.html")

