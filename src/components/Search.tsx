import axios from "axios";
import { useEffect, useState } from "react";

type Location = {
    name: string;
    country: string;
    localtime: string;
};

type WeatherCondition = {
    text: string;
    icon: string;
    code: number;
};

type WeatherDetails = {
    location: Location;
    current: {
        temp_c: number;
        temp_f: number;
        humidity: number;
        condition: WeatherCondition;
    };
};

export default function Search() {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const [locations, setLocations] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [weatherDetails, setWeatherDetails] = useState<WeatherDetails | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const loadLocations = async () => {
            if (searchTerm.trim() === "") {
                setLocations([]);
                return;
            }

            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchTerm}`);
                setLocations(response.data.map((location: any) => location.name));
            } catch (error) {
                console.error("Error fetching locations:", error);
                setLocations([]);
            }
        };

        loadLocations();
    }, [searchTerm, apiKey]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleLocationClick = async (location: string) => {
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
            setWeatherDetails(response.data);
            setIsModalOpen(true);
            setSearchTerm(""); // Clear search term to hide suggestions
            setLocations([]); // Clear locations to hide suggestions
        } catch (error) {
            console.error("Error fetching weather details:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setWeatherDetails(null);
    };

    return (
        <div className="flex items-center justify-center bg-purple-500 h-screen">
            <div className="relative w-full max-w-md">
                <label className="w-full flex flex-col items-center justify-center">
                    <input
                        id="search-bar"
                        placeholder="Type the location"
                        className="px-6 py-2 w-full rounded-md outline-none bg-white border border-gray-300"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                </label>

                {locations.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-2 shadow-lg max-h-60 overflow-y-auto">
                        {locations.map((location, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleLocationClick(location)}
                            >
                                {location}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {isModalOpen && weatherDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">
                            {weatherDetails.location.name}, {weatherDetails.location.country}
                        </h2>
                        <p>
                            <strong>Local Time:</strong> {weatherDetails.location.localtime}
                        </p>
                        <p>
                            <strong>Temperature:</strong> {weatherDetails.current.temp_c}°C / {weatherDetails.current.temp_f}°F
                        </p>
                        <p>
                            <strong>Humidity:</strong> {weatherDetails.current.humidity}%
                        </p>
                        <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
