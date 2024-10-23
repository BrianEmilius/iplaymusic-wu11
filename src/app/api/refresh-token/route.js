import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
	const cookieStore = await cookies()

	const access_token = cookieStore.get("ipm_token")
	const refresh_token = cookieStore.get("ipm_rftoken")

	if (access_token) return NextResponse.json({access_token})

	try {
		const response = await fetch("", {
			method: "POST",
			body: new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token
			}),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": `Basic ${new Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64")}`
			}
		})
		const json = await response.json()
		cookieStore.set("ipm_token", json.access_token, { maxAge: 3600 })

		return NextResponse.json({ access_token: json.access_token })
		
	} catch (error) {
		return NextResponse.json({error})
	}
}
