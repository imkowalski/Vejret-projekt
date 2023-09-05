
from flask import Flask, render_template, request, jsonify
import requests
import dotenv
import app.util as util 

API_KEY = "8532bf33a86747305821dfbd9c8184fc"

def get_link_5day(lat, lon):
    return f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid="+API_KEY

def get_link_now(lat, lon):
    return f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid="+API_KEY

app = Flask(__name__)

@app.route("/")
def index():
    return render_template(template_name_or_list="index.html")

@app.route("/weather/forcast")
def get():
    res = requests.get(get_link_5day(request.args["lat"], request.args["lon"]))
    data = res.json()
    sortedData = []
    for i, item in enumerate(data["list"]):
        if (i) % 8 == 0 and i != 0:
            sortedData.append(data["list"][i])
            
            
    return jsonify(sortedData)

@app.route("/weather/now")
def get_now():
    res = requests.get(get_link_now(request.args["lat"], request.args["lon"]))
    data = res.json()
    return jsonify(data)

@app.route("/getPlaylist")
def get_playlist():
    pass

@app.route("/addPlaylist")
def add_playlist():
    pass

@app.route("/Test")
def test():
    return {"Test": True}

