import { useQuery } from "@tanstack/react-query"
import { fetchAllCountries } from "../api/countries"
import CountryCard from "../components/CountryCard"
import { useState } from "react"

function Home() {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
  })

  //console.log(data)

  const [search, setSearch] = useState("")

  const [showSuggestions, setShowSuggestions] = useState(false)

  const [region, setRegion] = useState("")

  const filteredCountries = data.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase())
    
      
    const matchesRegion = region
        ? country.region === region
        : true

    return matchesSearch && matchesRegion
})

  const suggestions =
    search.length > 0
      ? data
          .filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .slice(0, 10)
      : []

  if (isLoading) {
    return <div className="p-10">Loading countries...</div>
  }

  if (error) {
    return <div className="p-10">Something went wrong.</div>
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl mb-8 font-bold">Where in the world?</h1>

    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

  {/* Search Input */}
  <div className="relative w-full sm:w-80">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
 🔍
    </span>
    <input
      type="text"
      placeholder="Country Search..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value)
        setShowSuggestions(true)
      }}
      onBlur={() => {
        setTimeout(() => setShowSuggestions(false), 150)
      }}
      onFocus={() => {
        if (search.length > 0) setShowSuggestions(true)
      }}
      className="pl-10 p-3 rounded-md shadow-md w-full"
    />

    {showSuggestions && suggestions.length > 0 && (
      <ul className="absolute bg-white shadow-lg w-full mt-1 rounded-md z-10">
        {suggestions.map((country) => (
          <li
            key={country.cca3}
            onMouseDown={() => {
              setSearch(country.name.common)
              setShowSuggestions(false)
            }}
            className="p-3 hover:bg-gray-100 cursor-pointer"
          >
            {country.name.common}
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* Region Filter */}
  <select
    value={region}
    onChange={(e) => setRegion(e.target.value)}
    className="p-3 rounded-md shadow-md w-full sm:w-60"
  >
   <option value="">Filter by Region</option>
    <option value="Africa">Africa</option>
    <option value="Americas">Americas</option>
    <option value="Asia">Asia</option>
    <option value="Europe">Europe</option>
    <option value="Oceania">Oceania</option>
  </select>

</div>

        

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
