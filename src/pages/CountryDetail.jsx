import { useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchCountryByCode } from "../api/countries"

function CountryDetail() {
  const { code } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ["country", code],
    queryFn: () => fetchCountryByCode(code),
  })

  if (isLoading) {
    return <div className="p-10">Loading Country...</div>
  }

  if (error) {
    return <div className="p-10">Something went wrong</div>
  }

  const country = data[0]

  return (
    <div className="p-10 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition">
      <Link
        to="/"
        className="inline-block mb-10 px-6 py-2 bg-white dark:bg-gray-700 dark:text-white shadow rounded-md transition-colors"
      >
        ← Back
      </Link>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-full"
        />

        <div>
          <h1 className="text-3xl font-bold mb-6">
            {country.name.common}
          </h1>

          <p><strong>Official Name:</strong> {country.name.official}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion}</p>
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
        </div>
      </div>
    </div>
  )
}

export default CountryDetail
