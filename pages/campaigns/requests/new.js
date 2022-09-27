import React, { Component, useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

const RequestNew = (props) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const campaign = Campaign(props.address);
    setLoading(true);
    setErrorMessage("");
    // console.log(props);
    try {
      console.log(web3.utils.fromWei(props.balance, "ether"), value);
      if (web3.utils.fromWei(props.balance, "ether") < value)
        setErrorMessage("Insufficient Balance");
      else {
        const accounts = await web3.eth.getAccounts();
        await campaign.methods
          .createRequest(
            description,
            web3.utils.toWei(value, "ether"),
            recipient
          )
          .send({ from: accounts[0] });

        Router.pushRoute(`/campaigns/${props.address}/requests`);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Link route={`/campaigns/${props.address}/requests`}>
        <a>
          <Button primary>Back</Button>
        </a>
      </Link>
      <h2>Create a new request !</h2>
      <Form onSubmit={onSubmitHandler} error={!!errorMessage}>
        <Form.Field>
          <label htmlFor="">Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Value in Ether</label>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading}>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

export async function getServerSideProps(props) {
  const { address } = props.query;
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();
  return {
    props: {
      address,
      balance: summary[1],
    },
  };
}

export default RequestNew;
