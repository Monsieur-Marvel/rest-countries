import { useQuery } from "@tanstack/react-query"
import { fetchAllCountries } from "../api/countries"
import CountryCard from "../components/CountryCard"
import { useState } from "react"
import SkeletonCard from "../components/SkeletonCards"
import { useFilterStore } from "../store/useFilterStore"

function Home() {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
  })

  const { search, region, setSearch, setRegion } = useFilterStore()

  const [showSuggestions, setShowSuggestions] = useState(false)

  // First filter by region
const regionFiltered = region
  ? data.filter((country) => country.region === region)
  : data

// Search on the region-filtered data
const filteredCountries = regionFiltered.filter((country) =>
  country.name.common
    .toLowerCase()
    .includes(search.toLowerCase())
)

  const suggestions =
  search.length > 0
    ? regionFiltered
        .filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .slice(0, 10)
    : []

  if (isLoading) {
    return (
      <div className="p-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-10 text-red-500 dark:text-red-400">
        Something went wrong.
      </div>
    )
  }

  return (
    <div className="p-10 pb-20">
      
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search for a country..."
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
            className="pl-10 p-3 rounded-md shadow-md w-full
                       bg-white dark:bg-gray-800
                       text-gray-900 dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition"
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute w-full mt-1 rounded-md shadow-lg z-10
                           bg-white dark:bg-gray-800
                           text-gray-900 dark:text-white
                           max-h-60 overflow-y-auto">
              {suggestions.map((country) => (
                <li
                  key={country.cca3}
                  onMouseDown={() => {
                    setSearch(country.name.common)
                    setShowSuggestions(false)
                  }}
                  className="p-3 cursor-pointer
                             hover:bg-gray-100 dark:hover:bg-gray-700
                             transition"
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
          className="p-3 rounded-md shadow-md w-full sm:w-60
                     bg-white dark:bg-gray-800
                     text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition"
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>

      </div>

      {/* Countries Grid */}
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