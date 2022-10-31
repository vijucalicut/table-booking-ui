function getManagerConfig() {
  debugger;
  let clientId = localStorage.getItem('clientId');
  let locationUrl= localStorage.getItem('locationUrl');
  let authority= localStorage.getItem('authority');
    var config = {
      authority: "https://"+authority,
      client_id: clientId,
      redirect_uri: locationUrl+"/idcallback",
      response_type: "code",
      scope: "openid profile api1",
      post_logout_redirect_uri: locationUrl+"/index.html",
    };
    var mgr = new Oidc.UserManager(config);
    return mgr;
  }

function getUserDetails() {
  debugger;
  var mgr = getManagerConfig();
  mgr.signinRedirect();
}

function processCallback() {
  debugger;
  var mgr = getManagerConfig();
  new Oidc.UserManager({ response_mode: "query" }).signinRedirectCallback().then(function () {
    getUser();
  }).catch(function (e) {
    console.error(e);
    window.location.href = "https://dev-testing-packhouse-layout.azurewebsites.net/InternalGateway";
    localStorage.clear();
  });
}

function getUser() {
  debugger;
  var mgr = getManagerConfig();
  mgr.getUser().then(function (user) {
    if (user) {
      let locationUrl= localStorage.getItem('locationUrl');
      window.location = locationUrl+"/dashboard";
      localStorage.setItem('userDetails', JSON.stringify(user));
    }
    // else {
    //   window.location.href = "https://dev-testing-packhouse-layout.azurewebsites.net/InternalGateway";
    //   localStorage.clear();
    // }
  });
}