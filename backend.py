
from flask import Flask, render_template, request, jsonify
import requests

def get_link(lat, lon):
    return f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid=8532bf33a86747305821dfbd9c8184fc"

app = Flask(__name__)

@app.route("/")
def home():
    return render_template(template_name_or_list="index.html")

@app.route("/weather")
def get():
    res = requests.get(get_link(request.args["lat"], request.args["lon"]))
    data = res.json()
    return jsonify(data)



if __name__ == "__main__":
        app.run(debug=True)
    