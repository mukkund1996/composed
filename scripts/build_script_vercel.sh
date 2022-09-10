echo "Installing Rustup..."
# Install Rustup (compiler)
amazon-linux-extras install rust1

echo "Installing wasm-pack..."
# Install wasm-pack
cargo install wasm-pack

echo "Building wasm-parser..."
cd wasm-parser
# Build wasm-parser 
/vercel/.cargo/bin/wasm-pack build --target web --out-dir ./wasm-build

echo "Build static frontend client..."
# Build static html for the react client
npm run build