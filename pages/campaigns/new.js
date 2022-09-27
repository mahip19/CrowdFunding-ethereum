import React, { Component, useState } from "react";
import Layout from "../../components/Layout";
import { Form, Button, FormField, Input, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { isLocalURL } from "next/dist/shared/lib/router/router";
import { Router } from "../../routes";

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeInputHandler = (event) => {
    setMinimumContribution(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minimumContribution)
        .send({ from: accounts[0] });

      Router.pushRoute("/");
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <h3>Create a Campaign</h3>
      <Form onSubmit={submitHandler} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum contribution</label>
          <Input
            label="WEI"
            labelPosition="right"
            type="text"
            value={minimumContribution}
            onChange={onChangeInputHandler}
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};
export default CampaignNew;
