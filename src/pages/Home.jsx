import { useQuery } from "@tanstack/react-query"
import { fetchAllCountries } from "../api/countries"

function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
  })

  console.log(data)

  if (isLoading) {
    return <div className="p-10">Loading countries...</div>
  }

  if (error) {
    return <div className="p-10">Something went wrong.</div>
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Countries</h1>

      <ul className="space-y-2">
        {data.map((country) => (
          <li key={country.cca3}>
            {country.name.common}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
