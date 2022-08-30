const initialNodes = [
  {
    id: "localhost",
    type: "hostNode",
    data: { label: "Local Host" },
    position: { x: 250, y: 25 },
  },
  {
    id: "service-1",
    type: "containerNode",
    data: { label: "image-1" },
    position: { x: 400, y: 150 },
  }
];

export default initialNodes;
