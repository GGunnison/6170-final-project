// Author: Grant Gunnison, Sam Edson

var router   = require('express').Router();
var utils    = require('../utils/utils.js');
var assert   = require('assert');
var mongoose = require('mongoose');

var Student   = require('../../app/models/StudentModel');
var Employer  = require('../../app/models/EmployerModel');
var Async     = require('../../node_modules/async/lib/async');
var Message   = require('../../app/models/MessageModel');
var ObjectId  = mongoose.Schema.Types.ObjectId;


/* Get all of the users messages
*
* GET /messages/
*
*  Response:
*    - success: 200:
*        if the messages were found and sent
*    - error 500:
*        there was an error with one of the user objects
*
*	Objects to deal with inside of each user
*
*	mailbox  : {
*	                inbox   : [{type: ObjectId, ref: 'Message'}],
*                  sentbox : [{type: ObjectId, ref: 'Message'}]
*	               }
*
*	Message : {
*	              to  : String,     //Reciever of message
*	              from  : String,   //Sender of message
*	              title : String,   //title of message
*	              body  : String    //content of message
*
*	          }
*
*/
router.get('/', utils.isLoggedIn, function(req, res){
	if (req.user.__t === "Employer"){
		Employer.findById(req.user._id)
			.populate("mailbox.inbox")
			.populate('mailbox.sentbox')
			.exec(function(err, employer){
				if (err) {
          console.log(err);
          utils.sendErrResponse(res, 500, null);
        } else {
          res.render('messages.jade', employer.mailbox);
        }
    });
	}
  if (req.user.__t === "Student"){
		Student.findById(req.user._id)
			.populate("mailbox.inbox")
			.populate('mailbox.sentbox')
			.exec(function(err, student){
				if (err) {
          console.log(err);
          utils.sendErrResponse(res, 500, null);
        } else{
          res.render('messages.jade', student.mailbox);
        }
    });
	}
});

/* Get all of the users sent messages
*
* GET /messages/sentbox
*
*  Response:
*    - success: 200:
*        if the messages were found and sent
*    - error 500:
*        there was an error with one of the user objects
*/
router.get('/sentbox', utils.isLoggedIn, function(req, res){
	if (req.user.__t === "Employer"){
		Employer.findById(req.user._id)
			.populate('mailbox.sentbox')
			.exec(function(err, employer){
				if (err) {
          console.log(err);
          utils.sendErrResponse(res, 500, null);
        } else{
				  utils.sendSuccessResponse(res, employer.mailbox.sentbox);
        }
    });
	}
  if (req.user.__t == "Student"){
		Student.findById(req.user._id)
			.populate('mailbox.sentbox')
			.exec(function(err, student){
				if (err) {
          console.log(err);
          utils.sendErrResponse(res, 500, null);
        } else{
				  utils.sendSuccessResponse(res, student.mailbox.sentbox);
		    }
    });
	}
});


/* Get all of the messages sent to an user
*
* GET /messages/inbox
*
* Params:
* 	- userID
* 		_id to find an user
*  Response:
*    - success: 200:
*        if the messages were found and sent
*    - error 500:
*        there was an error with one of the user objects
*/
router.get('/inbox', utils.isLoggedIn, function(req, res){
	if (req.user.__t === "Employer"){
		Employer.findById(req.user._id)
			.populate('mailbox.inbox')
			.exec(function(err, employer){
				if (err) {
          console.log(err);
          utils.sendErrResponse(res, 500, null);
        } else {
				  utils.sendSuccessResponse(res, employer.mailbox.inbox);
        }
    });
	}
  if (req.user.__t == "Student"){
		Student.findById(req.user._id)
			.populate('mailbox.inbox')
			.exec(function(err, student){
				if (err) {
          console.log(err);
          utils.sendErrResponse(res, 500, null);
        } else {
				  utils.sendSuccessResponse(res, student.mailbox.inbox);
        }
    });
	}
});

