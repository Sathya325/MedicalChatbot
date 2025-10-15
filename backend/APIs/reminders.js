
const exp=require('express')
const reminderApp=exp.Router()
const expressAsynHandler=require('express-async-handler');



let Reminder;
reminderApp.use((req,res,next)=>{
    Reminder=req.app.get("remindersCollection");
})



//Whatsapp reminding functionality
setInterval(() => {
    Reminder.find({}, (err, reminderList) => {
        if(err) {
            console.log(err)
        }
        if(reminderList){
            reminderList.forEach(reminder => {
                if(!reminder.isReminded){
                    const now = new Date()
                    if((new Date(reminder.remindAt) - now) < 0) {
                        Reminder.findByIdAndUpdate(reminder._id, {isReminded: true}, (err, remindObj)=>{
                            if(err){
                                console.log(err)
                            }
                            const accountSid = process.env.ACCOUNT_SID 
                            const authToken = process.env.AUTH_TOKEN
                            const client = require('twilio')(accountSid, authToken); 
                            client.messages 
                                .create({ 
                                    from: 'whatsapp:+99999999999',
                                    body: remindObj.reminderMsg,        
                                    to: 'whatsapp:+919999999999' //YOUR PHONE NUMBER INSTEAD OF 8888888888
                                }) 
                                .then(message => console.log(message.sid)) 
                        })
                    }
                }
            })
        }
    })
},1000)
;



// GET ALL REMINDERS
reminderApp.get("/getAllReminder", (req, res) => {
    Reminder.find({}, (err, reminderList) => {
        if(err){
            console.log(err)
        }
        if(reminderList){
            res.send(reminderList)
        }
    })
})


// ADD REMINDER
reminderApp.post("/addReminder", (req, res) => {
    const { reminderMsg, remindAt } = req.body
    const reminder = new Reminder({
        reminderMsg,
        remindAt,
        isReminded: false
    })
    reminder.save(err => {
        if(err){
            console.log(err)
        }
        Reminder.find({}, (err, reminderList) => {
            if(err){
                console.log(err)
            }
            if(reminderList){
                res.send(reminderList)
            }
        })
    })

})




// DELETE REMINDER
reminderApp.post("/deleteReminder", (req, res) => {
    Reminder.deleteOne({_id: req.body.id}, () => {
        Reminder.find({}, (err, reminderList) => {
            if(err){
                console.log(err)
            }
            if(reminderList){
                res.send(reminderList)
            }
        })
    })
})



module.exports=reminderApp;
