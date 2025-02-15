import cron from 'node-cron'
import { checkLowStock } from '../controllers/stock.Controller.js';
import logger from '../utils/logger.js';

const cronForEveryMinute = "* * * * *"; // Every minute
const cronForEveryHour = "0 */1 * * *"; // Every hour


export const scheduleStockCheck = () => {
    cron.schedule(cronForEveryMinute, async () => {
        try {
            await checkLowStock();
            logger.info('Low stock check completed!')
        } catch (error) {
            logger.error('Error during low stock check:', error)
        }
    })
}

