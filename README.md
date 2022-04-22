# Superfluid visualization

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Graph and Leaderboard can be seen in `/visualize`

## Deployed instance
https://vibrant-yonath-e995e3.netlify.app/visualize

## Add names to node Address:
To add names to node: Add entry in `component/namedAdd.js`

Example entry
```
const namedAddress = {
  "0x98d463a3f29f259e67176482eb15107f364c7e18" : "vitalik.eth",
  "0x9d7894ed2ddb65e0ca36fe872cbb57b8e9aaddac": "ananya.eth"
}
```
## Query:
Query is defined in `components/visualize.js` and token address is hardcoded there.
Visualize function under components/visualize.js has [pollInterval](https://www.apollographql.com/docs/react/api/react/hoc/#optionspollinterval), which can be set accordingly for when to refetch query results. 

## Node colors:
Node colors are taken randomly from a set of colors defined in `components/nodeAndLinkData.js`

## Leader board:
Both inflow and outflow are sorted by amount in `components/leaderboard.js`

## Graph setting:
Graph is set in `components/graph.js`