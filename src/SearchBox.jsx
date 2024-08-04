import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';

export default function SearchBox({updateInfo}){
    let [city, setCity] = useState("");
    let [err, setErr] = useState(false);
    const API_URL = "http://api.openweathermap.org/data/2.5/weather"
    const API_KEY = "ae7152f76ee59c4e33c7696441af7b0e";

    let getWeatherInfo = async () =>{
        try{
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);

        let jsonResponse = await response.json();

        let result = {
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity : jsonResponse.main.humidity,
            feelslike : jsonResponse.main.feels_like,
            weather : jsonResponse.weather[0].description,
            city : city,
        };
        
        return result;
        }
        catch(err){
            throw err;
        }
        
    }

    let handleChange = (e)=>{
        setCity(e.target.value);
    }
    let handleSubmit = async (e)=>{
        try{
        e.preventDefault();
        let result = await getWeatherInfo();
        updateInfo(result);
        setCity("");
        }
        catch(err){
            setErr(true);
        }
    }
    return (
        <div className='SearchBox'>

            <form onSubmit={handleSubmit}>
                
            <TextField id="city" label="City Name" value={city} onChange={handleChange} variant="outlined" required/>
            <br /> <br />

            <Button variant="contained" type='submit' >Search</Button>

            {err && <p style={{color:"red"}}>No Such place exist</p>}
            </form>
        </div>
    )
}