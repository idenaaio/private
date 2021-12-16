const crypto = require('crypto');
const sha3 = require("js-sha3");

module.exports.encrypt = (data, passphrase) => {
    const key = sha3.sha3_256.arrayBuffer(passphrase)
    const dataArray = Buffer.from(
        typeof data === 'string' ? hexToUint8Array(data) : new Uint8Array(data)
    )
    const nonce = crypto.pseudoRandomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, Buffer.from(nonce))

    const encrypted = [
        ...nonce,
        ...cipher.update(dataArray),
        ...cipher.final(),
        ...cipher.getAuthTag(),
    ]
    return toHexString(encrypted, false)
}


function hexToUint8Array(hexString) {
    const str = stripHexPrefix(hexString)

    const arrayBuffer = new Uint8Array(str.length / 2)

    for (let i = 0; i < str.length; i += 2) {
        const byteValue = parseInt(str.substr(i, 2), 16)
        arrayBuffer[i / 2] = byteValue
    }

    return arrayBuffer
}

function isHexPrefixed(str) {
    return str.slice(0, 2) === '0x'
}

function stripHexPrefix(str) {
    if (typeof str !== 'string') {
        return str
    }
    return isHexPrefixed(str) ? str.slice(2) : str
}

function toHexString(byteArray, withPrefix) {
    return (
        (withPrefix ? '0x' : '') +
        Array.from(byteArray, function (byte) {
            // eslint-disable-next-line no-bitwise
            return `0${(byte & 0xff).toString(16)}`.slice(-2)
        }).join('')
    )
}