/**
 * Created by dirk on 04/08/2016.
 * Edited by silas on 07/26/2019
 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var http = require('http');
var request = require('request');

var app = express();
var upload = multer(); // for parsing multipart/form-data

// @ts-ignore
app.use(bodyParser.json({limit: '10mb', extended: true})); // for parsing application/json
//app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

const baseUrl="/rest";

app.get('',function(req, res){
	res.status(200);

    res.send();
})


function getRandomData(year){
	console.log(year)
	const date=year+'-01-01T00:00:00'
	const endDate=new Date(year+'-12-31T23:45:00')
	let startDate=new Date(date)
	let data=[]
	console.log(endDate.toString())
while( startDate.valueOf()!==endDate.valueOf()){
	const min=Math.random()*(8.768-2.35474)+2.35474
	data.push([startDate.valueOf(),(Math.random()*1.47484+min)])
	startDate.setTime(startDate.getTime()+(15*60*1000))
}
data.push([startDate.valueOf(),(Math.random()*(8.67-6.947)+6.947)])
return data

}

app.get('/rest/test',function(req, res){
	console.log('TEST');
	res.status(200);

	res.send();
	});


app.get(baseUrl+'/data',function(req, res){
	console.log(req.query);
	let data1=getRandomData(req.query.year)
	let tsdata={
		country: req.query.country,
		sector:req.query.sector,
		year:req.query.year,
		data: data1
	}
	res.status(200);
	res.send(JSON.stringify(tsdata));
});

// app.post(streamURL + '/new', upload.array(), function(req, res) {
// 	var stream = req.body;

// 	stream.id = scheduledStreams.length + liveStreams.length;
// 	stream.streamKey = getStreamKey(stream.title);
// 	stream.status = 'Scheduled';

// 	stream.videoLink = {};

// 	stream.participants = {};
// 	stream.participants.registrations = 0;

// 	let speakerIds = [];
// 	for(var s of stream.speakers) {
// 		for(var person of persons) {
// 			if(person.id === s.id) {
// 				speakerIds.push(person.id);
// 			}
// 		}
// 	}
// 	stream.speakers = speakerIds;

// 	let categoryIds = [];
// 	for(var c of stream.categories) {
// 		for(var category of categories) {
// 			if(category.id === c.id) {
// 				categoryIds.push(category.id);
// 			}
// 		}
// 	}
// 	stream.categories = categoryIds;

// 	stream.date = stream.scheduledDateTime;
// 	delete stream.scheduledDateTime;

// 	if(stream.thumbnail == null || stream.thumbnail === '') {
// 		stream.thumbnail = getThumbnail('thumbnail_default.png');
// 	}

// 	scheduledStreams.push(stream);


// 	logDebug('POST scheduled stream with id ' + stream.id);

// 	res.send(JSON.stringify(true));
// 	res.end();
// });


// app.get(streamURL + '/scheduled/person/:id', function(req, res) {
// 	var id = req.params.id;
// 	var person = getPersonById(id);

// 	if(person != null) {
// 		var personStreams = [];
// 		for(var stream of scheduledStreams) {
// 			if(stream.speakers.filter(s => person.id === s).length > 0) {
// 				personStreams.push(stream);
// 			}
// 		}

// 		logDebug('GET all scheduled streams of person with id ' + id);

// 		personStreams = convertContent(personStreams);

// 		res.status(200);
// 		res.end(JSON.stringify(personStreams));
// 	} else {
// 		logError('ERROR in GET all scheduled streams of person with id ' + id + ': Person not found!');

// 		res.status(404);
// 		res.end();
// 	}
// });

// app.get(streamURL + '/streamKey/:title/:date', function(req, res) {
// 	var title = req.params.title;
// 	var date = req.params.date;

// 	var streamKey = getStreamKey(title);

// 	logDebug('GET stream-key of stream with title \'' + title + '\' and date \'' + date + '\'');

// 	res.status(200);
// 	res.set('Content-Type', 'text/plain; charset=utf-8');
// 	res.end(streamKey);
// });





var server = app.listen(8081, function () {
    try {
			
				// var host = server.address().address;
				
        // var port = server.address().port;
        // console.log('Application registry listening at http://%s:%s', host, port)
    } catch (err) {
        console.log(err);
    }
});