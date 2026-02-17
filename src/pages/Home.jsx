import { useQuery } from "@tanstack/react-query"
import { fetchAllCountries } from "../api/countries"
import CountryCard from "../components/CountryCard"

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
  <div className="p-10 bg-gray-100 min-h-screen">
    <h1 className="text-2xl mb-8 font-bold">
      Countries
    </h1>

    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((country) => (
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
