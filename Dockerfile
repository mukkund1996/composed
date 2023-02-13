FROM rust:1.61 as wasm-builder

# Installing wasm-pack
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -y

# Compiling and targetting to WASM
ARG WASM_APP=/usr/src/wasm-parser
WORKDIR ${WASM_APP}

# Copying source files
ARG WASM_DIR=./wasm-parser
COPY ${WASM_DIR}/ .

# Building the wasm target
RUN wasm-pack build --target web --out-dir ./wasm-build

# Node image
FROM node:16-alpine as node-builder
ARG REACT_APP=/usr/src/composed
WORKDIR ${REACT_APP}

# Copying src files
COPY . .
# Copying the wasm build files
COPY --from=wasm-builder /usr/src/ .

# Install node dependencies
RUN npm install .

# Running the static build
RUN npm run build

# Serving through Nginx
FROM nginx:latest
WORKDIR /usr/share/nginx/html
# Removing default html files
RUN rm -rf ./*
# # Copying build files from node-builder
COPY --from=node-builder /usr/src/composed/build/ .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]


