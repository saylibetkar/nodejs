/*


 created by dhananjay krishna
 */
/* open source ,cross platform for developing server side web applications
 * its basic modules are written in java script,it is used for real time applications
 * while php is slow and uses lot of memory resources*/
//a basic server using nodejs which is tested on ibm bluemix
var http = require('http');
var fs = require('fs');

//404 response

function send404Response(response){
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404: Page not found ...ha ha its me dhananjay");
    response.end();

}

//to handle a user request this is the function
//response is the object we send back to the user
function onRequest(request, response)
{
    if( request.method == 'GET' && request.url =='/'){
        response.writeHead(200, {"Content-Type": "text/html"});

        var fs=require('fs'),
            EventEmitter=require('events').EventEmitter,
            filesEE=new EventEmitter(),
            myfiles=[];//it is stored in an array called myfiles

// this event will be called when all files have been added to myfiles
        filesEE.on('files_ready',function(){

            for(var i=0;i<myfiles.length;i++)
            {
                //web file to be pushed should be named as index.extension only
                if ("index" == myfiles[i].slice(0,5))
                {
                    /*console.log(myfiles[i].slice(0,5)); */
                    console.log(myfiles[i], "its me dj");
                    //extracting the file extension and executing the according to the extension
                    console.log(myfiles[i].substr(myfiles[i].lastIndexOf('.')+1));
                    var thisfile= myfiles[i].substr(myfiles[i].lastIndexOf('.')+1);
                    console.log(thisfile);
                    switch (thisfile)
                    {
                        case "html":
                            fs.createReadStream(myfiles[i]).pipe(response);
                            console.log(myfiles[i]);
                            break;
                        case "jsp":
                             fs.createReadStream(myfiles[i]).pipe(response);
                            console.log("this is jsp");
                         break;
                        case "php":
                            fs.createReadStream(myfiles[i]).pipe(response);
                            console.log("this is php");
                            break;

                    }

                }

            }
        });



// read all files from current directory
        fs.readdir('.',function(err,files){
            if(err) throw err;
            files.forEach(function(file){
                myfiles.push(file);
            });
            filesEE.emit('files_ready'); // trigger files_ready event
        });





        //   fs.createReadStream("./index.html").pipe(response);
    } else{
        send404Response(response);

    }
}

var appport = process.env.VCAP_APP_PORT || 3000;
//request listener is  here it is appport which is the port number, it has the value assigned above for the IBM bluemix
//here onRequest is the send the user webfile or webpage when the user connects
http.createServer(onRequest).listen(appport);
console.log('server is now running'); //this logs on to the command line



