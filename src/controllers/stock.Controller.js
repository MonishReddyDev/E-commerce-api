import sendMail from "../utils/mailer.js";
import { lowStockAlert } from "../services/stock.service.js";
import path from 'path';
import fs from 'fs';
import logger from "../utils/logger.js";

// Get the current directory from import.meta.url
const htmlPath = '../templates/lowStockEmailTemplate.html';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const checkLowStock = async () => {
    try {
        const lowStockProducts = await lowStockAlert();

        if (lowStockProducts.length > 0) {
            // Read the HTML template from file
            const templatePath = path.join(__dirname, htmlPath);
            let emailTemplate = fs.readFileSync(templatePath, 'utf-8');

            // Create the product list dynamically as table rows
            const productRows = lowStockProducts.map(product => {
                return `
                    <tr>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${product.countInStock}</td>
                    </tr>
                `;
            }).join('');

            // Replace the placeholder in the template with the actual product list
            emailTemplate = emailTemplate.replace('<!-- Dynamic Product List will be inserted here -->', productRows);

            // Send the email and await the result
            await sendMail("monishreddy900@gmail.com", 'Low Stock Alert', emailTemplate);

            // Log success if email is sent
            logger.info("Low stock alert email sent successfully!");
        } else {
            // Log that no low stock products are found
            logger.info("No low stock products found.");
        }
    } catch (error) {
        // Log any errors that occur during the process
        logger.error("Error while sending low stock alert email: ", error);
    }
};
