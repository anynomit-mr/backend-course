
// const express = require('express');
//  const app = express();

//  const port = 3000;

//  app.use((req, res, next)=>{
//     console.log(`We received a ${req.method} from Request URL: ${req.url}`);
//     next();
//  })

//  app.get('/',(req,res)=>{
//     res.send('<h1>HELLO Arun</h1>')
//  })
//  app.get('/about',(req,res)=>{
//     res.send('<div><h1>HELLO Arun,</h1><h2>This is About Page</h2></div>')
//  })
//  app.get('/cont',(req,res)=>{
//     res.send('<div><h1>HELLO Arun,</h1><h2>This is Contact Page</h2></div>')
//  })
//  app.get('/user/:id', (req, res) => {
//     const userId = req.params.id;
//     res.send(`User ID is ${userId}`);
// });
//  app.use((req,res)=>{
//      res.status(404).send(`Page not avaiable check  the url: ${req.url}`);
//     })
    
  
// app.listen(port); 



// LEARNING MIDDLEWARES



const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: './static', // Directory where files will be saved
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname ); // Unique file name
    }
});

// Initialize upload object with storage config
const upload = multer({ storage: storage }).single('image');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'static]')));

app.use('/static', express.static('static'));

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL-encoded data (form data)
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'form.html'));
});
// POST route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email } = req.body;
    res.send(`Form submitted! Name: ${name}, Email: ${email}`);
});
// POST route for handling file uploads
app.post('/upload', (req, res) => {
    upload(req, res, (err)=>{
        if(err){
            res.send('Error: ' + err.message);
        } else {
          if (req.file == undefined) {
            res.send('No file selected!');
          } else {
            // Display the uploaded file to the user
            res.send(`
              <h2>File uploaded successfully!</h2>
              <p><strong>File:</strong> ${req.file.filename}</p>
              <img src="static/${req.file.filename}" alt="${req.file.filename}" width="300px"/>
              <br><a href="/">Go Back</a>
            `);
        }
    }})
});



// Start the server
const x = 80 ;
app.listen(x);