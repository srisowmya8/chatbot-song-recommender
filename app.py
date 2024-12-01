from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

LAST_FM_API_KEY = "fbd771e6c34f59fbccc03bfda4b8151f"  # Replace with your Last.fm API key
LAST_FM_API_URL = "http://ws.audioscrobbler.com/2.0/"
@app.route('/')
def home():
    return render_template('index.html')

@app.route("/get-recommendations", methods=["POST"])
def get_recommendations():
    data = request.json
    user_message = data.get("message", "")

    # Mock sentiment analysis or basic logic to map mood to tags
    mood_to_tag = {
        "happy": "happy",
        "sad": "sad",
        "energetic": "rock",
        "relaxed": "chill"
    }
    mood = "happy"  # Replace with real analysis logic
    tag = mood_to_tag.get(mood, "pop")

    # Fetch songs from Last.fm
    response = requests.get(LAST_FM_API_URL, params={
        "method": "tag.gettoptracks",
        "tag": tag,
        "api_key": fbd771e6c34f59fbccc03bfda4b8151f,
        "format": "json"
    })

    if response.status_code == 200:
        tracks = response.json()["tracks"]["track"]
        recommendations = [f"{track['name']} by {track['artist']['name']}" for track in tracks[:5]]
        return jsonify({"recommendations": recommendations})
    else:
        return jsonify({"error": "Failed to fetch recommendations"}), 500

if __name__ == "__main__":
    app.run(debug=True)



# from flask import Flask, render_template

# app = Flask(__name__)

# @app.route('/')
# def home():
#     return render_template('index.html')

# if __name__ == "__main__":
#     app.run(debug=True)