"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
exports.connectRedis = connectRedis;
const redis_1 = require("redis");
const env_config_1 = require("./env.config");
let redisClient;
function connectRedis() {
    exports.redisClient = redisClient = (0, redis_1.createClient)({
        username: env_config_1.env.REDIS_USERNAME,
        password: env_config_1.env.REDIS_PASSWORD,
        socket: {
            host: env_config_1.env.REDIS_HOST,
            port: Number(env_config_1.env.REDIS_PORT),
            connectTimeout: 30000,
            reconnectStrategy(retries) {
                if (retries > 5) {
                    console.log('Max Redis reconnect attempts reached');
                    return false;
                }
                return Math.min(retries * 100, 2000);
            },
        },
    });
    redisClient.on('connect', () => {
        console.log('Connected to redis');
    });
    redisClient.on('error', err => {
        console.error('Redis connection error', err);
    });
    redisClient.connect();
}
//# sourceMappingURL=redis.config.js.map