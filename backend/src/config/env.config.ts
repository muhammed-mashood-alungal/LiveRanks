export const env = {
  get PORT() {
    return process.env.PORT;
  },
  get REDIS_USERNAME(){
    return process.env.REDIS_USERNAME
  },
  get REDIS_PORT(){
    return process.env.REDIS_PORT
  },
  get REDIS_PASSWORD(){
    return process.env.REDIS_PASSWORD
  },
  get REDIS_HOST(){
    return process.env.REDIS_HOST
  },
  get MONGO_URI(){
    return process.env.MONGO_URI
  }
};
