define({ "api": [
  {
    "group": "chat",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/chat/get/for/group",
    "title": "to get paginated chats of group.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "chatRoom",
            "description": "<p>roomName of group. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "skip",
            "description": "<p>skip value for pagination. (query params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n\"error\": false,\n\"message\": \"All Group Chats Listed\",\n\"status\": 200,\n\"data\": [\n    {\n        \"chatId\": \"rksn-RhWm\",\n        \"modifiedOn\": \"2018-06-24T08:09:25.150Z\",\n        \"createdOn\": \"2018-06-24T08:09:23.147Z\",\n        \"seen\": false,\n        \"chatRoom\": \"sksroom\",\n        \"message\": \"hi\",\n        \"senderId\": \"r1ccwpqRf\",\n        \"senderName\": \"Sourav Kumar\"\n    },\n    {\n        \"chatId\": \"SyP6bAhbm\",\n        \"modifiedOn\": \"2018-06-24T08:09:36.821Z\",\n        \"createdOn\": \"2018-06-24T08:09:34.819Z\",\n        \"seen\": false,\n        \"chatRoom\": \"sksroom\",\n        \"message\": \"kya ho ra h\\n\",\n        \"senderId\": \"By-fWNz-m\",\n        \"senderName\": \"gaurav aryan\"\n    },\n    {\n        \"chatId\": \"HkY2v02W7\",\n        \"modifiedOn\": \"2018-06-24T08:34:59.463Z\",\n        \"createdOn\": \"2018-06-24T08:34:57.446Z\",\n        \"seen\": false,\n        \"chatRoom\": \"sksroom\",\n        \"message\": \"hello\",\n        \"senderId\": \"r1ccwpqRf\",\n        \"senderName\": \"Sourav Kumar\"\n    },\n    {\n        \"chatId\": \"SylFDlTZX\",\n        \"modifiedOn\": \"2018-06-24T10:50:33.651Z\",\n        \"createdOn\": \"2018-06-24T10:50:31.650Z\",\n        \"seen\": false,\n        \"chatRoom\": \"sksroom\",\n        \"message\": \"hi\",\n        \"senderId\": \"r1ccwpqRf\",\n        \"senderName\": \"Sourav Kumar\"\n    },\n    ......................................\n    .........................",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n {\n          \"error\": true,\n          \"message\": \"No Chat Found\",\n          \"status\": 404,\n          \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/chat.js",
    "groupTitle": "chat",
    "name": "GetApiV1ChatGetForGroup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/details",
    "title": "api for single user details.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     {    \n            \"error\": false,\n            \"message\": \"User created\",\n            \"status\": 200,\n            \"data\": {\n                        \"__v\": 0,\n                        \"_id\": \"5b2f9efbe2ede52ed8a6867f\",\n                        \"createdOn\": \"2018-06-24T13:39:07.000Z\",\n                        \"mobileNumber\": 9345325643,\n                        \"email\": \"shubham.singh1@gmail.com\",\n                        \"lastName\": \"Singh\",\n                        \"firstName\": \"Shubham\",\n                        \"userId\": \"r1QbkXpb7\n                    }\n                }\n            }\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"message\": \"One or More Parameter(s) is missing\",\n        \"status\": 400,\n        \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUseridDetails"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/view/all",
    "title": "api to view all users of groupchat.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{    \n       \"error\": false,\n       \"message\": \"All Users Detail found\",\n       \"status\": 200,\n       \"data\": [{\n                   \"__v\": 0,\n                   \"_id\": \"5b2f9efbe2ede52ed8a6867f\",\n                   \"createdOn\": \"2018-06-24T13:39:07.000Z\",\n                   \"mobileNumber\": 9345325643,\n                   \"email\": \"shubham.singh1@gmail.com\",\n                   \"lastName\": \"Singh\",\n                   \"firstName\": \"Shubham\",\n                   \"userId\": \"r1QbkXpb7\n               },\n               {\n\n                   \"createdOn\": \"2018-05-20T12:30:26.000Z\",\n                   \"mobileNumber\": 123456,\n                   \"email\": \"sagar@xyz.com\",\n                   \"password\": \"$2a$10$auRh3LLqdjTvjbi70vGUBuPpbQZUISI2Cip0uLmnxbutI/vr79nCS\",\n                   \"lastName\": \"sri\",\n                   \"firstName\": \"sagar\",\n                   \"userId\": \"r15wc1yyQ\"\n               }\n           ]",
          "type": "object"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1ViewAll"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc\",\n        \"userDetails\": {\n        \"mobileNumber\": 2234435524,\n        \"email\": \"someone@mail.com\",\n        \"lastName\": \"Sengar\",\n        \"firstName\": \"Rishabh\",\n        \"mobileNumber\": \"987654321\",\n        \"userId\": \"BkwCjzTbX\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"message\": \"Login Failed\",\n        \"status\": 500,\n        \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "api for user logging out.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required))</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "        {\n            \"error\": false,\n            \"message\": \"Logged Out Successfully\",\n            \"status\": 200,\n            \"data\": null\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"message\": \"Invalid Or Expired AuthorizationKey\",\n        \"status\": 404,\n        \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user. (body params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     {    \n            \"error\": false,\n            \"message\": \"User created\",\n            \"status\": 200,\n            \"data\": {\n                        \"__v\": 0,\n                        \"_id\": \"5b2f9efbe2ede52ed8a6867f\",\n                        \"createdOn\": \"2018-06-24T13:39:07.000Z\",\n                        \"mobileNumber\": 9345325643,\n                        \"email\": \"shubham.singh1@gmail.com\",\n                        \"lastName\": \"Singh\",\n                        \"firstName\": \"Shubham\",\n                        \"userId\": \"r1QbkXpb7\n                    }\n                }\n            }\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"message\": \"One or More Parameter(s) is missing\",\n        \"status\": 400,\n        \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/sntmail",
    "title": "api for sending verification code.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "        {\n            \"error\": false,\n            \"message\": \"Verification Code sent successfully\",\n            \"status\": 200\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n        \"error\": true,\n        \"message\": \"No user found\",\n        \"status\": 404,\n        \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSntmail"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:userId/delete",
    "title": "api for user deletion.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "            {\n                \"error\": false,\n                \"message\": \"Deleted the user successfully\",\n                \"status\": 200\n            }\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n            \"error\": true,\n            \"message\": \"No User Found\",\n            \"status\": 404,\n            \"data\": null\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersUseridDelete"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/:userId/edit",
    "title": "api for editing user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     {    \n                    \"error\": false,\n                    \"message\": \"User details edited\",\n                    \"status\": 200,\n                    \"data\": {\n                    \"n\": 0,\n                    \"nModified\": 0,\n                    \"ok\": 1\n                    }\n                }\n            }\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PutApiV1UsersUseridEdit"
  }
] });
