import React, { useState } from "react";
import Header from "./Header";
import { Button, Container, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const ContributeForm = (props) => {
  const [contribution, setContribution] = useState(""); //form value

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeInputHandler = (event) => {
    setContribution(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const campaign = Campaign(props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, "ether"),
      });
      //   passing in url of current page to reload current page
      Router.replaceRoute(`/campaigns/${props.address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={submitHandler} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="Ether"
          labelPosition="right"
          value={contribution}
          onChange={onChangeInputHandler}
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button primary loading={loading}>
        Contribute
      </Button>
    </Form>
  );
};
export default ContributeForm;
