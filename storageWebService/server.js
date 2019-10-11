// Setup
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Data model and persistent store
const manager = require("./manager.js");

//const m = manager("mongodb://nsbajaj:nsbajaj@senecaweb-shard-00-00-ryf1t.mongodb.net:27017,senecaweb-shard-00-01-ryf1t.mongodb.net:27017,senecaweb-shard-00-02-ryf1t.mongodb.net:27017/bti425_assign2?ssl=true&replicaSet=SenecaWeb-shard-0&authSource=admin&retryWrites=true");

// Add support for incoming JSON entities
app.use(bodyParser.json());

// Add support for CORS
app.use(cors());

// Deliver the app's home page to browser clients
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

// Get all - File
app.get("/api/files", (req, res) => {
    res.json(files);
});

// Get one - File
app.get("/api/files/:itemId", (req, res) => {
    let itemId = req.params.itemId;
    var o = files.find(f => f.id == itemId);
    if(o == 'undefined'){
        res.status(404).send("Resource not found");
    }
    else {
        res.json(o);
    }
});

// Add - File
app.post("/api/files", (req, res) => {
    let newFile = { 
        name: req.body.name,
        fileType: req.body.fileType,
        fileSize: req.body.fileSize,
        dateUploaded: req.body.dateUploaded,
        dateModified: req.body.dateModified 
    };    
    files.push(newFile);
    res.status(201).json({message: "Added " + newFile + " as itemID " + files.length});
});

// Edit - File
app.put("/api/files/:itemId", (req, res) => {
    for(var i = 0; i < files.length; i++){
        if(files[i].id == req.params.itemId){
            files[i].name = req.body.name;
            files[i].fileType = req.body.fileType;
            files[i].fileSize = req.body.fileSize;
            files[i].dateUploaded = req.body.dateUploaded;
            files[i].dateModified = req.body.dateModified;
            break;
        }
    }
    res.json({message: "update file with Id: " + req.params.itemId + " to " + req.body.name});
});

// Delete - File
app.delete("/api/items/:itemId", (req, res) => {
     res.json({message: "delete user with Id: " + req.params.itemId});
});

// Resource not found (this should be at the end)
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

// Tell the app to start listening for requests
app.listen(HTTP_PORT, () => {
    console.log("Ready to handle requests on port " + HTTP_PORT);
});


