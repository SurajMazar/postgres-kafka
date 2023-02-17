const kafka = require('./kafka')

const consumer = kafka.consumer({
  groupId: process.env.GROUP_ID
})

const main = async () => {
    await consumer.connect()
    await consumer.subscribe({
        topic: process.env.TOPIC,
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const value = JSON.parse(message.value)
            const key = JSON.parse(message.key)
            console.log(value.payload)
        }
    })
}

main().catch(async error => {
  try {
    await consumer.disconnect()
  } catch (e) {
    console.error('Failed to gracefully disconnect consumer', e)
  }
  process.exit(1)
})