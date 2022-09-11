# Composed
Simple GUI to generate `docker-compose.yaml` using a flow chart.

# Development Setup
To install the npm package and the dependencies, follow the below steps:

### Install rust 
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
```

### Install `wasm-pack`
```
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -y
```

### Build the WASM package
```
npm run build:wasm
```

### Install npm package
```
npm install
```

### Run the developement Server
```
npm run start
```

# Production Build
Directly run the bash script in the repository:
```
bash scripts/build_script_vercel.sh
```