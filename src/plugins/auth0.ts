import { createAuth0 } from "@auth0/auth0-vue";

export default createAuth0({
    domain: "dev-fa6uz21pv41jhjn6.us.auth0.com",
    clientId: "v2vF2XwlRZiA4J8g1aLRlVzznYxGbbtZ",
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: "C2FQZ253YW9PZ25HBGLVZ25OAW93"
    }
});