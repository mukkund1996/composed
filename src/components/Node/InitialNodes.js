const initialNodes = [
  {
    id: "localhost",
    type: "hostNode",
    data: { label: "Local Host", serviceName: "localhost" },
    position: { x: 250, y: 25 },
  },
  {
    id: "service-1",
    type: "containerNode",
    data: {
      label: "image-1",
      serviceName: "service-1",
      volumes: [{
        container: "/app",
        host: ".",
      }],
    },
    position: { x: 400, y: 150 },
  },
];

export default initialNodes;
