use std::collections::HashMap;
use wasm_bindgen::prelude::*;

use crate::model::{DockerCompose, Edge, Node, Service, LOCALHOST_ID};

//  Deserializes the nodes and converts it into a vector of structs
fn parse_nodes(data: &String) -> Vec<Node> {
    let nodes: Vec<Node> = serde_json::from_str(data).unwrap();
    return nodes;
}

//  Deserializes the edges and converts it into a vector of structs
fn parse_edges(data: &String) -> Vec<Edge> {
    let edges: Vec<Edge> = serde_json::from_str(data).unwrap();
    return edges;
}

// Collects the nodes and serializes it into the docker-compose yaml
fn generate_dockercompose_yml(nodes: Vec<Node>, edges: Vec<Edge>) -> DockerCompose {
    let mut service_map: HashMap<String, Service> = HashMap::new();
    for node in nodes {
        if node.id == LOCALHOST_ID {
            continue;
        }

        let host_edges: Vec<&Edge> = edges
            .iter()
            .filter(|edge| node.id == edge.source || node.id == edge.target)
            .filter(|edge| edge.source == LOCALHOST_ID || edge.target == LOCALHOST_ID)
            .collect();

        let mut container_port: i32 = 9000;
        let mut host_port: i32 = 9000;
        if host_edges.len() == 1 {
            container_port = host_edges
                .first()
                .unwrap()
                .data
                .as_ref()
                .unwrap()
                .container_port
                .clone()
                .parse::<i32>()
                .unwrap();
            host_port = host_edges
                .first()
                .unwrap()
                .data
                .as_ref()
                .unwrap()
                .host_port
                .clone()
                .parse::<i32>()
                .unwrap();
        }

        service_map.insert(
            node.data.label.clone(),
            Service {
                image: node.id.clone(),
                ports: vec![String::from(format!("{}:{}", host_port, container_port))],
            },
        );
    }
    DockerCompose {
        version: String::from("3.9"),
        services: service_map,
    }
}

// Gets the string from JS client, processes and returns the desired string result
#[wasm_bindgen]
pub fn print_string(node_data: String, edge_data: String) -> String {
    let nodes: Vec<Node> = parse_nodes(&node_data);
    let edges: Vec<Edge> = parse_edges(&edge_data);
    let docker_compose_obj = generate_dockercompose_yml(nodes, edges);
    let output_string = serde_yaml::to_string(&docker_compose_obj).unwrap();

    return output_string;
}

#[cfg(test)]
mod tests {
    use crate::model::{DockerCompose, Edge, EdgeSpec, Node, NodeData, NodePosition, Service};
    use std::collections::HashMap;

    #[test]
    fn test_parse_edges() {
        let test_string = String::from("[{\"id\": \"edge1\", \"source\": \"nd1\", \"target\": \"nd2\", \"data\": {\"containerPort\": \"9000\", \"hostPort\": \"9000\"}},{\"id\": \"edge2\", \"source\": \"nd2\", \"target\": \"nd3\", \"data\": null}]");
        let expected_edges = vec![
            Edge {
                id: String::from("edge1"),
                source: String::from("nd1"),
                target: String::from("nd2"),
                data: Some(EdgeSpec {
                    container_port: String::from("9000"),
                    host_port: String::from("9000"),
                }),
            },
            Edge {
                id: String::from("edge2"),
                source: String::from("nd2"),
                target: String::from("nd3"),
                data: None,
            },
        ];
        assert_eq!(super::parse_edges(&test_string), expected_edges);
    }

    #[test]
    fn test_parse_nodes() {
        let test_string = String::from("[{\"id\":\"a\",\"nodeType\":\"containerNode\",\"data\":{\"label\":\"Node A\"},\"position\":{\"x\":250,\"y\":25},\"width\":159,\"height\":62}]");
        let expected_nodes = vec![Node {
            id: String::from("a"),
            data: NodeData {
                label: String::from("Node A"),
            },
            position: NodePosition { x: 250.0, y: 25.0 },
            height: 62.0,
            width: 159.0,
            node_type: String::from("containerNode"),
        }];
        assert_eq!(super::parse_nodes(&test_string), expected_nodes);
    }

    #[test]
    fn test_generate_dockercompose_yml() {
        let nodes = vec![
            Node {
                id: String::from("localhost"),
                data: NodeData {
                    label: String::from("host-node"),
                },
                position: NodePosition { x: 250.0, y: 25.0 },
                height: 62.0,
                width: 159.0,
                node_type: String::from("containerNode"),
            },
            Node {
                id: String::from("b"),
                data: NodeData {
                    label: String::from("node-B"),
                },
                position: NodePosition { x: 300.0, y: 25.0 },
                height: 62.0,
                width: 159.0,
                node_type: String::from("containerNode"),
            },
        ];
        let edges = vec![
            Edge {
                id: String::from("edge1"),
                source: String::from("localhost"),
                target: String::from("b"),
                data: Some(EdgeSpec {
                    container_port: String::from("9000"),
                    host_port: String::from("7000"),
                }),
            },
            Edge {
                id: String::from("edge2"),
                source: String::from("b"),
                target: String::from("nd3"),
                data: None,
            },
        ];
        let mut services = HashMap::new();
        services.insert(
            String::from("node-B"),
            Service {
                image: String::from("b"),
                ports: vec![String::from("7000:9000")],
            },
        );
        let expected_yml = DockerCompose {
            version: String::from("3.9"),
            services: services,
        };

        assert_eq!(
            expected_yml,
            super::generate_dockercompose_yml(nodes, edges)
        );
    }
}
