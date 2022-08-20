use std::collections::HashMap;
use wasm_bindgen::prelude::*;

use crate::model::{Node, Service, DockerCompose};

//  Deserializes the nodes and converts it into a vector of strings
fn parse_nodes(data: &String) -> Vec<Node> {
    let nodes: Vec<Node> = serde_json::from_str(data).unwrap();
    return nodes;
}

// Collects the nodes and serializes it into the docker-compose yaml
fn generate_dockercompose_yml(nodes: Vec<Node>) -> DockerCompose {
    let mut service_map: HashMap<String, Service> = HashMap::new();
    for node in nodes {
        service_map.insert(
            node.data.label.clone(),
            Service {
                image: node.id.clone(),
                ports: vec![String::from("9000:9000")],
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
pub fn print_string(data: String) -> String {
    let nodes: Vec<Node> = parse_nodes(&data);
    let docker_compose_obj = generate_dockercompose_yml(nodes);
    let output_string = serde_yaml::to_string(&docker_compose_obj).unwrap();

    return output_string;
}

#[cfg(test)]
mod tests {
    use std::collections::HashMap;
    use crate::model::{DockerCompose, NodePosition, NodeData, Node, Service};

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
                id: String::from("a"),
                data: NodeData {
                    label: String::from("Node A"),
                },
                position: NodePosition { x: 250.0, y: 25.0 },
                height: 62.0,
                width: 159.0,
                node_type: String::from("containerNode"),
            },
            Node {
                id: String::from("b"),
                data: NodeData {
                    label: String::from("Node B"),
                },
                position: NodePosition { x: 300.0, y: 25.0 },
                height: 62.0,
                width: 159.0,
                node_type: String::from("containerNode"),
            },
        ];
        let mut services = HashMap::new();
        for node in nodes.clone(){
            services.insert(node.data.label, Service {
                image: node.id,
                ports: vec![String::from("9000:9000")]
            });
        }
        let expected_yml = DockerCompose {
            version: String::from("3.9"),
            services: services,
        };
        
        assert_eq!(expected_yml, super::generate_dockercompose_yml(nodes));
        
    }
}