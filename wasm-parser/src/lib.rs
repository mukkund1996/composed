use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn print_string(data: String) -> String {
    return data;
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_print() {
        let test_string = String::from("hello world");
        assert_eq!(super::print_string(test_string), String::from("hello world"));
    }
}
