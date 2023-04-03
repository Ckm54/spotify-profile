import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import request from "request";
import path from "path";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:8080/callback";
let FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:5173";
const port = process.env.PORT || 8080;

if (process.env.NODE_ENV !== "production") {
  REDIRECT_URI = "http://localhost:8080/callback";
  FRONTEND_URI = "http://localhost:5173";
}

const app: Express = express();

const generateRandomString = (length: number) => {
  let text: string = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const stateKey = "spotify_auth_state";

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

app.get("/login", (req: Request, res: Response) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // application requests authorization
  const scope = "user-read-private user-read-email user-follow-read user-top-read";
  //  user-read-recently-played user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public";

  const params = new URLSearchParams();
  params.append("response_type", "code");
  params.append("client_id", CLIENT_ID!);
  params.append("scope", scope);
  params.append("redirect_uri", REDIRECT_URI!);
  params.append("state", state);
  res.redirect("https://accounts.spotify.com/authorize?" + params.toString());
});

app.get("/callback", (req: Request, res: Response) => {
  // application requests refresh token and access token
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  const params = new URLSearchParams();
  params.append("error", "state_mismatch")

  if (state === null || state !== storedState) {
    res.redirect(`/#${params.toString()}`);
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        // **************************MAKE REQUESTS FROM BACKEND SIDE*************
        // var options = {
        //   url: 'https://api.spotify.com/v1/me',
        //   headers: { 'Authorization': 'Bearer ' + access_token },
        //   json: true
        // };

        // // use the access token to access the Spotify Web API
        // request.get(options, function(error, response, body) {
        //   console.log(body);
        // });

        // **************************MAKE REQUESTS FROM FRONTEND SIDE*************
        // we can pass token to the browser to make requests from there
        const params = new URLSearchParams();
        params.append("access_token", access_token);
        params.append("refresh_token", refresh_token);
        res.redirect(
          `${FRONTEND_URI}/#${params.toString()}`
        );
      } else {
        const params = new URLSearchParams();
        params.append("error", "invalid token")
        res.redirect(`/#${params.toString()}`);
      }
    });
  }
});

app.get("/refresh_token", (req: Request, res: Response) => {
  // requesting an access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    form: {
      grant_type: "refresh_token",
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({ access_token });
    }
  });
});

// all other requests return the react app so it can handle routing

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../../index.html"));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
