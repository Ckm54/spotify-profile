
const code = undefined;

const redirectToAuth = async (clientId: string) => {
  // redirects the user to authentication page
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:5173/callback");
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

const generateCodeVerifier = (length: number): string => {
  let text: string = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const generateCodeChallenge = async (codeVerifier: string) => {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const getAccessToken = async (clientId: string, code: string): Promise<string> => {
  // gets an access token
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:5173/callback");
  params.append("code_verifier", verifier!);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: 'POST',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  const { access_token } = await result.json();

  return access_token;
};

const fetchProfile = async (token: string): Promise<any> => {
  // call web api to fetch profile data
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return await result.json();
};

const authenticateUser = async (clientId: string) => {
  if (!code) {
    redirectToAuth(clientId);
  } else {
    const accessToken = await getAccessToken(clientId, code);

    console.log(accessToken);

    const profile = await fetchProfile(accessToken);

    console.log(profile);
  }
};

export default authenticateUser;
