from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests  # <-- We need this to fetch the live data

# Initialize the app
app = FastAPI(title="AERA Hackathon API")

# CRITICAL: Allow your React frontend to talk to this Python backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for rapid hackathon dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👇 PASTE YOUR ACTUAL TOKEN INSIDE THESE QUOTES 👇
WAQI_TOKEN = "cbe1ce8e26b69d7bf3595c1a8a3855edc3b3b257"
CITY = "kolkata"

@app.get("/")
def read_root():
    return {"status": "AERA Backend is Live!", "mission": "Navigate cleaner air."}

# 🔴 UPDATED ENDPOINT: Using exact GPS coordinates for higher accuracy
@app.get("/live-aqi")
def get_live_aqi():
    try:
        # 22.5726, 88.3639 is the dense center of Kolkata
        LAT = "22.5726"
        LNG = "88.3639"
        url = f"https://api.waqi.info/feed/geo:{LAT};{LNG}/?token={WAQI_TOKEN}"
        
        response = requests.get(url).json()
        
        if response["status"] == "ok":
            aqi = response["data"]["aqi"]
            return {
                "status": "success",
                "city": "Central Kolkata",
                "live_aqi": aqi
            }
        else:
            return {"status": "error", "message": "Failed to fetch from WAQI"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# The route optimization endpoint
@app.get("/route")
def get_route(start: str = "salt_lake", end: str = "park_street", health_weight: int = 70):
    return {
        "status": "success",
        "demo_data": {
            "fastest_route": {"time_mins": 25, "avg_aqi": 180, "co2_saved_kg": 0},
            "healthiest_route": {"time_mins": 32, "avg_aqi": 95, "co2_saved_kg": 2.3, "cigarettes_avoided": 1.5}
        }
    }