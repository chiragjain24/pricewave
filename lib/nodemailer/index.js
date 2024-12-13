"use server"

import nodemailer from 'nodemailer';

const Notification = {
  WELCOME: 'WELCOME',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

export async function generateEmailBody (product,type) {
  const THRESHOLD_PERCENTAGE = 40;
  // Shorten the product title
  const shortenedTitle =
    product.title.length > 20
      ? `${product.title.substring(0, 20)}...`
      : product.title;

  let subject = "";
  let body = "";

  switch (type) {
    case Notification.WELCOME:
      subject = `Welcome to Price Tracking for ${shortenedTitle}`;
      body = `
        <div>
          <h2>Welcome to PriceWave 🚀</h2>
          <p>You are now tracking ${product.title}.</p>
          <p>PriceWave will keep you updated on the latest price changes for this product.</p>
          <p> Visit the product page <a href="https://pricewave.vercel.app/products/${product._id}" target="_blank" rel="noopener noreferrer">here</a>.</p>
          <p>Stay tuned for more updates on ${product.title} and other products you're tracking.</p>
        </div>
      `;
      break;

    case Notification.LOWEST_PRICE:
      subject = `Lowest Price Alert for ${shortenedTitle}`;
      body = `
        <div>
          <h4>Hey, ${product.title} has reached its lowest price ever!!</h4>
          <p>Grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
        </div>
      `;
      break;

    case Notification.THRESHOLD_MET:
      subject = `Discount Alert for ${shortenedTitle}`;
      body = `
        <div>
          <h4>Hey, ${product.title} is now available at a discount more than ${THRESHOLD_PERCENTAGE}%!</h4>
          <p>Grab it right away from <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
      break;

    default:
      throw new Error("Invalid notification type.");
  }

  return { subject, body };
}

const transporter = nodemailer.createTransport({
    pool: true, // Allows reuse of connections for multiple emails
    service: 'gmail', 
    port: 465, // Gmail's secure SMTP port
    secure: true, // Use SSL/TLS
    auth: {
      user: 'pricewave99@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    maxConnections: 1, // Maintain one active connection at a time
  });

export const sendEmail = async (emailContent, sendTo) => {
  const mailOptions = {
    from: 'pricewave99@gmail.com',
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) return console.log(error);
    
    console.log('Email sent.');
  })
}