var files = [{"id":1,"fileType":"video/x-mpeg","fileSize":33700440,"dateUploaded":"2017-02-01T19:17:08Z","dateModified":"2017-11-28T18:56:55Z"},
{"id":2,"fileType":"application/pdf","fileSize":59158711,"dateUploaded":"2018-07-09T11:26:09Z","dateModified":"2018-05-17T02:29:59Z"},
{"id":3,"fileType":"video/avi","fileSize":65143109,"dateUploaded":"2018-03-18T02:25:50Z","dateModified":"2018-01-22T04:33:13Z"},
{"id":4,"fileType":"application/vnd.ms-powerpoint","fileSize":13043711,"dateUploaded":"2019-03-22T02:37:17Z","dateModified":"2018-08-01T04:01:51Z"},
{"id":5,"fileType":"video/quicktime","fileSize":2913184,"dateUploaded":"2017-03-03T13:29:28Z","dateModified":"2019-07-22T03:53:17Z"},
{"id":6,"fileType":"image/gif","fileSize":40140437,"dateUploaded":"2017-03-03T07:18:43Z","dateModified":"2017-11-17T16:51:47Z"},
{"id":7,"fileType":"video/x-msvideo","fileSize":25441480,"dateUploaded":"2019-07-06T04:30:32Z","dateModified":"2019-07-10T08:39:45Z"},
{"id":8,"fileType":"image/pjpeg","fileSize":815374,"dateUploaded":"2019-07-24T04:14:49Z","dateModified":"2018-04-07T06:02:08Z"},
{"id":9,"fileType":"video/avi","fileSize":3127486,"dateUploaded":"2017-03-14T23:58:59Z","dateModified":"2019-05-01T02:14:18Z"},
{"id":10,"fileType":"video/avi","fileSize":95749888,"dateUploaded":"2018-11-23T08:56:08Z","dateModified":"2019-05-29T02:21:50Z"},
{"id":11,"fileType":"application/vnd.ms-excel","fileSize":2801190,"dateUploaded":"2017-05-30T15:51:25Z","dateModified":"2019-02-14T13:47:59Z"},
{"id":12,"fileType":"audio/mpeg3","fileSize":9008272,"dateUploaded":"2019-01-16T00:44:30Z","dateModified":"2017-11-27T13:47:07Z"},
{"id":13,"fileType":"image/tiff","fileSize":56475521,"dateUploaded":"2018-03-06T02:19:32Z","dateModified":"2018-09-14T10:59:04Z"},
{"id":14,"fileType":"video/avi","fileSize":80177026,"dateUploaded":"2019-09-01T22:45:32Z","dateModified":"2018-08-23T03:55:57Z"},
{"id":15,"fileType":"audio/x-mpeg-3","fileSize":92284271,"dateUploaded":"2019-08-21T04:25:54Z","dateModified":"2018-01-23T04:49:29Z"},
{"id":16,"fileType":"image/gif","fileSize":7748796,"dateUploaded":"2019-08-09T14:50:25Z","dateModified":"2018-03-13T06:27:32Z"},
{"id":17,"fileType":"video/x-msvideo","fileSize":98262768,"dateUploaded":"2019-05-28T01:35:46Z","dateModified":"2019-08-02T03:50:57Z"},
{"id":18,"fileType":"image/gif","fileSize":43054791,"dateUploaded":"2018-09-27T17:21:56Z","dateModified":"2019-01-23T16:55:49Z"},
{"id":19,"fileType":"video/quicktime","fileSize":53272373,"dateUploaded":"2017-07-19T17:37:47Z","dateModified":"2019-02-22T15:16:41Z"},
{"id":20,"fileType":"application/x-troff-msvideo","fileSize":43647307,"dateUploaded":"2018-05-16T22:31:07Z","dateModified":"2019-03-25T03:42:00Z"},
{"id":21,"fileType":"application/pdf","fileSize":77130807,"dateUploaded":"2017-03-19T06:00:46Z","dateModified":"2017-12-28T20:49:51Z"},
{"id":22,"fileType":"text/plain","fileSize":83830085,"dateUploaded":"2018-11-25T02:47:36Z","dateModified":"2019-02-28T02:34:45Z"},
{"id":23,"fileType":"audio/x-mpeg-3","fileSize":10366891,"dateUploaded":"2017-06-18T14:07:13Z","dateModified":"2018-06-20T16:07:49Z"},
{"id":24,"fileType":"text/plain","fileSize":37313317,"dateUploaded":"2019-07-09T03:31:22Z","dateModified":"2019-04-04T17:50:37Z"},
{"id":25,"fileType":"video/quicktime","fileSize":77531376,"dateUploaded":"2017-07-22T23:07:25Z","dateModified":"2018-06-18T01:10:03Z"},
{"id":26,"fileType":"image/jpeg","fileSize":36482773,"dateUploaded":"2017-07-03T10:16:20Z","dateModified":"2018-03-21T18:17:01Z"},
{"id":27,"fileType":"application/x-troff-msvideo","fileSize":44528176,"dateUploaded":"2018-06-10T06:50:20Z","dateModified":"2018-03-04T03:54:17Z"},
{"id":28,"fileType":"video/quicktime","fileSize":65036318,"dateUploaded":"2017-07-03T15:10:01Z","dateModified":"2018-03-31T05:05:03Z"},
{"id":29,"fileType":"audio/x-mpeg-3","fileSize":15700918,"dateUploaded":"2017-06-02T05:59:07Z","dateModified":"2017-10-26T11:13:20Z"},
{"id":30,"fileType":"audio/x-mpeg-3","fileSize":91512093,"dateUploaded":"2018-08-26T05:12:01Z","dateModified":"2019-08-14T01:50:10Z"},
{"id":31,"fileType":"video/msvideo","fileSize":49391862,"dateUploaded":"2019-08-11T15:03:46Z","dateModified":"2019-10-04T09:10:41Z"},
{"id":32,"fileType":"application/x-troff-msvideo","fileSize":71881372,"dateUploaded":"2017-12-12T04:12:02Z","dateModified":"2019-09-11T05:47:30Z"},
{"id":33,"fileType":"image/png","fileSize":4381667,"dateUploaded":"2017-03-04T00:28:55Z","dateModified":"2019-08-27T00:35:11Z"},
{"id":34,"fileType":"audio/x-mpeg-3","fileSize":97274536,"dateUploaded":"2017-09-03T06:47:14Z","dateModified":"2018-02-27T03:44:32Z"},
{"id":35,"fileType":"audio/mpeg3","fileSize":82489625,"dateUploaded":"2017-10-12T19:01:19Z","dateModified":"2019-02-12T13:06:11Z"},
{"id":36,"fileType":"application/msword","fileSize":20365982,"dateUploaded":"2018-09-27T01:07:46Z","dateModified":"2019-02-03T15:52:14Z"},
{"id":37,"fileType":"image/tiff","fileSize":3411329,"dateUploaded":"2018-09-27T23:05:51Z","dateModified":"2019-08-07T10:41:08Z"},
{"id":38,"fileType":"application/x-troff-msvideo","fileSize":57453709,"dateUploaded":"2019-10-08T15:10:45Z","dateModified":"2019-06-05T14:10:58Z"},
{"id":39,"fileType":"application/msword","fileSize":18942238,"dateUploaded":"2018-10-04T09:27:00Z","dateModified":"2019-02-04T04:13:54Z"},
{"id":40,"fileType":"application/powerpoint","fileSize":58756511,"dateUploaded":"2016-12-15T20:31:05Z","dateModified":"2019-05-19T19:29:35Z"},
{"id":41,"fileType":"audio/x-mpeg-3","fileSize":53416291,"dateUploaded":"2018-10-21T18:27:06Z","dateModified":"2019-02-22T21:26:44Z"},
{"id":42,"fileType":"application/vnd.ms-powerpoint","fileSize":77282791,"dateUploaded":"2019-05-18T15:32:08Z","dateModified":"2019-09-25T07:22:33Z"},
{"id":43,"fileType":"video/quicktime","fileSize":31119123,"dateUploaded":"2017-12-10T09:30:02Z","dateModified":"2017-10-14T06:53:16Z"},
{"id":44,"fileType":"application/x-msexcel","fileSize":98981747,"dateUploaded":"2018-12-04T11:44:53Z","dateModified":"2019-06-12T20:42:07Z"},
{"id":45,"fileType":"audio/mpeg3","fileSize":64455323,"dateUploaded":"2018-11-06T05:28:34Z","dateModified":"2018-06-18T03:52:43Z"},
{"id":46,"fileType":"application/powerpoint","fileSize":81051946,"dateUploaded":"2019-02-27T17:12:25Z","dateModified":"2019-05-03T14:00:30Z"},
{"id":47,"fileType":"video/avi","fileSize":75980290,"dateUploaded":"2017-09-01T07:42:44Z","dateModified":"2019-05-24T16:58:17Z"},
{"id":48,"fileType":"application/msword","fileSize":51888934,"dateUploaded":"2018-08-18T14:47:42Z","dateModified":"2018-01-27T21:07:31Z"},
{"id":49,"fileType":"application/x-msexcel","fileSize":10431939,"dateUploaded":"2019-09-02T06:54:42Z","dateModified":"2018-06-29T14:43:20Z"},
{"id":50,"fileType":"video/quicktime","fileSize":51881992,"dateUploaded":"2019-05-21T23:24:06Z","dateModified":"2019-09-29T08:13:40Z"},
{"id":51,"fileType":"application/vnd.ms-excel","fileSize":89266834,"dateUploaded":"2018-06-01T17:19:11Z","dateModified":"2018-10-10T21:01:46Z"},
{"id":52,"fileType":"audio/x-mpeg-3","fileSize":54571516,"dateUploaded":"2018-05-27T03:30:00Z","dateModified":"2019-01-04T20:16:35Z"},
{"id":53,"fileType":"audio/mpeg3","fileSize":23146590,"dateUploaded":"2018-06-01T15:26:23Z","dateModified":"2019-07-07T13:10:34Z"},
{"id":54,"fileType":"application/x-msexcel","fileSize":30671864,"dateUploaded":"2017-04-11T23:56:04Z","dateModified":"2019-05-15T16:44:07Z"},
{"id":55,"fileType":"image/pjpeg","fileSize":81721302,"dateUploaded":"2019-09-19T05:08:53Z","dateModified":"2018-10-04T07:21:42Z"},
{"id":56,"fileType":"application/x-excel","fileSize":9520189,"dateUploaded":"2017-02-13T19:22:26Z","dateModified":"2018-08-11T14:29:39Z"},
{"id":57,"fileType":"image/png","fileSize":52827125,"dateUploaded":"2018-11-09T21:01:30Z","dateModified":"2019-05-08T11:50:00Z"},
{"id":58,"fileType":"image/png","fileSize":16384596,"dateUploaded":"2019-09-26T07:11:46Z","dateModified":"2019-02-24T21:29:09Z"},
{"id":59,"fileType":"application/vnd.ms-powerpoint","fileSize":64209476,"dateUploaded":"2017-07-31T08:53:15Z","dateModified":"2018-04-02T13:02:34Z"},
{"id":60,"fileType":"application/x-mspowerpoint","fileSize":51753675,"dateUploaded":"2017-07-30T21:58:30Z","dateModified":"2019-06-08T14:58:45Z"},
{"id":61,"fileType":"image/x-tiff","fileSize":58541863,"dateUploaded":"2017-01-06T18:14:39Z","dateModified":"2018-06-09T06:58:30Z"},
{"id":62,"fileType":"application/x-mspowerpoint","fileSize":18221184,"dateUploaded":"2016-12-21T10:57:36Z","dateModified":"2018-06-10T00:54:54Z"},
{"id":63,"fileType":"application/powerpoint","fileSize":37092374,"dateUploaded":"2017-03-23T15:50:25Z","dateModified":"2018-04-07T14:46:44Z"},
{"id":64,"fileType":"application/pdf","fileSize":32669034,"dateUploaded":"2018-05-24T12:36:58Z","dateModified":"2018-02-28T16:24:53Z"},
{"id":65,"fileType":"image/x-tiff","fileSize":96694288,"dateUploaded":"2019-04-11T12:17:45Z","dateModified":"2018-11-13T00:14:02Z"},
{"id":66,"fileType":"audio/mpeg3","fileSize":8700249,"dateUploaded":"2017-03-11T12:38:09Z","dateModified":"2018-06-22T20:10:14Z"},
{"id":67,"fileType":"application/msword","fileSize":36465270,"dateUploaded":"2019-09-12T07:52:53Z","dateModified":"2019-05-24T09:21:30Z"},
{"id":68,"fileType":"video/mpeg","fileSize":72667678,"dateUploaded":"2017-06-26T23:25:30Z","dateModified":"2019-05-12T09:39:36Z"},
{"id":69,"fileType":"audio/mpeg3","fileSize":14643336,"dateUploaded":"2019-09-28T02:29:33Z","dateModified":"2019-05-20T23:00:44Z"},
{"id":70,"fileType":"audio/mpeg3","fileSize":4657415,"dateUploaded":"2018-12-14T10:44:10Z","dateModified":"2018-03-21T23:08:33Z"},
{"id":71,"fileType":"image/x-tiff","fileSize":8781,"dateUploaded":"2017-06-02T00:09:01Z","dateModified":"2019-08-03T22:10:30Z"},
{"id":72,"fileType":"image/tiff","fileSize":44270341,"dateUploaded":"2017-04-17T14:29:02Z","dateModified":"2019-03-07T05:39:37Z"},
{"id":73,"fileType":"image/gif","fileSize":91073270,"dateUploaded":"2019-04-24T05:39:00Z","dateModified":"2018-09-08T20:02:25Z"},
{"id":74,"fileType":"audio/mpeg3","fileSize":18215822,"dateUploaded":"2018-05-27T03:21:12Z","dateModified":"2018-04-18T03:40:19Z"},
{"id":75,"fileType":"application/pdf","fileSize":16966303,"dateUploaded":"2019-03-27T22:07:09Z","dateModified":"2019-03-11T03:47:27Z"},
{"id":76,"fileType":"application/msword","fileSize":85699502,"dateUploaded":"2017-02-05T12:30:36Z","dateModified":"2018-02-05T12:08:58Z"},
{"id":77,"fileType":"application/mspowerpoint","fileSize":89005446,"dateUploaded":"2017-11-27T08:04:01Z","dateModified":"2019-04-03T06:33:44Z"},
{"id":78,"fileType":"text/plain","fileSize":12162509,"dateUploaded":"2017-12-15T14:07:42Z","dateModified":"2018-06-18T18:00:08Z"},
{"id":79,"fileType":"application/x-excel","fileSize":89134264,"dateUploaded":"2018-03-04T16:36:01Z","dateModified":"2018-06-02T03:24:59Z"},
{"id":80,"fileType":"image/png","fileSize":96082016,"dateUploaded":"2017-03-31T17:20:21Z","dateModified":"2018-08-10T23:35:00Z"},
{"id":81,"fileType":"video/mpeg","fileSize":13190741,"dateUploaded":"2018-02-17T19:10:13Z","dateModified":"2019-03-16T09:20:11Z"},
{"id":82,"fileType":"image/gif","fileSize":31546257,"dateUploaded":"2019-09-10T09:56:25Z","dateModified":"2019-03-10T01:53:07Z"},
{"id":83,"fileType":"application/mspowerpoint","fileSize":92632418,"dateUploaded":"2017-06-13T21:19:28Z","dateModified":"2018-11-19T03:50:29Z"},
{"id":84,"fileType":"application/x-msexcel","fileSize":94720708,"dateUploaded":"2019-01-08T21:12:03Z","dateModified":"2019-04-13T10:03:32Z"},
{"id":85,"fileType":"application/excel","fileSize":48392961,"dateUploaded":"2017-07-24T20:02:00Z","dateModified":"2018-10-07T22:42:31Z"},
{"id":86,"fileType":"application/vnd.ms-powerpoint","fileSize":4292430,"dateUploaded":"2019-02-10T11:30:52Z","dateModified":"2019-03-16T14:28:07Z"},
{"id":87,"fileType":"image/tiff","fileSize":55453211,"dateUploaded":"2017-09-24T12:11:00Z","dateModified":"2018-03-07T03:40:44Z"},
{"id":88,"fileType":"audio/x-mpeg-3","fileSize":93753230,"dateUploaded":"2017-08-07T15:58:54Z","dateModified":"2018-01-08T17:47:45Z"},
{"id":89,"fileType":"application/excel","fileSize":88540525,"dateUploaded":"2016-11-12T22:08:20Z","dateModified":"2019-09-27T04:46:18Z"},
{"id":90,"fileType":"audio/mpeg3","fileSize":27928127,"dateUploaded":"2019-08-28T15:20:12Z","dateModified":"2017-10-31T11:34:48Z"},
{"id":91,"fileType":"text/plain","fileSize":89365866,"dateUploaded":"2018-11-03T20:03:39Z","dateModified":"2018-04-26T17:38:43Z"},
{"id":92,"fileType":"video/msvideo","fileSize":66211486,"dateUploaded":"2019-05-10T18:21:33Z","dateModified":"2019-05-05T21:57:59Z"},
{"id":93,"fileType":"video/mpeg","fileSize":40368506,"dateUploaded":"2017-02-16T19:32:53Z","dateModified":"2019-03-03T11:06:30Z"},
{"id":94,"fileType":"application/pdf","fileSize":84567242,"dateUploaded":"2018-12-08T13:39:06Z","dateModified":"2019-08-23T06:55:02Z"},
{"id":95,"fileType":"application/x-msexcel","fileSize":94787365,"dateUploaded":"2018-05-21T12:02:18Z","dateModified":"2019-05-28T10:10:03Z"},
{"id":96,"fileType":"image/png","fileSize":81485898,"dateUploaded":"2016-12-19T05:07:06Z","dateModified":"2019-02-01T01:49:51Z"},
{"id":97,"fileType":"application/x-troff-msvideo","fileSize":20435329,"dateUploaded":"2018-12-03T19:52:01Z","dateModified":"2018-08-31T14:30:32Z"},
{"id":98,"fileType":"application/vnd.ms-powerpoint","fileSize":74327568,"dateUploaded":"2016-10-22T02:58:46Z","dateModified":"2018-06-17T16:23:45Z"},
{"id":99,"fileType":"image/gif","fileSize":53926567,"dateUploaded":"2018-12-26T14:37:22Z","dateModified":"2017-11-15T15:54:24Z"},
{"id":100,"fileType":"application/x-troff-msvideo","fileSize":47314404,"dateUploaded":"2018-09-26T18:24:18Z","dateModified":"2018-10-30T04:12:35Z"},
{"id":101,"fileType":"audio/x-mpeg-3","fileSize":92665045,"dateUploaded":"2017-10-01T03:50:22Z","dateModified":"2017-12-17T08:20:41Z"},
{"id":102,"fileType":"image/x-tiff","fileSize":15273184,"dateUploaded":"2018-01-29T09:27:39Z","dateModified":"2018-04-07T22:27:39Z"},
{"id":103,"fileType":"video/mpeg","fileSize":61403312,"dateUploaded":"2018-02-04T11:33:05Z","dateModified":"2018-04-23T01:17:03Z"},
{"id":104,"fileType":"application/vnd.ms-powerpoint","fileSize":68908399,"dateUploaded":"2018-08-10T00:46:39Z","dateModified":"2019-08-05T18:57:40Z"},
{"id":105,"fileType":"video/mpeg","fileSize":34951184,"dateUploaded":"2019-01-09T11:28:37Z","dateModified":"2017-11-27T03:57:03Z"},
{"id":106,"fileType":"text/plain","fileSize":68661107,"dateUploaded":"2018-03-21T01:51:40Z","dateModified":"2019-09-09T03:50:07Z"},
{"id":107,"fileType":"application/mspowerpoint","fileSize":2959908,"dateUploaded":"2018-01-16T11:02:40Z","dateModified":"2018-06-09T19:05:18Z"},
{"id":108,"fileType":"video/msvideo","fileSize":33222623,"dateUploaded":"2017-08-05T23:43:37Z","dateModified":"2019-03-27T08:58:39Z"},
{"id":109,"fileType":"video/mpeg","fileSize":18189726,"dateUploaded":"2019-03-11T19:28:30Z","dateModified":"2018-06-04T09:45:24Z"},
{"id":110,"fileType":"audio/mpeg3","fileSize":9005363,"dateUploaded":"2018-02-07T16:35:32Z","dateModified":"2019-07-22T08:13:22Z"},
{"id":111,"fileType":"application/vnd.ms-powerpoint","fileSize":49631657,"dateUploaded":"2017-05-26T10:29:46Z","dateModified":"2018-09-15T17:24:31Z"},
{"id":112,"fileType":"image/gif","fileSize":13388184,"dateUploaded":"2017-06-10T04:47:52Z","dateModified":"2018-07-25T13:15:05Z"},
{"id":113,"fileType":"image/png","fileSize":5896640,"dateUploaded":"2017-12-23T03:32:14Z","dateModified":"2017-12-14T05:51:58Z"},
{"id":114,"fileType":"image/pjpeg","fileSize":9017737,"dateUploaded":"2017-07-13T01:15:55Z","dateModified":"2018-11-10T03:17:23Z"},
{"id":115,"fileType":"application/pdf","fileSize":43619288,"dateUploaded":"2016-11-20T10:17:31Z","dateModified":"2019-09-17T12:36:24Z"},
{"id":116,"fileType":"audio/mpeg3","fileSize":50105372,"dateUploaded":"2019-04-03T22:00:08Z","dateModified":"2019-07-21T00:15:42Z"},
{"id":117,"fileType":"video/x-msvideo","fileSize":41268478,"dateUploaded":"2016-12-02T04:55:14Z","dateModified":"2018-06-29T00:24:20Z"},
{"id":118,"fileType":"application/msword","fileSize":17932941,"dateUploaded":"2018-07-14T01:03:24Z","dateModified":"2018-01-08T15:29:20Z"},
{"id":119,"fileType":"image/tiff","fileSize":23809197,"dateUploaded":"2019-06-25T02:40:23Z","dateModified":"2018-05-29T09:47:53Z"},
{"id":120,"fileType":"image/png","fileSize":73429464,"dateUploaded":"2018-04-05T14:14:44Z","dateModified":"2019-09-23T18:45:56Z"},
{"id":121,"fileType":"application/msword","fileSize":66692114,"dateUploaded":"2018-07-01T10:18:23Z","dateModified":"2019-06-12T15:17:23Z"},
{"id":122,"fileType":"application/x-excel","fileSize":40080447,"dateUploaded":"2018-04-07T03:22:28Z","dateModified":"2018-10-22T08:07:29Z"},
{"id":123,"fileType":"application/vnd.ms-powerpoint","fileSize":32195221,"dateUploaded":"2019-02-25T16:51:27Z","dateModified":"2018-03-11T23:55:02Z"},
{"id":124,"fileType":"video/msvideo","fileSize":77727711,"dateUploaded":"2018-05-19T02:26:44Z","dateModified":"2019-06-16T23:13:16Z"},
{"id":125,"fileType":"video/mpeg","fileSize":13016919,"dateUploaded":"2019-02-06T05:02:14Z","dateModified":"2019-09-03T08:55:37Z"},
{"id":126,"fileType":"video/x-msvideo","fileSize":174972,"dateUploaded":"2019-01-06T08:51:17Z","dateModified":"2018-04-23T07:26:12Z"},
{"id":127,"fileType":"application/x-msexcel","fileSize":3014494,"dateUploaded":"2017-11-26T16:57:17Z","dateModified":"2018-11-06T23:10:30Z"},
{"id":128,"fileType":"image/pjpeg","fileSize":8624030,"dateUploaded":"2017-07-30T04:59:32Z","dateModified":"2019-02-15T16:33:33Z"},
{"id":129,"fileType":"image/jpeg","fileSize":23874295,"dateUploaded":"2016-11-08T01:28:42Z","dateModified":"2018-11-10T09:09:09Z"},
{"id":130,"fileType":"audio/x-mpeg-3","fileSize":57273416,"dateUploaded":"2019-01-11T04:32:42Z","dateModified":"2017-12-15T00:48:29Z"},
{"id":131,"fileType":"application/x-excel","fileSize":42686313,"dateUploaded":"2017-07-07T14:39:42Z","dateModified":"2018-05-03T11:34:31Z"},
{"id":132,"fileType":"application/x-mspowerpoint","fileSize":73992070,"dateUploaded":"2017-09-18T12:59:48Z","dateModified":"2019-08-24T07:43:23Z"},
{"id":133,"fileType":"application/excel","fileSize":85866729,"dateUploaded":"2017-07-20T11:25:05Z","dateModified":"2018-06-24T04:44:41Z"},
{"id":134,"fileType":"application/powerpoint","fileSize":2926689,"dateUploaded":"2018-07-22T04:34:57Z","dateModified":"2019-05-31T00:25:30Z"},
{"id":135,"fileType":"video/mpeg","fileSize":74107905,"dateUploaded":"2018-07-22T22:50:10Z","dateModified":"2018-04-27T10:35:41Z"},
{"id":136,"fileType":"video/x-mpeg","fileSize":9239000,"dateUploaded":"2018-04-20T09:54:03Z","dateModified":"2019-03-31T18:11:10Z"},
{"id":137,"fileType":"video/x-msvideo","fileSize":87454382,"dateUploaded":"2017-02-16T16:00:50Z","dateModified":"2018-10-04T04:06:06Z"},
{"id":138,"fileType":"application/x-msexcel","fileSize":53136323,"dateUploaded":"2017-12-24T05:06:09Z","dateModified":"2019-03-14T00:57:08Z"},
{"id":139,"fileType":"image/png","fileSize":14087185,"dateUploaded":"2017-01-15T09:29:37Z","dateModified":"2019-01-29T11:18:42Z"},
{"id":140,"fileType":"image/pjpeg","fileSize":52457508,"dateUploaded":"2019-06-20T19:19:15Z","dateModified":"2019-01-05T21:27:30Z"},
{"id":141,"fileType":"application/powerpoint","fileSize":12632571,"dateUploaded":"2017-12-26T08:50:45Z","dateModified":"2017-11-08T03:35:34Z"},
{"id":142,"fileType":"image/pjpeg","fileSize":99471628,"dateUploaded":"2017-06-13T05:21:47Z","dateModified":"2018-06-19T07:57:47Z"},
{"id":143,"fileType":"application/x-excel","fileSize":90035996,"dateUploaded":"2019-01-31T09:09:32Z","dateModified":"2019-08-18T17:22:38Z"},
{"id":144,"fileType":"video/mpeg","fileSize":64325167,"dateUploaded":"2019-02-15T11:16:08Z","dateModified":"2017-10-25T08:05:50Z"},
{"id":145,"fileType":"application/x-msexcel","fileSize":89271978,"dateUploaded":"2018-12-25T23:57:09Z","dateModified":"2018-06-23T18:32:07Z"},
{"id":146,"fileType":"application/mspowerpoint","fileSize":42835652,"dateUploaded":"2019-03-13T03:42:57Z","dateModified":"2018-08-10T11:30:41Z"},
{"id":147,"fileType":"application/msword","fileSize":54566844,"dateUploaded":"2019-06-23T20:40:09Z","dateModified":"2018-05-14T03:18:20Z"},
{"id":148,"fileType":"application/x-troff-msvideo","fileSize":24384523,"dateUploaded":"2017-02-27T11:17:06Z","dateModified":"2019-04-18T02:50:18Z"},
{"id":149,"fileType":"application/x-msexcel","fileSize":93247111,"dateUploaded":"2017-02-02T10:17:27Z","dateModified":"2019-02-17T10:29:42Z"},
{"id":150,"fileType":"application/pdf","fileSize":23162659,"dateUploaded":"2016-12-19T07:57:52Z","dateModified":"2018-04-25T06:07:47Z"},
{"id":151,"fileType":"image/pjpeg","fileSize":78661240,"dateUploaded":"2019-04-29T02:40:08Z","dateModified":"2018-08-20T11:48:44Z"},
{"id":152,"fileType":"audio/mpeg3","fileSize":26153663,"dateUploaded":"2019-06-23T17:31:48Z","dateModified":"2018-09-27T04:38:46Z"},
{"id":153,"fileType":"application/powerpoint","fileSize":71869297,"dateUploaded":"2017-08-01T14:10:23Z","dateModified":"2018-03-24T03:31:04Z"},
{"id":154,"fileType":"video/quicktime","fileSize":76212286,"dateUploaded":"2018-12-22T05:08:37Z","dateModified":"2018-07-30T21:39:23Z"},
{"id":155,"fileType":"audio/mpeg3","fileSize":86656741,"dateUploaded":"2017-08-07T23:55:24Z","dateModified":"2019-06-29T10:31:53Z"},
{"id":156,"fileType":"image/tiff","fileSize":34681194,"dateUploaded":"2018-07-10T14:24:09Z","dateModified":"2017-11-19T10:23:53Z"},
{"id":157,"fileType":"application/mspowerpoint","fileSize":5344656,"dateUploaded":"2019-05-07T07:50:19Z","dateModified":"2019-01-07T08:39:32Z"},
{"id":158,"fileType":"image/pjpeg","fileSize":37614274,"dateUploaded":"2017-08-31T08:34:28Z","dateModified":"2018-06-25T17:44:09Z"},
{"id":159,"fileType":"text/plain","fileSize":87123341,"dateUploaded":"2019-07-13T02:35:37Z","dateModified":"2018-06-24T13:48:43Z"},
{"id":160,"fileType":"image/png","fileSize":15693198,"dateUploaded":"2019-05-28T22:04:01Z","dateModified":"2019-02-09T08:14:25Z"},
{"id":161,"fileType":"image/pjpeg","fileSize":49257154,"dateUploaded":"2019-09-07T10:07:03Z","dateModified":"2017-11-18T02:55:18Z"},
{"id":162,"fileType":"image/png","fileSize":99442863,"dateUploaded":"2019-10-02T21:07:04Z","dateModified":"2019-03-08T10:19:06Z"},
{"id":163,"fileType":"application/excel","fileSize":44666275,"dateUploaded":"2017-11-28T08:35:58Z","dateModified":"2018-09-10T17:53:42Z"},
{"id":164,"fileType":"image/jpeg","fileSize":95660427,"dateUploaded":"2018-02-05T14:41:03Z","dateModified":"2018-01-01T00:57:23Z"},
{"id":165,"fileType":"application/powerpoint","fileSize":32147882,"dateUploaded":"2017-12-27T02:01:12Z","dateModified":"2018-10-17T14:55:47Z"},
{"id":166,"fileType":"image/jpeg","fileSize":31062133,"dateUploaded":"2019-05-30T11:52:40Z","dateModified":"2018-07-30T03:00:35Z"},
{"id":167,"fileType":"video/mpeg","fileSize":56930939,"dateUploaded":"2018-04-22T17:23:47Z","dateModified":"2018-04-09T22:16:39Z"},
{"id":168,"fileType":"video/quicktime","fileSize":67238656,"dateUploaded":"2017-10-19T18:08:24Z","dateModified":"2019-06-27T08:15:42Z"},
{"id":169,"fileType":"video/msvideo","fileSize":33241375,"dateUploaded":"2018-01-30T12:36:59Z","dateModified":"2019-10-02T22:35:19Z"},
{"id":170,"fileType":"video/x-msvideo","fileSize":3624705,"dateUploaded":"2019-04-09T18:07:09Z","dateModified":"2019-02-01T20:39:33Z"},
{"id":171,"fileType":"video/avi","fileSize":15156529,"dateUploaded":"2018-07-01T05:33:20Z","dateModified":"2018-02-13T07:32:32Z"},
{"id":172,"fileType":"video/mpeg","fileSize":30574010,"dateUploaded":"2017-11-14T12:33:09Z","dateModified":"2018-03-26T02:06:31Z"},
{"id":173,"fileType":"application/x-troff-msvideo","fileSize":24174175,"dateUploaded":"2018-03-15T11:48:58Z","dateModified":"2019-03-10T01:55:51Z"},
{"id":174,"fileType":"audio/mpeg3","fileSize":35457386,"dateUploaded":"2018-04-21T05:38:01Z","dateModified":"2018-09-09T12:56:02Z"},
{"id":175,"fileType":"image/jpeg","fileSize":84348041,"dateUploaded":"2017-09-17T03:07:00Z","dateModified":"2018-03-20T05:58:20Z"},
{"id":176,"fileType":"video/quicktime","fileSize":38904255,"dateUploaded":"2016-12-29T07:41:38Z","dateModified":"2018-01-16T12:39:13Z"},
{"id":177,"fileType":"application/x-msexcel","fileSize":59574795,"dateUploaded":"2019-01-30T09:10:00Z","dateModified":"2018-12-18T02:43:57Z"},
{"id":178,"fileType":"application/mspowerpoint","fileSize":59228120,"dateUploaded":"2016-10-14T10:29:28Z","dateModified":"2019-03-10T03:23:03Z"},
{"id":179,"fileType":"video/quicktime","fileSize":51841359,"dateUploaded":"2018-01-26T02:48:33Z","dateModified":"2018-03-28T15:37:21Z"},
{"id":180,"fileType":"image/pjpeg","fileSize":89524854,"dateUploaded":"2017-10-23T22:25:16Z","dateModified":"2019-05-03T08:48:47Z"},
{"id":181,"fileType":"image/jpeg","fileSize":58369383,"dateUploaded":"2018-02-27T16:13:15Z","dateModified":"2018-11-26T06:37:07Z"},
{"id":182,"fileType":"application/powerpoint","fileSize":71208945,"dateUploaded":"2019-04-06T18:23:39Z","dateModified":"2019-02-10T20:18:54Z"},
{"id":183,"fileType":"application/pdf","fileSize":4232508,"dateUploaded":"2019-03-09T15:08:47Z","dateModified":"2019-05-07T07:40:22Z"},
{"id":184,"fileType":"audio/x-mpeg-3","fileSize":47728311,"dateUploaded":"2018-06-19T13:23:11Z","dateModified":"2018-04-15T11:03:37Z"},
{"id":185,"fileType":"application/vnd.ms-powerpoint","fileSize":86257718,"dateUploaded":"2018-02-15T12:26:51Z","dateModified":"2019-08-30T22:28:51Z"},
{"id":186,"fileType":"application/x-troff-msvideo","fileSize":14185850,"dateUploaded":"2019-01-02T09:28:08Z","dateModified":"2018-06-03T00:52:52Z"},
{"id":187,"fileType":"application/mspowerpoint","fileSize":30596562,"dateUploaded":"2017-10-23T08:25:43Z","dateModified":"2018-09-07T23:05:57Z"},
{"id":188,"fileType":"text/plain","fileSize":1209200,"dateUploaded":"2019-09-21T16:57:40Z","dateModified":"2019-07-28T00:24:18Z"},
{"id":189,"fileType":"application/excel","fileSize":50676388,"dateUploaded":"2017-11-12T13:06:28Z","dateModified":"2019-04-18T16:36:52Z"},
{"id":190,"fileType":"application/powerpoint","fileSize":56868509,"dateUploaded":"2018-02-25T22:04:02Z","dateModified":"2019-01-16T07:19:02Z"},
{"id":191,"fileType":"image/jpeg","fileSize":10073235,"dateUploaded":"2018-04-01T23:29:58Z","dateModified":"2018-05-12T22:06:25Z"},
{"id":192,"fileType":"video/x-mpeg","fileSize":32285305,"dateUploaded":"2018-10-26T21:32:16Z","dateModified":"2017-11-18T11:45:33Z"},
{"id":193,"fileType":"image/tiff","fileSize":58210291,"dateUploaded":"2017-11-24T04:54:03Z","dateModified":"2019-05-16T10:40:52Z"},
{"id":194,"fileType":"application/vnd.ms-excel","fileSize":63227999,"dateUploaded":"2017-09-14T01:01:15Z","dateModified":"2018-08-16T17:53:01Z"},
{"id":195,"fileType":"application/msword","fileSize":50385469,"dateUploaded":"2019-06-20T12:47:10Z","dateModified":"2018-09-14T07:55:50Z"},
{"id":196,"fileType":"video/mpeg","fileSize":60092165,"dateUploaded":"2016-11-25T22:00:20Z","dateModified":"2018-06-09T08:59:32Z"},
{"id":197,"fileType":"application/x-msexcel","fileSize":53696825,"dateUploaded":"2018-03-15T21:28:54Z","dateModified":"2017-12-12T08:02:09Z"},
{"id":198,"fileType":"image/jpeg","fileSize":58308901,"dateUploaded":"2017-10-05T09:44:00Z","dateModified":"2018-08-03T18:25:33Z"},
{"id":199,"fileType":"application/pdf","fileSize":33882809,"dateUploaded":"2019-07-21T12:05:06Z","dateModified":"2018-08-16T11:53:45Z"},
{"id":200,"fileType":"image/x-tiff","fileSize":64410777,"dateUploaded":"2019-05-06T12:59:03Z","dateModified":"2018-12-14T03:49:10Z"},
{"id":201,"fileType":"image/gif","fileSize":22655001,"dateUploaded":"2017-12-16T09:02:52Z","dateModified":"2019-07-07T21:27:27Z"},
{"id":202,"fileType":"video/x-msvideo","fileSize":22359267,"dateUploaded":"2018-03-10T00:40:56Z","dateModified":"2019-02-17T15:01:19Z"},
{"id":203,"fileType":"video/quicktime","fileSize":88371065,"dateUploaded":"2018-04-03T03:02:07Z","dateModified":"2018-04-24T14:14:45Z"},
{"id":204,"fileType":"application/excel","fileSize":67712720,"dateUploaded":"2018-01-18T15:04:58Z","dateModified":"2018-04-21T15:38:03Z"},
{"id":205,"fileType":"video/x-mpeg","fileSize":65643364,"dateUploaded":"2017-10-01T02:17:32Z","dateModified":"2018-10-19T09:14:49Z"},
{"id":206,"fileType":"application/pdf","fileSize":29694241,"dateUploaded":"2019-01-26T17:18:54Z","dateModified":"2019-03-26T20:30:59Z"},
{"id":207,"fileType":"application/x-mspowerpoint","fileSize":34277105,"dateUploaded":"2018-04-26T17:05:53Z","dateModified":"2019-03-08T06:22:58Z"},
{"id":208,"fileType":"video/quicktime","fileSize":25453340,"dateUploaded":"2018-03-19T12:27:40Z","dateModified":"2019-03-20T13:52:35Z"},
{"id":209,"fileType":"image/x-tiff","fileSize":59098536,"dateUploaded":"2018-11-14T04:29:04Z","dateModified":"2019-06-06T15:25:32Z"},
{"id":210,"fileType":"application/x-msexcel","fileSize":32134973,"dateUploaded":"2017-09-18T15:54:40Z","dateModified":"2018-10-01T03:13:18Z"},
{"id":211,"fileType":"video/avi","fileSize":28486806,"dateUploaded":"2019-03-05T09:14:32Z","dateModified":"2018-09-29T23:55:06Z"},
{"id":212,"fileType":"application/x-msexcel","fileSize":91193552,"dateUploaded":"2017-01-20T05:45:03Z","dateModified":"2019-09-20T23:30:16Z"},
{"id":213,"fileType":"image/png","fileSize":16378794,"dateUploaded":"2017-07-15T13:13:24Z","dateModified":"2017-10-25T13:26:39Z"},
{"id":214,"fileType":"video/avi","fileSize":55051390,"dateUploaded":"2017-12-08T11:52:31Z","dateModified":"2018-01-30T21:49:30Z"},
{"id":215,"fileType":"video/quicktime","fileSize":13390900,"dateUploaded":"2018-05-31T10:20:37Z","dateModified":"2017-10-28T19:09:49Z"},
{"id":216,"fileType":"application/excel","fileSize":10124798,"dateUploaded":"2019-09-30T04:30:54Z","dateModified":"2019-09-03T09:14:02Z"},
{"id":217,"fileType":"audio/x-mpeg-3","fileSize":78372561,"dateUploaded":"2018-03-24T08:54:50Z","dateModified":"2019-07-19T03:49:28Z"},
{"id":218,"fileType":"audio/x-mpeg-3","fileSize":88942719,"dateUploaded":"2019-04-11T02:58:29Z","dateModified":"2018-10-16T10:25:40Z"},
{"id":219,"fileType":"video/avi","fileSize":84792038,"dateUploaded":"2018-01-17T19:15:03Z","dateModified":"2018-02-03T23:45:57Z"},
{"id":220,"fileType":"application/x-excel","fileSize":17863020,"dateUploaded":"2019-03-16T01:11:07Z","dateModified":"2018-06-18T22:49:36Z"},
{"id":221,"fileType":"application/msword","fileSize":84146046,"dateUploaded":"2017-08-30T20:20:24Z","dateModified":"2018-08-18T16:25:09Z"},
{"id":222,"fileType":"audio/x-mpeg-3","fileSize":74935154,"dateUploaded":"2019-05-02T21:01:43Z","dateModified":"2018-04-08T05:22:20Z"},
{"id":223,"fileType":"application/x-mspowerpoint","fileSize":54900375,"dateUploaded":"2019-04-08T01:06:38Z","dateModified":"2018-12-06T09:01:37Z"},
{"id":224,"fileType":"application/pdf","fileSize":69007096,"dateUploaded":"2019-09-17T08:07:09Z","dateModified":"2018-02-15T15:48:29Z"},
{"id":225,"fileType":"video/avi","fileSize":11541819,"dateUploaded":"2017-08-02T23:02:07Z","dateModified":"2019-06-27T16:40:30Z"},
{"id":226,"fileType":"application/x-msexcel","fileSize":11163619,"dateUploaded":"2019-05-11T20:01:21Z","dateModified":"2019-10-07T12:42:23Z"},
{"id":227,"fileType":"application/x-troff-msvideo","fileSize":52716178,"dateUploaded":"2018-01-29T10:58:06Z","dateModified":"2018-07-07T11:00:34Z"},
{"id":228,"fileType":"video/avi","fileSize":33753503,"dateUploaded":"2018-01-25T22:17:28Z","dateModified":"2019-02-14T13:58:35Z"},
{"id":229,"fileType":"image/tiff","fileSize":56159860,"dateUploaded":"2017-11-20T19:36:59Z","dateModified":"2018-08-11T14:53:13Z"},
{"id":230,"fileType":"video/avi","fileSize":20231278,"dateUploaded":"2017-02-05T21:37:09Z","dateModified":"2019-04-10T00:34:42Z"},
{"id":231,"fileType":"video/mpeg","fileSize":10612300,"dateUploaded":"2017-06-04T02:25:14Z","dateModified":"2018-04-17T06:30:17Z"},
{"id":232,"fileType":"video/x-mpeg","fileSize":38578569,"dateUploaded":"2019-04-21T18:35:34Z","dateModified":"2018-03-18T12:19:57Z"},
{"id":233,"fileType":"application/x-mspowerpoint","fileSize":89992326,"dateUploaded":"2018-11-19T20:31:07Z","dateModified":"2018-01-27T14:44:56Z"},
{"id":234,"fileType":"application/powerpoint","fileSize":20371744,"dateUploaded":"2018-08-16T08:20:20Z","dateModified":"2017-11-08T16:34:40Z"},
{"id":235,"fileType":"image/pjpeg","fileSize":50431381,"dateUploaded":"2018-04-20T12:42:00Z","dateModified":"2018-07-05T05:33:53Z"},
{"id":236,"fileType":"video/mpeg","fileSize":32074387,"dateUploaded":"2018-05-05T10:53:16Z","dateModified":"2018-05-25T19:07:20Z"},
{"id":237,"fileType":"video/quicktime","fileSize":84613218,"dateUploaded":"2018-07-15T01:16:18Z","dateModified":"2019-02-01T19:56:34Z"},
{"id":238,"fileType":"application/x-excel","fileSize":16475594,"dateUploaded":"2016-10-21T01:02:19Z","dateModified":"2017-12-23T06:13:09Z"},
{"id":239,"fileType":"video/mpeg","fileSize":16775939,"dateUploaded":"2017-02-16T07:14:43Z","dateModified":"2019-06-09T14:25:13Z"},
{"id":240,"fileType":"image/png","fileSize":47501706,"dateUploaded":"2017-10-17T17:36:16Z","dateModified":"2019-02-06T14:52:58Z"},
{"id":241,"fileType":"application/x-troff-msvideo","fileSize":89735512,"dateUploaded":"2016-12-03T17:37:56Z","dateModified":"2019-02-25T12:02:46Z"},
{"id":242,"fileType":"video/x-msvideo","fileSize":4247551,"dateUploaded":"2017-12-18T18:22:05Z","dateModified":"2019-09-03T22:41:12Z"},
{"id":243,"fileType":"text/plain","fileSize":5634469,"dateUploaded":"2018-08-26T03:12:24Z","dateModified":"2018-05-08T17:11:41Z"},
{"id":244,"fileType":"video/msvideo","fileSize":47333481,"dateUploaded":"2017-05-27T21:10:02Z","dateModified":"2019-02-03T19:19:44Z"},
{"id":245,"fileType":"application/x-msexcel","fileSize":42919359,"dateUploaded":"2017-06-17T00:52:45Z","dateModified":"2017-12-22T10:11:55Z"},
{"id":246,"fileType":"text/plain","fileSize":28512524,"dateUploaded":"2017-10-23T08:26:05Z","dateModified":"2017-11-01T14:26:15Z"},
{"id":247,"fileType":"image/x-tiff","fileSize":90164334,"dateUploaded":"2019-06-21T21:35:29Z","dateModified":"2017-12-22T21:02:52Z"},
{"id":248,"fileType":"audio/x-mpeg-3","fileSize":93880333,"dateUploaded":"2016-11-19T21:37:01Z","dateModified":"2019-06-18T19:38:19Z"},
{"id":249,"fileType":"audio/x-mpeg-3","fileSize":87681744,"dateUploaded":"2018-03-13T14:00:28Z","dateModified":"2018-10-16T00:03:14Z"},
{"id":250,"fileType":"application/x-msexcel","fileSize":5689188,"dateUploaded":"2019-02-11T02:08:08Z","dateModified":"2018-11-30T17:44:48Z"}];
