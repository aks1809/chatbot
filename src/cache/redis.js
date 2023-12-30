import { createClient } from "redis";
import configConsts from '../config/constants.js'

const redisClient = createClient({
    url: `redis://${configConsts.DB_DOMAIN}:${configConsts.REDIS_PORT}`,
  });
  
export default redisClient