import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import factory from "../ethereum/factory";
// import "pages/index.css";
import "semantic-ui-css/semantic.min.css";

import Layout from "../components/Layout";

import { Link } from "../routes";

const CampaignIndex = (props) => {
  // console.log(props.campaigns);

  const renderCampaigns = () => {
    const items = props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>view campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Active Campaigns</h3>

        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        {renderCampaigns()}
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    props: {
      campaigns,
    },
  };
}

export default CampaignIndex;
