# Flag Shipping XSS Challenge

Blind XSS Challenge Application in Next.js

## Installation Steps

1. Update your system:
   ```
   sudo apt update && sudo apt upgrade -y
   ```

2. Install Node.js and npm:
   ```
   curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Install Nginx:
   ```
   sudo apt install nginx -y
   ```

4. Clone the repository or copy the project files to your server:
   ```
   git clone https://github.com/your-username/flag-shipping-xss-challenge.git
   ```
   Or, if you've uploaded a zip file:
   ```
   unzip flag-shipping-xss-challenge.zip
   ```

5. Navigate to the project directory:
   ```
   cd flag-shipping-xss-challenge
   ```

6. Install project dependencies:
   ```
   npm install
   ```

7. Build the Next.js application:
   ```
   npm run build
   ```

8. Update npm packages (if necessary):
   ```
   npm update
   ```

9. Configure Nginx:
   Create a new Nginx server block configuration:
   ```
   sudo nano /etc/nginx/sites-available/flag-shipping-xss
   ```
   Add the following configuration:
   ```nginx
   server {
       listen 80;
       server_name your_domain_or_ip;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   Replace `your_domain_or_ip` with your server's domain name or IP address. (OPTIONAL)

10. Enable the Nginx configuration:
    ```
    sudo ln -s /etc/nginx/sites-available/flag-shipping-xss /etc/nginx/sites-enabled/
    ```

11. Test Nginx configuration and reload:
    ```
    sudo nginx -t
    sudo systemctl reload nginx
    ```

12. Start the Next.js application:
    ```
    npm start
    ```

## Running the Application

- To run the application in development mode:
  ```
  npm run dev
  ```

- To run the application in production mode:
  ```
  npm start
  ```

The application should now be accessible at `http://your_domain_or_ip:3000`.
Admin interface accesible in The application should now be accessible at `http://your_domain_or_ip:3000/api/admin`.