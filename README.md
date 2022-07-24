# Chat API



## Set Up

``` bash
npm run up
```



## Indice



- [Auth](#auth)
  - [Login](#login)
  - [Register](#register)
- [QR Code](#qr-code)
  - [Get QR Code](#get-qr-code)
  - [Login with QR Code](#login-with-qr-code)
- [Socket IO (Web-Socket)](#socket-io-web-socket)
  - [Chat](#socket-chat)
  - [Updates](#socket-updates)
  - [QR Code](#socket-qr-code)
- [Contacts](#contacts)
  - [Get contacts](#get-contacts)
- [Chats](#chats)
  - [Get Chats](#get-chats)
  - [Create Chat](#create-chat)
- [Messages](#messages)
  - [Create Message](#create-message)
  - [Get Messages](#get-messages)
- [Emojis](#emojis)



## Auth



### Login
```http
POST /api/login
```
| Parameter | Type |
| :--- | :--- |
| `email` | `string` |
| `password` | `string` |
#### Response
| Parameter | Type |
| :--- | :--- |
| `message` | `string` |
| `token` | `string` |



### Register
```http
POST /api/register
```
| Parameter | Type |
| :--- | :--- |
| `name` | `string` |
| `email` | `string` |
| `number` | `string` |
| `password` | `string` |
| `image` | `File` |
#### Response
| Parameter | Type |
| :--- | :--- |
| `message` | `string` |
| `token` | `string` |



## QR Code



### Get QR Code
```http
POST /api/qr
```
#### Response
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `code` | `string` | Socket ID |

### Login with QR Code
```http
POST /api/qr/validate
```
#### Response
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `code` | `string` | Socket ID |



## Socket IO (Web-Socket)
To connect to the web-socket, you need to use the [Socket IO](https://socket.io/) client.



### Socket Chat
#### Connect
```
/chat
```
```javascript
{
  auth: {
    token: [token]
  },
  query: { 
    chat_id: [chatId]
  }
}
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `token` | `string` | Authorization with API Token |
| `chatId` | `string` | Chat id |
### Events
| Event | Description |
| :--- | :--- |
| chat:message | |
| chat:typing | |
| chat:read | |



### Socket Updates
#### Connect
```
/updates
```
```javascript
{
  auth: {
    token: [token]
  }
}
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `token` | `string` | Authorization with API Token |

### Events
| Event | Description |
| :--- | :--- |
| updates:message | |
| updates:read | |
| updates:chat | |

### Socket QR Code
#### Connect
```
/qr
```
### Events
| Event | Description |
| :--- | :--- |
| qr:login | |


## Contacts



### Get contacts
```http
GET /api/contacts
```
#### Response
```json
{
    "data": [
        {
            "name": "Carlos",
            "image": "1655607381025.jpg",
            "id": "629bfb7ea87bc18c9eccae80"
        },
        {
            "name": "Eduardo",
            "image": "1655607458910.jpg",
            "id": "629c20685fd726b98babccee"
        },
        {
            "name": "Maria",
            "image": "1655607537030.jpg",
            "id": "629c23f99410441cce163eaa"
        }
    ]
}
```



## Chats



### Get Chats
```http
GET /api/chats
```
#### Response
```json
{
    "data": [
        {
            "id": "62d4bd7516a68a7792e60dd8",
            "user": {
                "name": "Pedro",
                "image": "1656298876416.jpg",
                "id": "62b91d7cbccc8702e3e096bc"
            },
            "message": {
                "id": "62d4be1316a68a7792e60e42",
                "content": "😅",
                "createdAt": "2022-07-18T01:57:39.557Z",
                "isMine": true,
                "isRead": true
            },
            "count": 0
        }
    ]
}
```



### Create Chat
```http
POST /api/chats
```
#### Request
```json
{
  "user_id": "62b91d7cbccc8702e3e096bc"
}
```
#### Response
```json
{
    "id": "62d4bd7516a68a7792e60dd8",
    "user": {
        "name": "Pedro",
        "image": "1656298876416.jpg",
        "id": "62b91d7cbccc8702e3e096bc"
    },
    "message": null
}
```



## Messages



### Create message
```http
POST /messages
```
#### Request
```json
{
    "content": "Hola",
    "chat_id": "62d4bd7516a68a7792e60dd8"
}
```
#### Response
```json
{
    "data": {
        "id": "62d4f50d16a68a7792e60e69",
        "content": "Hola",
        "createdAt": "2022-07-18T05:52:13.016Z",
        "isMine": true,
        "isRead": false
    }
}
```



### Get messages
```http
GET /api/[id]/messages
```
#### Response
```json
{
    "data": [
        {
            "id": "62d4be1316a68a7792e60e42",
            "content": "😅",
            "createdAt": "2022-07-18T01:57:39.557Z",
            "isMine": true,
            "isRead": true
        },
        {
            "id": "62d4be0016a68a7792e60e2a",
            "content": "Hola",
            "createdAt": "2022-07-18T01:57:20.164Z",
            "isMine": false,
            "isRead": true
        }
    ]
}
```


## Emojis
```http
GET /emojis
```
#### Response
```json
{
    "Smileys & Emotion": [
        {
            "emoji": "😀",
            "description": "grinning face",
            "category": "Smileys & Emotion",
            "aliases": [
                "grinning"
            ],
            "tags": [
                "smile",
                "happy"
            ]
        },
        {
            "emoji": "😃",
            "description": "grinning face with big eyes",
            "category": "Smileys & Emotion",
            "aliases": [
                "smiley"
            ],
            "tags": [
                "happy",
                "joy",
                "haha"
            ]
        },
    ]       
}
```
