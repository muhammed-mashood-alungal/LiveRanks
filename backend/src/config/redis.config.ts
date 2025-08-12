import { createClient, type RedisClientType } from "redis";
import { env } from "./env.config";

let redisClient: RedisClientType | null = null;

async function connectRedis(): Promise<void> {
  if (redisClient && redisClient.isReady) {
    return;
  }

  redisClient = createClient({
    username: env.REDIS_USERNAME!,
    password: env.REDIS_PASSWORD!,
    socket: {
      host: env.REDIS_HOST!,
      port: Number(env.REDIS_PORT)!,
      connectTimeout: 30000,
      reconnectStrategy(retries) {
        if (retries > 5) {
          console.log("Max Redis reconnect attempts reached");
          return false;
        }
        return Math.min(retries * 100, 2000);
      },
    },
  });

  redisClient.on("connect", () => {
    console.log("Connected to Redis");
  });

  redisClient.on("ready", () => {
    console.log("Redis client ready");
  });

  redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

  redisClient.on("end", () => {
    console.log("Redis connection ended");
  });

  try {
    await redisClient.connect();
    console.log("Redis connection established successfully");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error;
  }
}

function getRedisClient(): RedisClientType {
  if (!redisClient || !redisClient.isReady) {
    throw new Error(
      "Redis client not connected. Make sure connectRedis() completed successfully."
    );
  }
  return redisClient;
}

export { connectRedis, getRedisClient };
