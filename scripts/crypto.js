import crypto from "node:crypto";

const algorithm = "aes-256-cbc";
const secret = crypto.randomBytes(16).toString("hex"); //"my important secret";
const key = crypto
                .createHash("sha512")
                .update(secret)
                .digest("hex")
                .substring(0, 32);

function encrypt(data) {
    const iv = crypto.randomBytes(16);
    const uuid = crypto.randomUUID();
    const ts = Date.now();
    const payload = {uuid, ts, data: JSON.stringify(data)};
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    const encrypted = cipher.update(JSON.stringify(payload), "utf-8", "hex");

    return [
        uuid,
        iv.toString("hex"),
        encrypted + cipher.final("hex")
    ].join("-");
}

function decrypt(str) {
    try {
        const [_, uuid, iv, encrypted] = str.match(/^(\w+-\w+-\w+-\w+-\w+)-(\w+)-(\w+)$/);
        const decipher = crypto.createDecipheriv(
            algorithm,
            Buffer.from(key),
            Buffer.from(iv, "hex"),
        );
        const decrypted = decipher.update(encrypted, "hex", "utf-8") + decipher.final("utf-8");
        const {uuid: _uuid, ts, data} = JSON.parse(decrypted);

        if (uuid !== _uuid) return null;
        console.log(decrypted);
        return JSON.parse(data);
    } catch (err) {
        return null;
    }
}

const data = {email: "example@example.net"};
console.log('DATA:', data);
const encrypted = encrypt(data);
console.log('ENCRYPTED:', encrypted);
const decrypted = decrypt(encrypted);
console.log('DECRYPTED:', decrypted);
console.log(decrypt("4fcdcbaa-6b08-477b-92e9-f61ec9595c4d-587c1c597334806230285d6b198a239e-c3b95d648970fa3f3327620c8e0cdda8df6a883eee48eccee62580bba16c4b9351195cb86e638b999896bbaa3f1e329b9a7ed623975bbb5cbf0a6e4aae957db5e5821ade11de292f2e417e1feb0a3afb83a0854427a2ae0cc82827e357d1c513"));