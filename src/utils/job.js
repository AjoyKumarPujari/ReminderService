const cron = require("node-cron");
const emailService = require('../services/email-service');
const sender = require('../config/emailConfig');
/**
 * 10:00am
 * every 5min
 * are therer any pending email which was expected to be sent by now and is pending within 5 min
 * 
 * 
 */

const setupJobs =() => {
    
    cron.schedule('*/1 * * * *', async () => {
        //console.log('running a task five minute');
        const response = await emailService.fetchPendingEmails();
        response.forEach((email)=>{
            // emailService.sendBasicEmail(
            //     " bookingservice1001@gmail.com",
            //     email.recepientEmail,
            //     email.subject,
            //     email.content
            // );
            sender.sendMail({
                
            to: email.recepientEmail,
            subject: email.subject,
            text: email.content
            },async (err, data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                    await emailService.updateTicket(email.id, {status:"SUCCESS"});
                }
            });            
        });
        console.log(response);
    });
}
module.exports=setupJobs