/* Send a new message
*
* POST /messages/:recipientID
*
* Params:
* 	- to
* 		  Name of the recipient
*   - title
*       Message title
*   - content
*       Message body
* Response:
*    - success: 200:
*        if the messages were found and sent
*    - error 500:
*        there was an error with one of the user objects
*/
router.post('/:recipientID', utils.isLoggedIn, function(req, res){
	new Message({
    to      : req.body.to,
		toId    : req.params.recipientID,
    from    : req.user.name,
		fromId  : req.user._id,
		title   : req.body.title,
		content : req.body.content
	}).save(function(err, message) {
		if (req.user.__t === "Employer") {
			//Update the receivers info
			Student.findByIdAndUpdate(req.params.recipientID,
				{$push : {'mailbox.inbox': message._id}})
				.exec(function(err, student){
				  if (err) {
            console.log(err);
            utils.sendErrResponse(res, 500, null);
          }
      });
			//Update the senders info
			Employer.findByIdAndUpdate({_id : req.user._id},
				{$push: {'mailbox.sentbox' : message._id}})
				.exec(function(err, employer){
					if (err) {
						console.log(err);
						utils.sendErrResponse(res, 500, null);
					}	else {
						utils.sendSuccessResponse(res, employer.mailbox.sentbox);
          }
      });
    }
    if (req.user.__t === "Student"){
			//Update the receivers info
			Employer.findByIdAndUpdate(req.params.recipientID,
				{$push : {'mailbox.inbox': message._id}})
				.exec(function(err, employer){
					if (err) {
            console.log(err);
            utils.sendErrResponse(res, 500, null);
          }
      });
			//Update the senders info
			Student.findByIdAndUpdate({_id : req.user._id},
				{$push : {'mailbox.sentbox' : message._id}})
				.exec(function(err, student){
					if (err) {
            console.log(err);
            utils.sendErrResponse(res, 500, null);
          } else {
            console.log(student.mailbox.sentbox);
            utils.sendSuccessResponse(res, student.mailbox.sentbox);
          }
      });
		}
	});
});

/* Delete a message from an inbox
*
* DELETE /messages/inbox/:recipientID
*
* Params:
* 	- messageId
* 		  Id of the message to be deleted
* Response:
*    - success: 200:
*        if the messages were found and sent
*    - error 500:
*        there was an error with one of the user objects
*/
router.delete('/inbox/:messageId', function(req, res){
  var userID = req.user._id
  var messageId = req.params.messageId
  var type = req.user.__t;

  if (type === "Employer"){
    Employer.findByIdAndUpdate({_id : userID},
      {$pull : {'mailbox.inbox' : messageId}})
      .exec(function(err, employer){
        if (err) {
          console.log(err);
          utils.sendErrResponse(res, 500, null);
        } else {
          utils.sendSuccessResponse(res, employer.mailbox.inbox);
        }
    });
  }
  if (type === "Student"){
    Student.findByIdAndUpdate({_id : userID},
      {$pull : {'mailbox.inbox' : messageId}})
      .exec(function(err, student){
        if (err) {
          console.log(err);
          utils.sendErrResponse(res, 500, null);
        } else {  
          utils.sendSuccessResponse(res, student.mailbox.inbox);
        }
    });
  }
});

/* Delete a message from a sentbox
*
* DELETE /messages/sentbox/:recipientID
*
* Params:
* 	- messageId
* 		  Id of the message to be deleted
* Response:
*    - success: 200:
*        if the messages were found and sent
*    - error 500:
*        there was an error with one of the user objects
*/
router.delete('/sentbox/:messageId', function(req, res){
  var userID = req.user._id
  var messageId = req.params.messageId
  var type = user.__t;

  if (type === "Employer"){
    Employer.findByIdAndUpdate({_id : userID},
      {$pull : {'mailbox.sentbox.' : messageId}})
      .exec(function(err, employer){
        if (err) {
          console.log(err);
          utils.sendErrResponse(res, 500, null);
        } else { 
          utils.sendSuccessResponse(res, employer.mailbox.sentbox);
        }
    });
  }
  if (type === "Student"){
    Student.findByIdAndUpdate(userID,
      {$pull : {'mailbox.sentbox' : messageId}})
      .exec(function(err, student){
        if (err) {
          console.log(err);
          utils.sendErrResponse(res, 500, null);
        } else{ 
          utils.sendSuccessResponse(res, student.mailbox.sentbox);
        }
    });
  }
});


module.exports = router;
