const express = require("express")
const fs = require("fs")
const crypto = require("crypto")
const app = express()

app.use(express.json())

app.get("/",(req,res)=> {
    const data = fs.readFileSync("./db.json",{encoding:"utf-8"})
    const result = JSON.parse(data)
    const lastdata = result.todo
    res.send(lastdata)
})
app.post("/",(req,res)=> {
    const post_data = req.body
    console.log('post_data:', post_data)

    const data = fs.readFileSync("./db.json", "utf-8")// we get data in string 
    const result = JSON.parse(data) // converting into json
    const lastdata = result.todo  //  selecting specific array
    lastdata.push(post_data)  // posting client data in specific array
    const final = JSON.stringify(result)// converting main array in string
    fs.writeFileSync("./db.json",final,"utf-8") // writing the updated db.json
    res.send("data post successfully")  // sending message
})

app.delete("/",(req,res)=> {
   const {id} = req.body
    fs.readFile("./db.json", "utf-8",(err,data)=>{
        if(err)
        {
            return res.send("sorry ")
        }
        const result = JSON.parse(data)
        const del = result.todo.filter((ele)=> ele.id != id)
        result.todo = del
        fs.writeFileSync("./db.json",JSON.stringify(result),"utf-8") // writing the updated db.json
         res.send("data delete successfully")
    })
})

app.patch("/",(req,res)=>{
    const {id,task} = req.body
    fs.readFile("./db.json", "utf-8",(err,data)=>{
        if(err)
        {
            return res.send("sorry ")
        }
        const result = JSON.parse(data)
        const del = result.todo.map((ele)=> 
        {
            
            if(ele.id==id)
            {
                return {...ele,task}
            }
            else
            {
                   return ele
            }
        })
        result.todo = del
        fs.writeFileSync("./db.json",JSON.stringify(result),"utf-8") // writing the updated db.json
         res.send("data patched successfully")
    })
})

app.put("/",(req,res)=>{

    const {id,task,status} = req.body
    let newid = crypto.randomUUID({disableEntropyCache : true})
    fs.readFile("./db.json", "utf-8",(err,data)=>{
        if(err)
        {
            return res.send("sorry ")
        }
        const result = JSON.parse(data)
        const del = result.todo.map((ele)=> 
        {
            
            if(ele.id==id)
            {
                return {...ele,task,status,id:newid}
            }
            else
            {
                   return ele
            }
        })
        result.todo = del
        fs.writeFileSync("./db.json",JSON.stringify(result),"utf-8") // writing the updated db.json
         res.send("data put successfully")
    })

})
app.listen(8080, ()=> {
    console.log("server started")
})