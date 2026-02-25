import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchCountryByCode, fetchAllCountries } from "../api/countries"

function CountryDetail() {
  const { code } = useParams()
  const navigate = useNavigate()

  // Fetch selected country
  const {
    data: countryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["country", code],
    queryFn: () => fetchCountryByCode(code),
  })

  // Get all countries (for borders lookup — will use cache if already fetched)
  const { data: allCountries = [] } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
  })

  if (isLoading) {
    return (
      <div className="p-10 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
        Loading country...
      </div>
    )
  }

  if (error || !countryData?.length) {
    return (
      <div className="p-10 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
        Something went wrong.
      </div>
    )
  }

  const country = countryData[0]

  const {
    name,
    population,
    region,
    subregion,
    capital,
    flags,
    borders,
  } = country

  const borderCountries =
    borders?.map((borderCode) =>
      allCountries.find((c) => c.cca3 === borderCode)
    ).filter(Boolean) || []

  return (
    <div className="p-10 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-300">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-10 px-6 py-2 bg-white dark:bg-gray-700 shadow-md rounded-md hover:scale-105 transition"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Flag */}
        <img
          src={flags.svg}
          alt={name.common}
          className="w-full rounded-md shadow-md"
        />

        {/* Country Info */}
        <div>
          <h1 className="text-3xl font-bold mb-6">
            {name.common}
          </h1>

          <div className="space-y-2">
            <p><strong>Official Name:</strong> {name.official}</p>
            <p><strong>Population:</strong> {population.toLocaleString()}</p>
            <p><strong>Region:</strong> {region}</p>
            <p><strong>Subregion:</strong> {subregion}</p>
            <p><strong>Capital:</strong> {capital?.[0] || "N/A"}</p>
          </div>

          {/* Border Countries */}
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Border Countries:</h3>

            {borderCountries.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {borderCountries.map((border) => (
                  <button
                    key={border.cca3}
                    onClick={() => navigate(`/country/${border.cca3}`)}
                    className="px-4 py-2 bg-white dark:bg-gray-700 shadow rounded-md hover:scale-105 transition"
                  >
                    {border.name.common}
                  </button>
                ))}
              </div>
            ) : (
              <p>No border countries</p>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default CountryDetail