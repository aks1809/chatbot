import redisClient from "./redis.js"


export const updateCountsInCache = async(pass, stationId) => {
    pass ? await redisClient.incr(`station-${stationId}-pass`) : await redisClient.incr(`station-${stationId}-fail`)
    pass ? await redisClient.set(`station-${stationId}-lastUpdated`, 1) : await redisClient.set(`station-${stationId}-lastUpdated`, 0)
    await redisClient.incr(`station-${stationId}-total`)
}

export const correctCountsInCache = async (stationId) => {
   const pass =  await redisClient.get(`station-${stationId}-lastUpdated`)
   if (parseInt(pass) === 1){
    await redisClient.decr(`station-${stationId}-pass`)
    await redisClient.incr(`station-${stationId}-fail`)
   } 
}

export const getCountsFromCache = async(stationId) => {
    const pass = await redisClient.get(`station-${stationId}-pass`)
    const fail = await redisClient.get(`station-${stationId}-fail`)
    const total = await redisClient.get(`station-${stationId}-total`)
    const failureRate = parseInt(fail)*100/parseInt(total) || 0
    return {pass, fail: failureRate, total}
}

export const resetCountInCache = async(stationId) => {
    await redisClient.set(`station-${stationId}-pass`, 0)
    await redisClient.set(`station-${stationId}-fail`, 0)
    await redisClient.set(`station-${stationId}-total`, 0)
}