import React from "react";
import { Button, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

const RequestRow = ({ id, request, address, approversCount }) => {
  const { Row, Cell } = Table;
  //   const { id, request, key, address, approversCount } = props;
  const { description, value, recipient, approvalCount, complete } = request;
  //   you must have donated for this campaign in order to pass approval
  const onApprove = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
  };

  const letsFinalize = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
  };

  const readyToFinalize = request.approvalCount > approversCount / 2;

  return (
    <Row
      disabled={request.completed}
      positive={readyToFinalize && !request.completed}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {request.completed ? null : (
          <Button color="green" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.completed ? null : (
          <Button color="teal" basic onClick={letsFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};
export default RequestRow;
