echo "Installing Rustup..."
# Install Rustup (compiler)
amazon-linux-extras install rust1

echo "Installing wasm-pack..."
# Install wasm-pack
cargo install wasm-pack

echo "Building wasm-parser..."
# Build wasm-parser 
npm run build:wasm

echo "Build static frontend client..."
# Build static html for the react client
npm run build