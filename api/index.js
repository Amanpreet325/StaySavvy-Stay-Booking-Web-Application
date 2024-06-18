const express = require('express')
const app = express()
const port = 3000
const cors=require('cors');
const {  mongoose } = require('mongoose');
const bcrypt=require('bcryptjs');
const fs=require('fs');
const User=require('./models/User.js');
const Place=require('./models/Place.js');
const Booking=require('./models/Booking.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer =require('multer');
const imageDownloader=require('image-downloader')
require('dotenv').config()
app.use(express.json());
app.use(cookieParser());
console.log({ __dirname });
app.use('/uploads',express.static(__dirname+'/uploads'));
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdasfg';
app.use(cors({
  credentials:true,
  origin:'http://localhost:5173',
}));

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);
app.get('/', (req, res) => {
  res.json('Hello World!');
});


app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document with the hashed password
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword, // Store the hashed password
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post('/login', async (req, res) => {
  const {email,password} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compare(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email:userDoc.email,
        id:userDoc._id
      }, jwtSecret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token, { httpOnly: true, secure: true }).json(userDoc);
      });
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});
app.get('/profile', (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized' });
      } 
        console.log("Welcome to profile");
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
      
    });
  } else {
    res.json('empty');
  }
});
app.post('/logout',(req,res)=>{
  res.cookie('token','').json(true);
});
app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  try {
    await imageDownloader.image({
      url: link,
      dest: __dirname + '/uploads/' + newName,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Referer': 'http://localhost:3000'
      }
    });
    res.json(newName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to download image' });
  }
});

const photosMiddleware=multer({dest:'uploads/'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
  const uploadedFiles=[];
  for(let i=0;i<req.files.length;i++){
    const {path,originalname}=req.files[i];
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newPath=path+'.'+ext;
    fs.renameSync(path,newPath);
    uploadedFiles.push(newPath.replace('uploads',''));
  }
  console.log(uploadedFiles);
  res.json(uploadedFiles);
})
app.post('/places',async(req,res)=>{
  const {token}=req.cookies;
  const {title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests}=req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      res.status(401).json({ error: 'Unauthorized' });
    } 
    const placeDoc=await Place.create({
      owner:userData.id,
      title,address,photos:addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,
    });
    console.log(placeDoc); 

  })
})
app.get('/places/:id', async (req,res) => {
  
  const {id} = req.params;
  res.json(await Place.findById(id));
});

app.put('/places', async (req,res) => {
  
  const {token} = req.cookies;
  const {
    id, title,address,addedPhotos,description,
    perks,extraInfo,checkIn,checkOut,maxGuests,price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,address,photos:addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,price,
      });
      await placeDoc.save();
      res.json('ok');
    }
  });
});

app.get('/user-places',(req,res)=>{
  const {token}=req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id}=userData;
    res.json(await Place.find({owner:id}));
  })
})
app.get('/places',async(req,res)=>{
  res.json(await Place.find());
})

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
      if (err) {
        reject(err);
      } else {
        resolve(userData);
      }
    });
  });
}
app.post('/bookings', async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const {
      place, checkIn, checkOut, numberOfGuests, name, phone, price,
    } = req.body;

    if (!userData || !userData.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const booking = await Booking.create({
      place, checkIn, checkOut, numberOfGuests, name, phone, price,
      user: userData.id,
    });

    res.json(booking);
  } catch (err) {
    console.error('Booking creation failed:', err);
    res.status(500).json({ error: 'Booking creation failed' });
  }
});

app.get('/bookings', async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req); // Get logged-in user data
    if (userData) {
      console.log('User Data:', userData); // Log user data
      const bookings = await Booking.find({ user: userData.id }).populate('place');
      res.json(bookings);
    } else {
      res.json([]); // Return empty array if not logged in
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});


app.delete('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params._id).populate('place');
    if (!booking) {
      return res.status(404).send('Booking not found');
    }
    res.send('Booking cancelled successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})