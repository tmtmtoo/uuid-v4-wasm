use std::char;
use rand::{Rng, SeedableRng, XorShiftRng};

enum UuidElements {
    Random09AF,
    Random89AB,
    Hyphen,
    Version,
}

const UUID_V4_FORMAT: [UuidElements; 36] = [
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Hyphen,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Hyphen,
    UuidElements::Version,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Hyphen,
    UuidElements::Random89AB,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Hyphen,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
    UuidElements::Random09AF,
];

const ERROR_MAKE_CHAR: &str = "Error in making char";

fn f64_to_16bytes_le(seed: f64) -> [u8; 16] {
    let bytes = seed.to_bits();

    let b1: u8 = ((bytes >> 56) & 0xff) as u8;
    let b2: u8 = ((bytes >> 48) & 0xff) as u8;
    let b3: u8 = ((bytes >> 40) & 0xff) as u8;
    let b4: u8 = ((bytes >> 36) & 0xff) as u8;
    let b5: u8 = ((bytes >> 24) & 0xff) as u8;
    let b6: u8 = ((bytes >> 16) & 0xff) as u8;
    let b7: u8 = ((bytes >> 8) & 0xff) as u8;
    let b8: u8 = (bytes & 0xff) as u8;

    [b8, b7, b6, b5, b4, b3, b2, b1, 0, 0, 0, 0, 0, 0, 0, 0]
}

pub fn gen_uuid_with_xorshift(seed: f64) -> String {
    let bytes = f64_to_16bytes_le(seed);
    let mut rng = XorShiftRng::from_seed(bytes);

    UUID_V4_FORMAT.into_iter()
        .map(|n| match n {
            UuidElements::Random09AF => {
                let random = rng.gen_range(0., 1.);
                char::from_digit((random * 16.) as u32, 16).expect(ERROR_MAKE_CHAR)
            }
            UuidElements::Random89AB => {
                let random = rng.gen_range(0., 1.);
                char::from_digit((random * 4.) as u32 + 8, 16).expect(ERROR_MAKE_CHAR)
            }
            UuidElements::Version => '4',
            UuidElements::Hyphen => '-',
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use regex::Regex;

    #[test]
    fn test_uuid() {
        let uuid = ::gen_uuid_with_xorshift(0.);
        let re =
            Regex::new(r"^[0-9:A-z]{8}-[0-9:A-z]{4}-4[0-9:A-z]{3}-[0-9:A-z]{4}-[0-9:A-z]{12}$")
                .unwrap();
        assert!(re.is_match(&uuid));
    }
}