echo "Installing Rustup..."
# Install Rustup (compiler)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
# Adding binaries to path
echo "Home directory: $HOME"
source "$HOME/.cargo/env"

echo "Installing wasm-pack..."
# Install wasm-pack
cargo install wasm-pack

echo "Building wasm-parser..."
cd wasm-parser
# Build wasm-parser 
/vercel/.cargo/bin/wasm-pack build --out-dir ./wasm-build

echo "Build static frontend client..."
cd ..
# Build static html for the react client
npm run build