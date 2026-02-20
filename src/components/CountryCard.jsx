import { Link } from "react-router-dom"

function CountryCard({ country }) {
  return (
    <Link
      to={`/country/${country.cca3}`}
      className="bg-white dark:bg-gray-800 dark:text-white shadow-md shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform"
    >
      <img
        src={country.flags?.png}
        alt={country.name.common}
        className="w-full h-40 object-cover"
      />

      <div className="p-5">
        <h2 className="font-bold text-lg mb-3">
          {country.name.common}
        </h2>

        <p className="text-sm">
          <span className="font-semibold">Population:</span>{" "}
          {country.population.toLocaleString()}
        </p>

        <p className="text-sm">
          <span className="font-semibold">Region:</span>{" "}
          {country.region}
        </p>

        <p className="text-sm">
          <span className="font-semibold">Capital:</span>{" "}
          {country.capital?.[0]}
        </p>
      </div>
    </Link>
  )
}

export default CountryCard
