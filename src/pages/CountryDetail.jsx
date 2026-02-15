import { useParams } from "react-router-dom"

function CountryDetail() {
  const { code } = useParams()

  return (
    <div className="p-10 text-2xl">
      Country Detail: {code}
    </div>
  )
}

export default CountryDetail
