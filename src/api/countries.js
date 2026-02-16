import localData from "../../../data.json"

const BASE_URL = "https://restcountries.com/v3.1"

export const fetchAllCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all?fields=name,cca3,population,region,capital`)

    if (!response.ok) {
      throw new Error("API failed")
    }

    return await response.json()

  } catch (error) {
    console.warn("Using local fallback data")
    return localData
  }
}

export const fetchCountryByCode = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`)

    if (!response.ok) {
      throw new Error("API failed")
    }

    return await response.json()

  } catch (error) {
    console.warn("Using local fallback data")
    return localData.filter(country => country.cca3 === code)
  }
}
