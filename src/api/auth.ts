const clientID = 'client id';
const code = undefined;

const redirectToAuth = async(clientId: string) => {
  // redirects the user to authentication page
  const verifier = generateCodeVerifier()

}

const getAccessToken = async(clientId: string, code: string) => {
  // gets an access token

}

const fetchProfile = async(token: string): Promise<any> => {
  // call web api to fetch profile data

}

 const authenticateUser = async() => {
  if(!code) {
    redirectToAuth(clientID);
  } else {
    const accessToken = await getAccessToken(clientID, code);

    console.log(accessToken);

    const profile = await fetchProfile(accessToken);

    console.log(profile);

  }
 }

 export default authenticateUser;