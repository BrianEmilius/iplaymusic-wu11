import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(request) {
	const code = request.nextUrl.searchParams.get("code")
	const response = await fetch(`https://accounts.spotify.com/api/token`, {
		method: "POST",
		body: `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.CALLBACK_URI}`,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Basic " + (new Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64"))
		}
	})
	const json = await response.json()

	cookies().set("ipm_token", json.access_token, {
		maxAge: 3600
	})

	cookies().set("ipm_rftoken", json.refresh_token, {
		maxAge: 60 * 60 * 24 * 30
	})

	redirect("/")
}
