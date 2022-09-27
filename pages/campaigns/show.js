import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

import manager from "../../assets/manager.png";
import minContribution from "../../assets/minContribution.jpg";
import requests from "../../assets/requests.png";
import approvers from "../../assets/approvers.png";
import ethIcon from "../../assets/ethIcon.png";

const CampaignShow = (props) => {
  console.log(manager.src);
  const manager_src = manager.src;
  const contribution = minContribution.src;
  const request = requests.src;
  const approver = approvers.src;
  const eth = ethIcon.src;
  const campaignsToCard = () => {
    const {
      // destructuring props
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = props;
    const items = [
      {
        image: {
          size: "mini",
          src: manager_src,
        },
        color: "blue",
        header: manager,
        meta: "Address of manager",
        description:
          "The manager created this campaign and can make request to widthdraw money",
        style: { overflowWrap: "break-word", backgroundImage: "center" },
      },
      {
        image: {
          src: contribution,
          size: "mini",
        },
        color: "red",
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute atleast this much wei to be an approver",
      },
      {
        image: {
          size: "mini",
          src: request,
        },
        color: "yellow",
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to widthdraw money from contract. Requests must be approved by approvers",
      },
      {
        image: {
          size: "mini",
          src: approver,
        },
        color: "orange",
        header: approversCount,
        meta: "Number of approvers",
        description:
          "Number of people who have already donated for this compaign",
      },
      {
        image: {
          size: "mini",
          src: eth,
        },
        color: "green",
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance shows how much money this campaign has left to spend",
      },
    ];

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Showing a campaign</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{campaignsToCard()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps(props) {
  console.log(props.query.address);
  const campaign = Campaign(props.query.address);

  const summary = await campaign.methods.getSummary().call();
  /*
  this returns a result obj => Result {
  '0': '1',
  '1': '0',
  '2': '0',
  '3': '0',
  '4': '0x60b7909712B4915f41d4569378e120a58B081f96'
}
  */
  // console.log(summary);

  return {
    props: {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
}

export default CampaignShow;
