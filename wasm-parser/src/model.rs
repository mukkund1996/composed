// Contains the data model definitions of the type of data received from 
// the React client

use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, PartialEq, Clone)]
#[serde(rename_all = "camelCase")]
pub struct NodeData {
    pub label: String,
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
pub struct Service {
    pub image: String,
    pub ports: Vec<String>
}

#[derive(Deserialize, Serialize, Debug, PartialEq, Clone)]
pub struct DockerCompose {
    pub version: String,
    pub services: HashMap<String, Service>
}