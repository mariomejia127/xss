# Flag Shipping Services XSS Challenge

This repository contains a Next.js application for a security research challenge. The application simulates a flag shipping service website with a hidden XSS vulnerability.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Git

## Local Deployment

1. Clone the repository:
   ```
   git clone https://github.com/your-username/flag-shipping-xss-challenge.git
   cd flag-shipping-xss-challenge
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   ```

4. Build the application:
   ```
   npm run build
   ```

5. Start the server:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

## VPS Deployment

1. SSH into your VPS:
   ```
   ssh user@your_vps_ip
   ```

2. Install Node.js and npm (example for Ubuntu/Debian):
   ```
   curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Install PM2 globally:
   ```
   sudo npm install -g pm2
   ```

4. Clone the repository:
   ```
   git clone https://github.com/your-username/flag-shipping-xss-challenge.git
   cd flag-shipping-xss-challenge
   ```

5. Install dependencies:
   ```
   npm install
   ```

6. Create a `.env` file in the root directory with the following content:
   ```
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   ```

7. Build the application:
   ```
   npm run build
   ```

8. Start the application with PM2:
   ```
   pm2 start npm --name "flag-shipping-xss" -- start
   ```

9. Set up PM2 to start on boot:
   ```
   pm2 startup systemd
   pm2 save
   ```

10. (Optional) Set up Nginx as a reverse proxy:
    - Install Nginx: `sudo apt-get install nginx`
    - Create a new Nginx configuration file:
      ```
      sudo nano /etc/nginx/sites-available/flag-shipping-xss
      ```
    - Add the following configuration:
      ```
      server {
          listen 80;
          server_name your_domain.com;

          location / {
              proxy_pass http://localhost:3000;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
          }
      }
      ```
    - Enable the configuration:
      ```
      sudo ln -s /etc/nginx/sites-available/flag-shipping-xss /etc/nginx/sites-enabled/
      ```
    - Test Nginx configuration:
      ```
      sudo nginx -t
      ```
    - Restart Nginx:
      ```
      sudo systemctl restart nginx
      ```

11. (Optional) Set up SSL with Certbot:
    ```
    sudo apt-get install certbot python3-certbot-nginx
    sudo certbot --nginx -d your_domain.com
    ```

## Automated Admin Panel Checking

To simulate an admin viewing the messages and potentially triggering XSS payloads:

1. Install Puppeteer:
   ```
   npm install puppeteer
   ```

2. Create a file named `checkAdmin.js` in the project root with the content provided in the challenge instructions.

3. Set up a cron job to run this script periodically:
   ```
   crontab -e
   ```
   Add the following line to run the check every 5 minutes:
   ```
   */5 * * * * /usr/bin/node /path/to/your/project/checkAdmin.js >> /path/to/your/project/admin_check.log 2>&1
   ```

## Challenge Instructions

test