const crypto = require('crypto');

// This script generates a secure, random 64-byte hex string.
// Use this for your JWT_SECRET environment variable.
const secret = crypto.randomBytes(64).toString('hex');

console.log('Your secure JWT secret:');
console.log(secret);
