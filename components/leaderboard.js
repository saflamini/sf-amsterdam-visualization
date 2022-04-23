function smallAddress(address) {
  const addBegin = address.substring(0, 6);
  const addEnd = address.substring(address.length - 4, address.length);
  return `${addBegin}...${addEnd}`;
}

export const formatFlowRateToDaily = (flowRate) => {
  const numFlowRate = Number(flowRate) / 10 ** 18;
  return (numFlowRate * 60 * 60 * 24).toFixed(3) + "/day";
};

//NOTE: need to query something else other than data.nodes for this
function leaderBoard(data) {
  return (
    <div className="leaderboard">
    <div>
      <img alt="sf-logo" className="w-96" src="superfluid-logo.jpg"></img>
    </div>
    <div className="col-span-2 p-8 max-h-screen">
      <div className="py-2 pt-6 text-3xl font-semibold text-white">
        🔝 Leaderboard
      </div>
      <div className="pt-6 pb-2 text-xl font-semibold text-white">
        🤝 Outflow
      </div>
      <div className="scrollable-container">
        {data.nodes
          .sort((a, b) => b.totalOutflowRate - a.totalOutflowRate)
          .map((node, index) => {
            if (node.totalOutflowRate > 0) {
              return (
                <div className="grid grid-cols-2 pr-5 font-mono" key={node.id}>
                  <div className="text-white font-medium">
                    - {node.name ? node.name : smallAddress(node.id)}
                  </div>
                  <div className="text-right text-white pr-20 mr-20">
                    {formatFlowRateToDaily(node.totalOutflowRate)}
                  </div>
                </div>
              );
            }
          })
          .slice(0, 10)}
      </div>
      </div>
    </div>
  );
}

export default leaderBoard;
