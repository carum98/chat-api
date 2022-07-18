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
- [Headers](#headers)

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

## Headers
```
Content-Type: application/json,
Authorization: [token]
```
