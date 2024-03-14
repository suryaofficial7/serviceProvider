const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pathkar'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { firstName, email, password, role, needsService, servicesOffered, locations, price, companyName, experience } = req.body;

    // Insert data into the appropriate table based on the role
    if (role === 'service-provider') {
        const sql = 'INSERT INTO users (first_name, email, password, role, needs_service, services_offered, locations, price, company_name, experience) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [firstName, email, password, role, needsService, servicesOffered, locations, price, companyName, experience], (err, result) => {
            if (err) {
                console.error('Error inserting data into users:', err);
                res.status(500).json({ error: 'An error occurred while signing up' });
            } else {
                console.log('Data inserted successfully into users');
                res.status(200).json({ message: 'Signup successful' });
            }
        });
    } else {
        const sql = 'INSERT INTO consumers (first_name, useremail, password, role, needs_service) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [firstName, email, password, role, needsService], (err, result) => {
            if (err) {
                console.error('Error inserting data into consumers:', err);
                res.status(500).json({ error: 'An error occurred while signing up' });
            } else {
                console.log('Data inserted successfully into consumers');
                res.status(200).json({ message: 'Signup successful' });
            }
        });
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password, userType } = req.body;

    let tableName = '';
let mail = '';
    // Determine the table name based on the user type
    if (userType === 'consumer') {
        tableName = 'consumers'; // Table for consumers
        mail= 'useremail'
    } else if (userType === 'serviceProvider') {
        tableName = 'users'; // Table for service providers
        mail= 'email'

    } else {
        // Invalid user type
        return res.status(400).json({ error: 'Invalid user type' });
    }

    // Check if the user exists in the appropriate table based on the user type
    const sql = `SELECT * FROM ${tableName} WHERE ${mail} = ? AND password = ?`;
    console.log(`${sql}`);
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error querying user:', err);
            res.status(500).json({ error: 'An error occurred while logging in' });
        } else {
            if (result.length > 0) {
                // User found, return user details
                console.log('User logged in successfully');
                res.status(200).json({ user: result[0] }); // Return user details
            } else {
                // User not found, return error message
                console.log('User not found');
                // res.status(404).json({ error: 'User not found'
                res.json({ error: 'User not Found!!!'            });
            }
        }
    });
});


app.post('/apply',(req,res)=>{

    const userID = req.body.userID
    const customerID = req.body.customerID
    // console.log(id);

db.query(`select services_offered as service from users where id='${userID}'`,function(err,result7,field){
if(err){
    return res.status(500).json({ error: 'An error occurred while fetching user details' });

}
else{

    // console.log(result7[0]['service']);
    var today = new Date();
    var year = today.getFullYear();
    var mes = today.getMonth()+1;
    var dia = today.getDate();
    var fetch =dia+"-"+mes+"-"+year;
    const sql = `INSERT INTO appointments (AppointmentID, userID,service, customerID, times,dates) VALUES (NULL, ${userID},'${result7[0]['service']}',${customerID},CURRENT_TIMESTAMP(),'${fetch}');`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json({ error: 'An error occurred while fetching user details' });
        }

        if (result.length === 0) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // User found, return user details
        console.log('User details fetched successfully');
        res.status(200).json({"success":"Succesfully"});
        // res.send(req.body);


    });
}


})

// res.json({"id":id});

})


app.post('/delete',(req,res)=>{

    const id = req.body.id
    console.log(id);
    const sql = `delete from appointments where AppointmentID='${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json({ error: 'An error occurred while fetching user details' });
        }


        // User found, return user details
        console.log('User details fetched successfully');
        res.status(200).json({"success":"Succesfully"});
        // res.send(req.body);
    });
// res.json({"id":id});

})


app.post('/getServices',(req,res)=>{

    const val = req.body['val'];
    
    const sql = `SELECT * FROM users where services_offered  LIKE '${val}%'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json({ error: 'An error occurred while fetching user details' });
        }

        if (result.length === 0) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // User found, return user details
        console.log('User details fetched successfully');
        res.status(200).json(result);
        // res.send(req.body);
    });

})

app.post('/getAllAppoints',(req,res)=>{

    const CID = req.body['CID'];
    
    const sql = `select * FROM appointments  INNER JOIN users on users.id=appointments.userID  where appointments.customerID = '${CID}'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json({ error: 'An error occurred while fetching user details' });
        }

        if (result.length === 0) {
            console.log('NO result');
            return res.status(404).json({ error: 'NO AppointMent Till Now' });
        }

        // User found, return user details
        console.log('User details fetched successfully');
        res.status(200).json(result);
        // res.send(req.body);
    });

})




app.post('/viewAppoints',(req,res)=>{

    const userID = req.body['userID'];
    
    const sql = `select * FROM appointments INNER JOIN users on users.id=appointments.userID INNER JOIN consumers on consumers.id=appointments.customerID where users.id ='${userID}';`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json({ error: 'An error occurred while fetching user details' });
        }

        if (result.length === 0) {
            console.log('NO result');
            return res.status(404).json({ error: 'NO AppointMent Till Now' });
        }

        // User found, return user details
        console.log('User details fetched successfully');
        res.status(200).json(result);
        // res.send(req.body);
    });

})

// Home endpoint
app.get('/home', (req, res) => {
    const userEmail = req.session.user.email; // Retrieve user email from session

  

console.log(userEmail);
    // Query the database to fetch user details by email
    const sql = `SELECT * FROM consumers WHERE email = ? UNION ALL SELECT * FROM users WHERE email = ?`;
    db.query(sql, [userEmail, userEmail], (err, result) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json({ error: 'An error occurred while fetching user details' });
        }

        if (result.length === 0) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // User found, return user details
        console.log('User details fetched successfully');
        res.status(200).json(result[0]);
    });
});




// Start the server
const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
