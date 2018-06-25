const express = require('express');
const router = express.Router();
const chatController = require("./../../app/controllers/chatController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

  let baseUrl = `${appConfig.apiVersion}/chat`;

  // params: senderId, receiverId, skip.
  app.get(`${baseUrl}/get/for/user`, auth.isAuthorized, chatController.getUsersChat);

  // params: chatRoom, skip.
  app.get(`${baseUrl}/get/for/group`, auth.isAuthorized, chatController.getGroupChat);
    /**
   * @apiGroup chat
   * @apiVersion  1.0.0
   * @api {get} /api/v1/chat/get/for/group to get paginated chats of group.
   * 
   * @apiParam {string} chatRoom roomName of group. (query params) (required)
   * @apiParam {string} authToken authToken of user. (query params) (required)
   * @apiParam {number} skip skip value for pagination. (query params) (optional)
   *
   * @apiSuccess {object} myResponse shows error status, message, http status code, data.
   * 
   * @apiSuccessExample {object} Success-Response:
      {
    "error": false,
    "message": "All Group Chats Listed",
    "status": 200,
    "data": [
        {
            "chatId": "rksn-RhWm",
            "modifiedOn": "2018-06-24T08:09:25.150Z",
            "createdOn": "2018-06-24T08:09:23.147Z",
            "seen": false,
            "chatRoom": "sksroom",
            "message": "hi",
            "senderId": "r1ccwpqRf",
            "senderName": "Sourav Kumar"
        },
        {
            "chatId": "SyP6bAhbm",
            "modifiedOn": "2018-06-24T08:09:36.821Z",
            "createdOn": "2018-06-24T08:09:34.819Z",
            "seen": false,
            "chatRoom": "sksroom",
            "message": "kya ho ra h\n",
            "senderId": "By-fWNz-m",
            "senderName": "gaurav aryan"
        },
        {
            "chatId": "HkY2v02W7",
            "modifiedOn": "2018-06-24T08:34:59.463Z",
            "createdOn": "2018-06-24T08:34:57.446Z",
            "seen": false,
            "chatRoom": "sksroom",
            "message": "hello",
            "senderId": "r1ccwpqRf",
            "senderName": "Sourav Kumar"
        },
        {
            "chatId": "SylFDlTZX",
            "modifiedOn": "2018-06-24T10:50:33.651Z",
            "createdOn": "2018-06-24T10:50:31.650Z",
            "seen": false,
            "chatRoom": "sksroom",
            "message": "hi",
            "senderId": "r1ccwpqRf",
            "senderName": "Sourav Kumar"
        },
        ......................................
        .........................
   @apiErrorExample {json} Error-Response:
   *
   *  {
          "error": true,
          "message": "No Chat Found",
          "status": 404,
          "data": null
}
 */


  // params: chatIdCsv.
  app.post(`${baseUrl}/mark/as/seen`, auth.isAuthorized, chatController.markChatAsSeen);

  app.get(`${baseUrl}/count/unseen`, auth.isAuthorized, chatController.countUnSeenChat);

  app.get(`${baseUrl}/find/unseen`, auth.isAuthorized, chatController.findUnSeenChat);

  app.get(`${baseUrl}/unseen/user/list`, auth.isAuthorized, chatController.findUserListOfUnseenChat);

}
