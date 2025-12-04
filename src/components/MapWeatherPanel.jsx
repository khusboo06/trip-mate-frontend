
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const BACKEND = import.meta.env.VITE_BACKEND_URL;


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ✅ Haversine distance calculation
function haversine([lat1, lon1], [lat2, lon2]) {
  const R = 6371;
  const toRad = (v) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 10, { animate: true });
  }, [position]);
  return null;
}

export default function MapWeatherPanel() {
  const [source, setSource] = useState("");
  const [dest, setDest] = useState("");
  const [sourceCoords, setSourceCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);
  const [etaMinutes, setEtaMinutes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  // 🔍 City geocoding via backend
  const geocodeCity = async (city) => {
    const res = await axios.get(
      `${BACKEND}/api/weather/quick?location=${encodeURIComponent(city)}`
    );
    if (!res.data.coord) throw new Error("City not found");
    const { lat, lon } = res.data.coord;
    return [lat, lon];
  };

  const handleRouteSearch = async (e) => {
    e.preventDefault();
    if (!source || !dest)
      return alert("Please enter both source and destination");
    try {
      setLoading(true);
      setError(null);
      const src = await geocodeCity(source);
      const dst = await geocodeCity(dest);
      setSourceCoords(src);
      setDestCoords(dst);
      const d = haversine(src, dst);
      setDistanceKm(d);
      setEtaMinutes(Math.round((d / 50) * 60));
    } catch {
      setError("Failed to find route. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearRoute = () => {
    setSourceCoords(null);
    setDestCoords(null);
    setDistanceKm(null);
    setEtaMinutes(null);
    setError(null);
    if (mapRef.current) mapRef.current.setView([20.5937, 78.9629], 5);
  };

  const copyRouteLink = () => {
    if (!sourceCoords || !destCoords)
      return alert("Search route first!");
    const link = `https://www.google.com/maps/dir/?api=1&origin=${sourceCoords[0]},${sourceCoords[1]}&destination=${destCoords[0]},${destCoords[1]}&travelmode=driving`;
    navigator.clipboard.writeText(link);
    alert("✅ Google Maps route link copied!");
  };

  // 🌤 Weather Section
  const [weatherCity, setWeatherCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  const handleWeatherCheck = async (e) => {
    e.preventDefault();
    if (!weatherCity.trim()) return;
    try {
      setWeatherLoading(true);
      const res = await axios.get(
        `${BACKEND}/api/weather/quick?location=${encodeURIComponent(
          weatherCity
        )}`
      );
      setWeatherData(res.data);
    } catch {
      alert("City not found or weather unavailable.");
    } finally {
      setWeatherLoading(false);
    }
  };

  const safeIcon = (w) =>
    w?.icon
      ? w.icon
      : w?.weather?.[0]?.icon
      ? `https://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`
      : null;

  const tempValue =
    weatherData &&
    (weatherData.temp ?? weatherData.main?.temp ?? weatherData.current?.temp);

  const descriptionValue =
    weatherData &&
    (weatherData.description ??
      weatherData.weather?.[0]?.description ??
      weatherData.current?.weather?.[0]?.description);

  const windSpeedValue =
    weatherData &&
    (weatherData.wind?.speed ??
      weatherData.windSpeed ??
      weatherData.wind_speed ??
      weatherData.current?.wind_speed);

  const humidityValue =
    weatherData &&
    (weatherData.main?.humidity ??
      weatherData.humidity ??
      weatherData.current?.humidity);

  const feelsLikeValue =
    weatherData &&
    (weatherData.main?.feels_like ??
      weatherData.feels_like ??
      weatherData.feelsLike ??
      weatherData.current?.feels_like);

  
  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
      {/* 🗺 LEFT SIDE - Route Planner */}
      <div className="lg:w-2/3 space-y-6">
        <h2 className="text-2xl font-bold text-[#d4af37] text-center font-['Playfair_Display']">
          🗺 Route Planner
        </h2>

        <form
          onSubmit={handleRouteSearch}
          className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3"
        >
          <input
            type="text"
            placeholder="Enter Source City"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full sm:w-auto bg-[#1e293b]/80 border border-[#d4af37]/30 rounded-lg px-4 py-2 text-[#f9f7e8] placeholder-[#f9f7e8]/40 focus:ring-2 focus:ring-[#d4af37]/60 outline-none"
          />
          <input
            type="text"
            placeholder="Enter Destination City"
            value={dest}
            onChange={(e) => setDest(e.target.value)}
            className="w-full sm:w-auto bg-[#1e293b]/80 border border-[#d4af37]/30 rounded-lg px-4 py-2 text-[#f9f7e8] placeholder-[#f9f7e8]/40 focus:ring-2 focus:ring-[#d4af37]/60 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold px-6 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300 text-sm sm:text-base"
          >
            {loading ? "Finding..." : "Show Route"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center text-sm sm:text-base">
            {error}
          </p>
        )}

        <div className="relative h-[320px] sm:h-[380px] md:h-[420px] border border-[#d4af37]/30 rounded-xl overflow-hidden">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
            whenCreated={(m) => (mapRef.current = m)}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap"
            />
            {sourceCoords && (
              <Marker position={sourceCoords}>
                <Popup>Source</Popup>
              </Marker>
            )}
            {destCoords && (
              <Marker position={destCoords}>
                <Popup>Destination</Popup>
              </Marker>
            )}
            {sourceCoords && destCoords && (
              <Polyline positions={[sourceCoords, destCoords]} color="#d4af37" />
            )}
            {sourceCoords && <Recenter position={sourceCoords} />}
          </MapContainer>

          {sourceCoords && destCoords && (
            <button
              onClick={handleClearRoute}
              className="absolute top-4 right-4 bg-[#b8860b] text-[#0f172a] px-4 py-2 rounded-full hover:bg-[#d4af37] shadow-lg transition-all duration-300 text-sm"
            >
              🧹 Clear Route
            </button>
          )}
        </div>

        <div className="bg-[#1e293b]/70 border border-[#d4af37]/30 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 shadow-inner text-[#f9f7e8]">
          <div>
            <p className="text-xs sm:text-sm opacity-70">Distance</p>
            <p className="text-lg font-semibold text-[#d4af37]">
              {distanceKm ? `${distanceKm.toFixed(2)} km` : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm opacity-70">ETA (approx)</p>
            <p className="text-lg font-semibold text-[#d4af37]">
              {etaMinutes ? `${etaMinutes} min` : "—"}
            </p>
          </div>
          <button
            onClick={copyRouteLink}
            className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold px-5 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300 text-sm sm:text-base"
          >
            📍 Copy Route
          </button>
        </div>
      </div>

      {/* 🌤 RIGHT SIDE - Weather Checker */}
      <div className="lg:w-1/3 bg-[#1e293b]/70 border border-[#d4af37]/30 rounded-2xl p-6 text-center shadow-inner">
        <h3 className="text-2xl font-bold mb-5 text-[#d4af37] font-['Playfair_Display']">
          🌤 Live Weather
        </h3>

        <form
          onSubmit={handleWeatherCheck}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-6"
        >
          <input
            type="text"
            placeholder="Enter city name..."
            value={weatherCity}
            onChange={(e) => setWeatherCity(e.target.value)}
            className="w-full sm:w-auto bg-[#0f172a]/70 border border-[#d4af37]/30 px-4 py-2 rounded-lg text-[#f9f7e8] placeholder-[#f9f7e8]/40 focus:ring-2 focus:ring-[#d4af37]/60 outline-none"
          />
          <button
            type="submit"
            disabled={weatherLoading}
            className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold px-6 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300 text-sm sm:text-base"
          >
            {weatherLoading ? "☁ Checking..." : "☀ Check"}
          </button>
        </form>

        {weatherData && (
          <div className="bg-[#0f172a]/60 rounded-2xl border border-[#d4af37]/30 shadow-md px-6 py-5 w-full max-w-xs mx-auto">
            <h4 className="text-xl font-bold text-[#e6c85c] mb-2">
              {weatherData.name}
            </h4>
            {safeIcon(weatherData) && (
              <img
                src={safeIcon(weatherData)}
                alt="Weather"
                width={80}
                className="mx-auto my-2"
              />
            )}
            <p className="capitalize text-[#f9f7e8]/70 text-sm">
              {descriptionValue || "—"}
            </p>
            <p className="text-4xl font-extrabold text-[#d4af37] mt-3">
              🌡 {tempValue != null ? Math.round(tempValue) : "—"}°C
            </p>

            {/* bottom 3 stats with robust value resolution */}
            <div className="mt-4 space-y-1 text-xs sm:text-sm text-[#f9f7e8]/70 text-left">
              <p>💨 Wind: {windSpeedValue != null ? windSpeedValue : "—"} m/s</p>
              <p>💧 Humidity: {humidityValue != null ? humidityValue : "—"}%</p>
              <p>
                🌬 Feels like:{" "}
                {feelsLikeValue != null
                  ? feelsLikeValue.toFixed
                    ? feelsLikeValue.toFixed(1)
                    : feelsLikeValue
                  : "—"}
                °C
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
