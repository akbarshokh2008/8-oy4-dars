import { FormEvent, useRef, useState } from "react";
import { Waves, Wind } from "lucide-react";
import "./App.css";
interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface WeatherData {
  coord: { lon: number; lat: number };
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

function App() {
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const searchValue = searchRef.current?.value;

    if (!searchValue) {
      alert("Iltimos, biror mamlakat nomini kiriting!");
      return;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchRef.current?.value}&appid=1fba390a944ecedecebb543d59309510`
    )
      .then((response) => {
        if (!response.ok) {
          return alert("Bunday joy topilmadi!")
        }
        return response.json();
      })
      .then((data: WeatherData) => {
        console.log(data);
        setWeather([data]);
  formRef.current?.reset();

      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <div>
      <form
        ref={formRef}
        className="w-1/4 mx-auto mt-10 flex flex-col text-center "
        onSubmit={handleSubmit}
      >
        <h1 className="text-white font-bold text-5xl pb-4">Country name</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter country name..."
            className="outline-none p-2 border-2 border-blue-400 rounded-md w-full"
            ref={searchRef}
          />
          <button type="submit" className="bg-blue-500 text-white rounded-2xl p-2 w-28 ">
            Topish
          </button>
        </div>
      </form>
      <div className="wrapper mt-16  flex justify-center items-center">
        {weather.length > 0 &&
          weather.map((value, index) => {
            return (
              <div className="w-full max-w-sm bg-gradient-to-b mt-16  from-sky-300 to-sky-500 p-6 text-white rounded-xl relative" key={index}>
                <div className="flex flex-col items-center space-y-4 ">
                  <div className="absolute top-[-80px] bg-[#62C8F7]  rounded-full ">
                    <img
                      src={` https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`}
                      alt="weather icon"
                      width={150}
                    />
                  </div>
                  <div className="text-center  text-6xl pt-16">
                    {value?.main?.temp
                      ? `${Math.round(value.main.temp - 273.15)}°C`
                      : "Loading..."}{" "}
                    <div className="mt-2 text-2xl">
                      {value.name}, {value.sys.country}
                    </div>
                  </div>

                  <div className="mt-6 flex w-full justify-between text-sm pb-6">
                    <div className="flex items-center gap-2">
                      <Waves className="h-10 w-10" />
                      <div>
                        <div className="font-medium text-xl">
                          {value.main.humidity}%
                        </div>
                        <div className=" opacity-85 text-xl">Humidity</div>
                      </div>
                    </div>{" "}
                    <div className="flex items-center gap-2">
                      <Wind className="h-10 w-10" />
                      <div>
                        <div className="font-medium text-xl">
                          {value.wind.speed} km/h
                        </div>
                        <div className="text-xl opacity-85">Wind Speed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
