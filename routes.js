const routes = require("next-routes")();

// :address is wildcard
routes
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new");

module.exports = routes;

/*
PATH                                LEADS TO..

/                                   list of campaigns
/campaigns/new                      form to make new campaign
/campaigns/[address]                specific campaign details
/campaigns/[address]/requests       requests for specific campaign
/campaigns/[address]/requests/new   form to create new request


*/
