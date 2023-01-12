const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

//const { sendBasicEmail } = require('./services/email-service');
const TicketController = require('./controllers/ticket-controller');

const jobs = require('./utils/job');

const cron = require('node-cron');
const setupJobs = require('./utils/job');

const setupAndStartServer = () =>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.post('/api/v1/tickets', TicketController.create);

    app.listen(PORT, () =>{
        console.log(`SERVER STARTED AT PORT ${PORT}`);
        jobs();
        // sendBasicEmail(
        //     'super@admin.com',
        //     'bookingservice1001@gmail.com',
        //     //'ajoykumarpujari@gmail.com',
        //     'This is a testing Email',
        //     'Hey, How are you, I hope you like the support'
        // )

    

        // cron.schedule('*/2 * * * *', () => {
        // console.log('running a task two minute');
        // });
    });
}


setupAndStartServer();






