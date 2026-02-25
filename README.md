# REST Countries Explorer

A modern country explorer built with React Vite, featuring search, region filtering, dark mode, and detailed country information including border navigation.



# Features

-  Search countries by name
-  Filter by region
-  Dark mode toggle (global state)
-  Detailed country view
-  Navigate to bordering countries
-  Instant navigation using cached data
-  Global state management with Zustand
-  Server state management with React Query (TanStack Query)
-  Fully responsive UI with Tailwind CSS

---

# Tech Stack

- **React (Vite)
- **React Router DOM
- **tanstack/react query
- **Zustand
- **Tailwind CSS v3
- REST Countries API

# Architecture Overview

# Client State (Zustand)
- Theme (dark/light)
- Search filter
- Region filter

# Server State (TanStack Query)
- Country list (cached)
- Individual country data
- Automatic caching & background refetching

This separation ensures clean, scalable state management.
