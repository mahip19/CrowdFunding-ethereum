import React from "react";

import { Menu, Item, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import { Link } from "../routes";

import Logo from "../assets/logo.png";

export default () => {
  // console.log(Logo.src);
  return (
    <Menu stackable style={{ marginTop: "10px" }} color="blue" inverted>
      {/* <Link route="/">
        <a className="item">Campaigns</a>
      </Link> */}
      <Menu.Item name="Logo">
        <img src={Logo.src} />
      </Menu.Item>
      <Menu.Item header href="/">
        CrowdSource - A ethereum based crowd funding website
      </Menu.Item>
      <Menu.Menu position="right">
        {/* <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link> */}
        <Menu.Item href="/campaigns/new" color="teal">
          <Icon name="add circle"></Icon>Add Campaign
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
