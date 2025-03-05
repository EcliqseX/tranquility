const clientId = "YOUR_SPOTIFY_CLIENT_ID";  // Replace with your Spotify API Client ID
const redirectUri = window.location.origin;  // Redirects back to the same page
let accessToken = "";

// Function to handle Spotify Authentication
function authenticateSpotify() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=user-read-playback-state%20user-modify-playback-state`;
    window.location.href = authUrl;
}

// Function to get the access token from the URL after authentication
function getAccessTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    accessToken = params.get("access_token");

    if (accessToken) {
        document.getElementById("spotifyStatus").textContent = "Connected to Spotify!";
        window.history.pushState({}, document.title, window.location.pathname); // Remove token from URL
    }
}

// Function to play a Spotify playlist
function playSpotifyPlaylist() {
    const playlistUrl = document.getElementById("playlistInput").value;
    const playlistId = playlistUrl.split("/playlist/")[1]?.split("?")[0];  // Extract Playlist ID

    if (!playlistId) {
        alert("Please enter a valid Spotify playlist URL.");
        return;
    }

    // Embed the Spotify Player
    document.getElementById("spotifyPlayer").innerHTML = `
        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/${playlistId}" 
            width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media">
        </iframe>
    `;
}

// Run this function on page load to check if the user is authenticated
getAccessTokenFromUrl();
