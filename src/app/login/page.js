export default async function() {
	return (
		<a href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=user-read-private%20user-read-email&redirect_uri=${process.env.CALLBACK_URI}&show_dialog=true`}>Log in with Spotify</a>
	)
}
