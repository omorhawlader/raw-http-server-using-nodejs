const http = require('http')

const students = [
    {
        id: 1,
        name: "Alice Johnson"
    },
    {
        id: 2,
        name: "Bob Smith"
    },
    {
        id: 3,
        name: "Charlie Brown"
    },
    {
        id: 4,
        name: "Daisy Miller"
    },
    {
        id: 5,
        name: "Ethan Davis"
    }
];




const handleRes = (res,{
    status=200,
    contentType="application/json",
    body={}
}) =>{
    res.writeHead(status, {'Content-Type': contentType});
        res.write(JSON.stringify(body))
        res.end()
}
const server = http.createServer((req,res)=>{
    if(req.url == '/'){
        handleRes(res,{
            status:200,
            body:{
                name: 'Omar',
                learning: 'backend in node js?',
                new: 'no!'
            }
        })
    }
    if(req.url == '/students'){
        handleRes(res,{body:{
            students
        }})
    }
    if(req.url == '/students' && req.method == "POST"){
        let body="";
        req.on('data',(chunk)=> {
            body+=chunk.toString()
            
        });

        req.on('end',()=>{
            students.push(JSON.parse(body))
            handleRes(res,{
                status: 201,
                body:{
                    msg: "posted succes"
                }
            })
        })
       
        

       
    }
    else{

        res.end("welcome to the rest api by omar");
    }

})

server.listen(4000,()=>console.log("server is running on 4000 port"))