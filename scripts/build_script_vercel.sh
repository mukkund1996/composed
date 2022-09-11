echo "Installing Rustup..."
# Install Rustup (compiler)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
# Adding binaries to path
echo "Home directory: $HOME"
source "$HOME/.cargo/env"

echo "Installing wasm-pack..."
# Install wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -y

echo "Building wasm-parser..."
cd wasm-parser
# Build wasm-parser 
npm run build:wasm

echo "Build static frontend client..."
cd ..
# Build static html for the react client
npm run build