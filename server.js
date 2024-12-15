// Import required modules
const express = require('express');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where } = require('firebase/firestore');

// Initialize Express app
const app = express();
const port = 3000;

// Firebase configuration

    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
      };


// Initialize Firebase and Firestore
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Middleware for JSON response
app.use(express.json());

// Route table as landing page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SLPP API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f9;
          color: #333;
        }
        .container {
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          background: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #4caf50;
          text-align: center;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        table th, table td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: left;
        }
        table th {
          background-color: #4caf50;
          color: white;
        }
        table a {
          color: #4caf50;
          text-decoration: none;
        }
        table a:hover {
          text-decoration: underline;
        }
        footer {
          text-align: center;
          margin-top: 20px;
          font-size: 14px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>SLPP API Route Table</h1>
        <table>
          <thead>
            <tr>
              <th>HTTP Method</th>
              <th>Route</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GET</td>
              <td><a href="/slpp/petitions">/slpp/petitions</a></td>
              <td>Returns details of all petitions</td>
            </tr>
            <tr>
              <td>GET</td>
              <td><a href="/slpp/petitions?status=open">/slpp/petitions?status=open</a></td>
              <td>Returns details of all open petitions</td>
            </tr>
          </tbody>
        </table>
        <footer>
          <p>SLPP API - 2024 | Developed with ❤️ by the SLPP Team</p>
        </footer>
      </div>
    </body>
    </html>
  `);
});

// Function to fetch petitions from Firestore
async function fetchPetitionsFromFirestore(status = null) {
  const petitionsCollection = collection(db, 'petitions');
  let petitionsQuery = petitionsCollection;

  if (status) {
    petitionsQuery = query(petitionsCollection, where('status', '==', status));
  }

  const querySnapshot = await getDocs(petitionsQuery);
  const petitions = [];
  querySnapshot.forEach((doc) => {
    petitions.push({ petition_id: doc.id, ...doc.data() });
  });

  return petitions;
}

// Get petitions based on query parameter status
app.get('/slpp/petitions', async (req, res) => {
  try {
    const { status } = req.query;
    const petitions = await fetchPetitionsFromFirestore(status);
    res.json({ petitions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch petitions from Firestore' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`SLPP API server running at http://localhost:${port}`);
});
