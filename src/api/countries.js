import localData from "../../data.json"

const BASE_URL = "https://restcountries.com/v3.1"

const normalizeCountry = (country) => {
  const commonName =
    typeof country.name === "string"
      ? country.name
      : country.name?.common ||
        country.name?.official ||
        country.alpha3Code ||
        country.cca3 ||
        "Unknown"

  return {
    ...country,

    name: {
      ...(typeof country.name === "object" ? country.name : {}),
      common: commonName,
      official:
        country.name?.official || commonName,
    },

    cca3: country.cca3 || country.alpha3Code,

    capital: Array.isArray(country.capital)
      ? country.capital
      : country.capital
        ? [country.capital]
        : [],

    flags: {
      png: country.flags?.png || country.flag || "",
      svg: country.flags?.svg || country.flag || "",
      alt: country.flags?.alt || "",
    },

    subregion: country.subregion || "",
    borders: country.borders || [],
  }
}
export const fetchAllCountries = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/all?fields=name,cca3,population,region,capital,flags,subregion,borders`
    )

    if (!response.ok) {
      throw new Error(`API failed: ${response.status}`)
    }

    const countries = await response.json()
    return countries.map(normalizeCountry)

  } catch (error) {
    console.warn("API unavailable. Using local fallback data:", error)

    return localData.map(normalizeCountry)
  }
}

export const fetchCountryByCode = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`)

    if (!response.ok) {
      throw new Error(`API failed: ${response.status}`)
    }

    const countries = await response.json()
    return countries.map(normalizeCountry)

  } catch (error) {
    console.warn("API unavailable. Using local fallback data:", error)

    return localData
      .filter(
        (country) =>
          country.alpha3Code === code ||
          country.cca3 === code
      )
      .map(normalizeCountry)
  }
}
