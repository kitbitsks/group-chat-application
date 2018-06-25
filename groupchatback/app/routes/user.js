const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;


    app.get(`${baseUrl}/view/all`,userController.getAllUser);
        /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/view/all api to view all users of groupchat.
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {    
                "error": false,
                "message": "All Users Detail found",
                "status": 200,
                "data": [{
                            "__v": 0,
                            "_id": "5b2f9efbe2ede52ed8a6867f",
                            "createdOn": "2018-06-24T13:39:07.000Z",
                            "mobileNumber": 9345325643,
                            "email": "shubham.singh1@gmail.com",
                            "lastName": "Singh",
                            "firstName": "Shubham",
                            "userId": "r1QbkXpb7
                        },
                        {

                            "createdOn": "2018-05-20T12:30:26.000Z",
                            "mobileNumber": 123456,
                            "email": "sagar@xyz.com",
                            "password": "$2a$10$auRh3LLqdjTvjbi70vGUBuPpbQZUISI2Cip0uLmnxbutI/vr79nCS",
                            "lastName": "sri",
                            "firstName": "sagar",
                            "userId": "r15wc1yyQ"
                        }
                    ]
   */



    app.get(`${baseUrl}/:userId/details`, auth.isAuthorized, userController.getSingleUser);
        /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/:userId/details api for single user details.
     *
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {    
                "error": false,
                "message": "User created",
                "status": 200,
                "data": {
                            "__v": 0,
                            "_id": "5b2f9efbe2ede52ed8a6867f",
                            "createdOn": "2018-06-24T13:39:07.000Z",
                            "mobileNumber": 9345325643,
                            "email": "shubham.singh1@gmail.com",
                            "lastName": "Singh",
                            "firstName": "Shubham",
                            "userId": "r1QbkXpb7
                        }
                    }
                }
            }
        }
    }
    
   @apiErrorExample {json} Error-Response:
   *
   * {
        "error": true,
        "message": "One or More Parameter(s) is missing",
        "status": 400,
        "data": null
}
   */

    
    
    app.post(`${baseUrl}/signup`, userController.signUpFunction);
        /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for user signup.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} firstName firstName of the user. (body params) (optional)
     * @apiParam {string} lastName lastName of the user. (body params) (optional)
     * @apiParam {string} mobileNumber mobileNumber of the user. (body params) (optional)
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {    
                "error": false,
                "message": "User created",
                "status": 200,
                "data": {
                            "__v": 0,
                            "_id": "5b2f9efbe2ede52ed8a6867f",
                            "createdOn": "2018-06-24T13:39:07.000Z",
                            "mobileNumber": 9345325643,
                            "email": "shubham.singh1@gmail.com",
                            "lastName": "Singh",
                            "firstName": "Shubham",
                            "userId": "r1QbkXpb7
                        }
                    }
                }
            }
        }
    }
    
   @apiErrorExample {json} Error-Response:
   *
   * {
        "error": true,
        "message": "One or More Parameter(s) is missing",
        "status": 400,
        "data": null
}
   */


    app.post(`${baseUrl}/login`, userController.loginFunction);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "mobileNumber": "987654321",
                "userId": "BkwCjzTbX"
            }

        }
    
   @apiErrorExample {json} Error-Response:
   *
   * {
        "error": true,
        "message": "Login Failed",
        "status": 500,
        "data": null
}
   */


    app.put(`${baseUrl}/:userId/edit`, userController.editUser);
        /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {put} /api/v1/users/:userId/edit api for editing user.
     *
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {    
                        "error": false,
                        "message": "User details edited",
                        "status": 200,
                        "data": {
                        "n": 0,
                        "nModified": 0,
                        "ok": 1
                        }
                    }
                }
            }
        }
    }
    
*/

    app.post(`${baseUrl}/:userId/delete`, auth.isAuthorized, userController.deleteUser);
        /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/:userId/delete api for user deletion.
     *
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, .
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Deleted the user successfully",
                "status": 200
            }
        }
    }
}
   @apiErrorExample {json} Error-Response:
   *
   * {
            "error": true,
            "message": "No User Found",
            "status": 404,
            "data": null

}
   */

    

    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);
            /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout api for user logging out.
     *
     * @apiParam {string} authToken authToken of the user. (body params) (required))
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null
        }
    }
}

   @apiErrorExample {json} Error-Response:
   *
   * {
        "error": true,
        "message": "Invalid Or Expired AuthorizationKey",
        "status": 404,
        "data": null
}
   */

    app.post(`${baseUrl}/sntmail`, userController.forgotPassword);
            /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/sntmail api for sending verification code.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Verification Code sent successfully",
            "status": 200
}    
   @apiErrorExample {json} Error-Response:
   *
   * {
        "error": true,
        "message": "No user found",
        "status": 404,
        "data": null
}
   */

    

}
