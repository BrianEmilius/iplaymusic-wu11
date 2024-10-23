export default function getClientSideCookie(name) {
	const cookieValue = document.cookie
		.split('; ')
		.find((row) => row.startsWith(`${name}=`))
		?.split('=')[1]

	return cookieValue
}
