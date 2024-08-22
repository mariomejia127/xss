import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Home() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const validateInput = (input) => {
    const forbiddenChars = ['<', '>', '"', "'", '&', '/', '\\']
    return !forbiddenChars.some(char => input.includes(char))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateInput(name) || !validateInput(message)) {
      setError('Invalid characters detected. Please remove any special characters.')
      return
    }

    setError('')

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }),
    })
    if (res.ok) {
      router.push('/thankyou')
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Flag Shipping Services</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <header>
        <h1>Flag Shipping Services</h1>
        <nav>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="about">
          <h2>About Us</h2>
          <p>We love shipping flags! If you would like us to ship you a flag please use our contact form below to get in touch with us!</p>
        </section>

        <section id="services">
          <h2>Our Services</h2>
          <ul>
            <li>International Shipping</li>
            <li>Express Delivery</li>
            <li>Cargo Insurance</li>
            <li>Customs Clearance</li>
          </ul>
        </section>

        <section id="contact">
          <h2>Contact Us</h2>
          <br></br>
          <div className="form-container">
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Flag Shipping Services. All rights reserved.</p>
      </footer>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f5;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        header {
          background-color: #fff;
          padding: 20px 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
          color: black;
          margin: 0;
          font-size: 2.5rem;
        }
        nav {
          margin-top: 20px;
        }
        nav a {
          color: #333;
          text-decoration: none;
          margin-right: 20px;
          font-weight: 600;
        }
        main {
          padding: 40px 0;
        }
        section {
          margin-bottom: 40px;
        }
        h2 {
          color: black;
          border-bottom: 2px solid #0371e0;
          padding-bottom: 10px;
        }
        .form-container {
          background-color: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          max-width: 500px;
          margin: 0 auto;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
        }
        input, textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        textarea {
          height: 150px;
        }
        button {
          background-color: #0371e0;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #025db3;
        }
        .error {
          color: #d32f2f;
          margin-bottom: 15px;
        }
        footer {
          background-color: #333;
          color: #fff;
          text-align: center;
          padding: 20px 0;
          margin-top: 40px;
        }
      `}</style>
    </div>
  )
}