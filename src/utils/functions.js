export const getSimulatedShippingCost = () => {
  const minCost = 3000;
  const maxCost = 7000;

  const simulatedCost = Math.floor(Math.random() * (maxCost - minCost + 1)) + minCost;
  return simulatedCost;
};