import { React, Component } from "react";
import { Table, Button } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

const RequestIndex = (props) => {
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRow = () => {
    return props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={props.address}
          approversCount={props.approversCount}
        />
      );
    });
  };

  return (
    <Layout>
      <Link route={`/campaigns/${props.address}`}>
        <a>
          <Button basic color="green">
            Back
          </Button>
        </a>
      </Link>
      <h3>Requests index</h3>
      <Link route={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: "10px" }}>
            Add request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>

        <Body>{renderRow()}</Body>
      </Table>
      <div>Found {props.requestCount} requests</div>
    </Layout>
  );
};

export async function getServerSideProps(props) {
  const { address } = props.query;
  const campaign = Campaign(address);

  const approversCount = await campaign.methods.approversCount().call();
  const requestCount = await campaign.methods.getRequestCount().call();
  // we need to get all requests made to show in index
  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  // this method calls campaign.methods.requests(i).call() 'n'-requestCount times and fills the array

  const sanitizedRequests = requests.map(
    ({ description, value, recipient, completed, approvalCount }) => {
      return { description, value, recipient, completed, approvalCount };
    }
  );

  console.log(sanitizedRequests);

  return {
    props: {
      approversCount,
      address,
      requests: sanitizedRequests,
      requestCount,
    },
  };
}

export default RequestIndex;
