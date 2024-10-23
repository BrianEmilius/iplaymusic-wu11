"use client"

import { useEffect, useState } from "react"
import getClientSideCookie from "./get-cookie"

export default function useFetch(endpoint) {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState(null)

	async function checkToken() {
		try {
			const response = await fetch("/api/refresh-token")
			const json = await response.json()
			return json.access_token
		} catch (error) {
			
		}
	}

	async function doFetch(endpoint) {
		const token = await checkToken()
		try {
			const response = await fetch(endpoint, {
				headers: {
					Authorization: "Bearer " + token
				}
			})
			setData(await response.json())
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(function() {
		doFetch(endpoint)
	}, [])

	return {
		error, loading, data
	}
}