export const SERVER =
  process.env.NODE_ENV === "production"
    ? "https://dataserver.askriashad.com"
    : "http://127.0.0.1:8000";

export const GOOGLE_CLIENT_KEY =
  "820427377324-pdr6mi441sk559ep2h9oq59v2ch0kl9n.apps.googleusercontent.com";

export const FACEBOOK_APP_ID = "483983955781436";

export const accessConfig = state => {
  if (state.auth.isAuthenticated && state.auth.access) {
    const header = {
      headers: {
        Authorization: `Token ${state.auth.access}`
      }
    };
    return header;
  }
  return null;
};
