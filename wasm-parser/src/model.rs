// Contains the data model definitions of the type of data received from
// the React client

use std::collections::HashMap;

use serde::{Deserialize, Serialize};

pub const LOCALHOST_ID: &str = "localhost";

#[derive(Deserialize, Serialize, Debug, PartialEq, Clone)]
#[serde(rename_all = "camelCase")]
pub struct VolumeSpec {
    pub host: String,
    pub container: String,
}

#[derive(Deserialize, Serialize, Debug, PartialEq, Clone)]
#[serde(rename_all = "camelCase")]
pub struct NodeData {
    pub label: String,
    pub service_name: String,
    pub volumes: Option<Vec<VolumeSpec>>,
}

#[derive(Deserialize, Serialize, Debug, PartialEq, Clone)]
#[serde(rename_all = "camelCase")]
pub struct NodePosition {
    pub x: f32,
    pub y: f32,
}

#[derive(Deserialize, Serialize, Debug, PartialEq, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Node {
    pub id: String,
    pub data: NodeData,
    pub height: f32,
    pub position: NodePosition,
    pub node_type: String,
    pub width: f32,
}

#[derive(Deserialize, Serialize, Debug, PartialEq, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Edge {
    pub id: String,
    pub source: String,
    pub target: String,
    pub data: Option<EdgeSpec>,
}

#[derive(Deserialize, Serialize, Debug, PartialEq, Clone)]
#[serde(rename_all = "camelCase")]
pub struct EdgeSpec {
    pub container_port: String,
    pub host_port: String,
}

#[derive(Deserialize, Serialize, Debug, PartialEq, Clone)]
pub struct Service {
    pub image: String,
    pub ports: Vec<String>,
    pub depends_on: Option<Vec<String>>,
    pub volumes: Option<Vec<String>>,
}

#[derive(Deserialize, Serialize, Debug, PartialEq, Clone)]
pub struct DockerCompose {
    pub version: String,
    pub services: HashMap<String, Service>,
}
