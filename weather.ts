import { getWeather } from './src/weather'

process.stdout.write('You have passed: ')
process.stdout.write(JSON.stringify(process.argv))
process.stdout.write('\n\n');

(async () => {
    let data

    data = await getWeather('Gouda')
    process.stdout.write(JSON.stringify(data))
    process.stdout.write('\n\n')

    data = await getWeather('90210')
    process.stdout.write(JSON.stringify(data))
    process.stdout.write('\n\n')

    data = await getWeather('df')
    process.stdout.write(JSON.stringify(data))
    process.stdout.write('\n\n')
})()
