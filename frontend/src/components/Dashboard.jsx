import { useState, useEffect } from 'react';
import axios from 'axios';
import MapCanvas from './MapCanvas';

export default function Dashboard() {
  const [healthWeight, setHealthWeight] = useState(70); 
  const isHealthySelected = healthWeight > 50;
  
  // State to hold the live API data
  const [liveAqi, setLiveAqi] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the live data from Python when the dashboard loads
  useEffect(() => {
    const fetchLiveAqi = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/live-aqi');
        if (response.data.status === "success") {
          setLiveAqi(response.data);
        }
      } catch (error) {
        console.error("Error fetching live AQI:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveAqi();
  }, []);

  return (
    <div className="min-h-screen pt-24 bg-gray-50 flex flex-col items-center px-6 pb-10">
      
      {/* Dashboard Header */}
      <div className="w-full max-w-6xl mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Routing Console</h1>
          <p className="text-gray-500 mt-1">Analyzing hyperlocal AQI and traffic data for Kolkata.</p>
        </div>
        
        {/* 🔴 LIVE DATA BADGE IS HERE */}
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
          <div className="text-sm font-bold text-gray-700">
            {loading ? "Connecting to sensors..." : `Kolkata Live AQI: ${liveAqi?.live_aqi || 'Offline'}`}
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="w-full max-w-6xl relative z-0">
        <MapCanvas isHealthySelected={isHealthySelected} />
        
        {/* The Floating UI Panel */}
        <div className="absolute top-6 left-6 z-[1000] w-80 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Route Optimization</h2>
          
          <div className="mb-6">
            <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
              <span>Speed</span>
              <span>Health</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={healthWeight}
              onChange={(e) => setHealthWeight(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>

          {/* Dynamic Route Stats Card */}
          <div className={`p-4 rounded-xl text-white transition-colors duration-300 ${isHealthySelected ? 'bg-green-600' : 'bg-red-500'}`}>
            <h3 className="font-bold mb-2">
              {isHealthySelected ? "Planet Protector Route 🌱" : "Fastest Route ⏱️"}
            </h3>
            <ul className="text-sm space-y-1 opacity-90">
              <li><strong>Time:</strong> {isHealthySelected ? "32 mins" : "25 mins"}</li>
              {/* Also showing the live AQI dynamically in the stats! */}
              <li><strong>Route AQI:</strong> {isHealthySelected ? "95 (Filtered)" : `${liveAqi?.live_aqi || 180} (Live City Avg)`}</li>
              {isHealthySelected && (
                <>
                  <li className="pt-2 border-t border-white/20 mt-2"><strong>CO2 Saved:</strong> 2.3 kg</li>
                  <li><strong>Lungs Saved:</strong> 1.5 cigarettes</li>
                </>
              )}
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}