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

  const filteredCountries = data.filter((country) =>
    country.name.common
      .toLowerCase()
      .includes(search.toLowerCase())
  )

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
      <h1 className="text-2xl mb-8 font-bold">Countries</h1>

      <div className="mb-8 relative w-full sm:w-80">
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setShowSuggestions(true)}}
           onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 150)
           }} 
           onFocus={() => {
            if (search.length > 0) setShowSuggestions(true)
           }}
        
          className="p-3 rounded-md shadow-md w-full"
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
