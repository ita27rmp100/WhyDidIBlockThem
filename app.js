const myHTTP = require('http') , qs = require('querystring') ,  fs = require('fs') , mysql = require('mysql');

let PORT = 3000 
let server = myHTTP.createServer(function(req,res){
    if (req.method=='POST'){
        let body = ''
        req.on('data',function(data){
            body = body + data
        })
        req.on('end',function(){
            let post = qs.parse(body)  
            console.log(post.username,post.reason)
            let AddingCommand = `insert into details values('${post.username}',"${post.reason}");`
            let UserNames = []
            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'tweets'
            });
            connection.query('select * from details', function (error, results, fields) {
                for(let i=0;i<results.length;i++){
                    UserNames.push(Object.values(results[i])[0])
                }
            if (UserNames.includes(post.username)) {
                console.log('You have already added this username')
            } else {
                connection.query(AddingCommand, function (error, results, fields) {
                    console.log('done')
                    connection.end();
                });
            }
        })
    });
    }
    else{
        res.end(fs.readFileSync('index.html'))
    }
})

server.listen(PORT,()=>{console.log('listening to port 3000')})