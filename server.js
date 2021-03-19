require('dotenv').config();
const express = require('express');

const pool = require('./db_configuration');
const app = express();
const PORT = process.env.PORT || 3000;
//middleware
app.use(express.json());
app.use(express.static('public'))
//create
//************************ add edge cases for checks on data types */
app.post('/api/runs', async(req,res)=>{
    console.log(req.body)
    try{
        let newRun =req.body
        //console.log(newRun)
        const client = await pool.connect()
        //console.log('it made it here')
        const result = await pool.query(`INSERT INTO run(user_id, rating, date, distnace, time) VALUES(${newRun.user_id}, ${newRun.rate}, '${newRun.date}', ${newRun.distance}, ${newRun.time})`)
        //console.log('yeah its the query' )
        res.send(`run on ${newRun.date} was added`)
        client.release()
    }catch(err){
    res.status(500).end(err)
    }
})
//get all
app.get('/api/runs', async(req, res) => {
    try{
        const client=await pool.connect();
        const response = await pool.query('SELECT * FROM run ORDER BY user_id ASC')
        res.status(200).json(response.rows)
         client.release()
    }catch(err){
    res.status(500).end(err)
    }
})

//getspec
app.get('/api/runs/:id', async(req, res) => {
    try{
        console.log('it got here ' + req.params.id)
        let {id}= req.params;
        const client=await pool.connect();
        const response = await pool.query(`SELECT * FROM run WHERE run_id = ${id}`)
        res.status(200).json(response.rows)
         client.release()
    }catch(err){
    res.status(500).end(err)
    }
})
//update
app.put('/api/runs/:id', async(req, res) => {
    try{
        
        let rabcd = req.body;
        console.log(rabcd);
        let {id} = req.params;
        // let querySpecific = await pool.query(`SELECT * FROM run WHERE run_id = ${id}`);
        //console.log('looooooook'+ querySpecific);
        let templateRun = {
            user_i: rabcd.user_i, //||  querySpecific.rows[0].user_id,
            rati: rabcd.rat, //|| querySpecific.rows[0].rating,
            dista: rabcd.distanc, //|| querySpecific.rows[0].distnace,
            tim: rabcd.tim, //|| querySpecific.rows[0].time,
            dat: rabcd.dat //|| querySpecific.rows[0].date
            }
            console.log('this should be an onj ' +templateRun)
        const restr = await pool.query(`UPDATE run SET user_id = ${templateRun.user_i}, rating = ${templateRun.rati}, date = '${templateRun.dat}', distnace = ${templateRun.dista}, time = ${templateRun.tim} WHERE run_id = ${id}`)
        res.status(200).send(`congrats run has been updated to ${JSON.stringify(templateRun)}`)
    }catch(err){
    res.status(500).end(err)
    }
    })
//delete
app.delete('/api/runs/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const client = await pool.connect()
        const result = await pool.query(`DELETE FROM run WHERE run_id = ${id}`)
        res.status(200).send(`run number ${id} was succesfully deleted`)
        client.release()
    }catch(err){
    res.status(500).end(err)
    }
})

app.use((req, res)=>{
    res.send('nah dawg')
    console.log('it got here ' + req.params)
})

app.listen(PORT, () => {
    console.log('listening on Port 3000');
})


// app.post('/api/runs', async(req,res)=>{
//     try{
//         const client = await pool.connect()
//         const result = await pool.query(`INSERT INTO runs `)
//     }catch(err){
//     res.status(500).end(err)
//     }
    //})