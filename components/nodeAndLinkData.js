import namedAddress from "./namedAdd";
// import { Framework } from "@superfluid-finance/sdk-core";
// import { ethers } from "@ethers";

function ConstructNodeAndLinkData(data) {
  var nodes = [];
  var links = [];
  let mutableAccountTokenSnapshots = [...data.accountTokenSnapshots];

  const topTenOutflowAcountIds = mutableAccountTokenSnapshots
    .sort((a, b) =>
      Number(a.totalOutflowRate) > Number(b.totalOutflowRate) ? -1 : 1
    )
    .map(x => x.account.id)
    .slice(0, 10);

  let positiveOutflows = [];
  data.accountTokenSnapshots.forEach(({ account, totalOutflowRate }) => {
    var node = {
      id: account.id,
      name: namedAddress[account.id],
      nodeRelSize: Math.log(totalOutflowRate), // dividing to make it smaller
      color: topTenOutflowAcountIds.includes(account.id)
        ? "rgb(255, 255, 255)"
        : "rgb(86, 184, 73)",
      totalOutflowRate: totalOutflowRate,
      totalInflowRate: 0,
    };
    let nodeExists = nodes.findIndex((n) => n.id === node.id);
    if(node.totalOutflowRate > 0) {
      positiveOutflows.push(node);
    }
    if (nodeExists === -1) {
      nodes.push(node);
    }
    account.outflows.forEach(({ receiver }) => {
      console.log(positiveOutflows)
      // if node present in nodes, fetch it, else create a new node
      var nodeIndex = nodes.findIndex((n) => n.id === receiver.id);
      
      // let nodeExists = nodes.findIndex((n) => n.id === node.id)
      console.log(receiver)
      if (nodeIndex === -1) {
        nodes.push({
          id: receiver.id,
          name: namedAddress[receiver.id],
          nodeRelSize: 6.9,
          color: "rgb(86, 184, 73)",
          totalOutflowRate: 0,
          totalInflowRate: totalOutflowRate / account.outflows.length,
        });
        nodes[nodes.length - 1].totalOutflowRate = account.totalOutflowRate;
        let newNodeIndex = nodes.findIndex((n) => n.id === receiver.id);
      } else {
        nodes[nodeIndex].totalInflowRate +=
          totalOutflowRate / account.outflows.length;
      }
      var link = {
        source: account.id,
        target: receiver.id,
        curvature: 0,
        rotation: 0,
      };
      links.push(link);
    });
  });
  console.log(nodes.length)
  function setOutFlows() {
    for (let i = 0; i < nodes.length; i++) {
      console.log(nodes[i])
      for (let j = 0; j < positiveOutflows.length; j++) {
        console.log(nodes[i])
        if (nodes[i].id === positiveOutflows[j].id) {
          nodes[i].totalOutflowRate = positiveOutflows[j].totalOutflowRate
        }
      }
    }
  }

  setOutFlows();

  return { nodes, links };
}

export default ConstructNodeAndLinkData;
