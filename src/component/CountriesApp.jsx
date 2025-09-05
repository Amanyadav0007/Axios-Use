import React, { useEffect, useState } from 'react'
import axios from "axios";

const CountriesApp = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState("all");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // Fetching data here...
    const fetchCountries = async () => {
        setLoading(true);
        setError(null);

        try {
            const baseUrl = "https://restcountries.com/v3.1";
            const fields = "name,capital,region,population,flags,cca3";

            const url = region === "all" ? `${baseUrl}/all?fields=${fields}` : `${baseUrl}/region/${region}?fields=${fields}`;

            const res = await axios.get(url);
            setCountries(res.data);
            console.log(res.data);

        } catch (err) {
            setError("⚠️ Failed to fetch country data. Please try again later.");
            console.error("API Error :", err);
        } finally {
            setLoading(false);
        }
    };


    // Fetching on component mount and when region changes

    useEffect(() => {
        fetchCountries();
    }, [region]);


    const filterCountries = countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className='min-h-screen bg-gray-100 p-6'>
            <h1 className='text-3xl font-bold text-center mb-6'>
                Country Explorer 🌏
            </h1>

            {/* search + region filter */}
            <div className='flex flex-col sm:flex-row justify-center gap-4 mb-8'>
                <input
                    type="text"
                    placeholder='Search country....'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full sm:w-1/3 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
                />
                <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className='w-full sm:w-1/3 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
                >
                    <option value="all">All Regions</option>
                    <option value="africa">Africa</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>
            </div>

            {/* loading spinner */}
            {loading && (
                <div className='flex justify-center items-center'>
                    <div className='w-10 h-10 border-4 border-blue-400 border-dashed rounded-full animate-spin'></div>
                    <span className='ml-3 text-blue-600 font-medium'>Loading...</span>
                </div>
            )}

            {/* error state */}
            {error && (
                <p className='text-red-500 text-center font-semibold mb-4'>{error}</p>
            )}

            {/* countries grid */}
            {!loading && !error && (
                <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {filterCountries.map((country) => (
                        <div key={country.cca3} className='bg-white rounded-2xl shadow-md p-5 flex flex-col items-center hover:shadow-lg transition'>

                            <img src={country.flags.png} alt={country.name.common} className='w-32 h-20 object-cover rounded-md mb-3' />
                            <h2 className=' text-lg font-semibold'>{country.name.common}
                            </h2>
                            <p className='text-sm text-gray-600  font-bold'>
                                ✅Capital: {country.capital?.[0] || "N/A"}
                            </p>
                            <p className='text-gray-600 text-sm font-bold'>
                                🔥Region : {country.region}
                            </p>
                            <p className='text-gray-600 text-sm  font-bold'>
                                🙎‍♂️Population : {country.population.toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default CountriesApp