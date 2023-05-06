# terminal-feed

### How to get started

```sh
npm i
npm start
```

### Usage

```sh
signup [username] [password]
login [username] [password]
post [feed]
follow [username]
reply [post/comment] [postId/commentId] [replyText]
upvote [post/comment] [postId/commentId]
downvote [post/comment] [postId/commentId]
```

### Sample Application Run

```
Welcome to the Social Network!
Connected to database
Database initialized

signup [username] [password]
login [username] [password]
post [feed]
follow [username]
reply [post/comment] [postId/commentId] [replyText]
upvote [post/comment] [postId/commentId]
downvote [post/comment] [postId/commentId]

signup nuthan abcd
User nuthan created successfully

login nuthan abcd
Welcome nuthan!

post I'm feeling very happy today
Post created successfully

post How's the weather
Post created successfully

post Dhoom Ma Chale
Post created successfully

post Hola Amigo
Post created successfully

signup kirthan abcd
User kirthan created successfully

follow nuthan
Followed nuthan succesfully

shownewsfeed



POST ID: 4, UPVOTES: 0, DOWNVOTES: 0, COMMENTS: 0
POSTED: a few seconds ago
POST CONTENT: 
Hola Amigo




POST ID: 3, UPVOTES: 0, DOWNVOTES: 0, COMMENTS: 0
POSTED: a few seconds ago
POST CONTENT: 
Dhoom Ma Chale




POST ID: 2, UPVOTES: 0, DOWNVOTES: 0, COMMENTS: 0
POSTED: a few seconds ago
POST CONTENT: 
How's the weather




POST ID: 1, UPVOTES: 0, DOWNVOTES: 0, COMMENTS: 0
POSTED: a few seconds ago
POST CONTENT: 
I'm feeling very happy today

reply post 1 why are you happy
Comment created successfully

reply post 4 Hola Migo
Comment created successfully

upvote post 2
Post upvotesd successfully

reply comment 1 you got it going?
Comment created successfully

shownewsfeed



POST ID: 2, UPVOTES: 1, DOWNVOTES: 0, COMMENTS: 0
POSTED: a few seconds ago
POST CONTENT: 
How's the weather




POST ID: 1, UPVOTES: 0, DOWNVOTES: 0, COMMENTS: 2
POSTED: a few seconds ago
POST CONTENT: 
I'm feeling very happy today

COMMENT ID: 1, UPVOTES: 0, DOWNVOTES: 0, PARENT COMMENT ID: null
POSTED: a few seconds ago
COMMENT CONTENT: 
why are you happy

COMMENT ID: 3, UPVOTES: 0, DOWNVOTES: 0, PARENT COMMENT ID: 1
POSTED: a few seconds ago
COMMENT CONTENT: 
you got it going?




POST ID: 4, UPVOTES: 0, DOWNVOTES: 0, COMMENTS: 1
POSTED: a few seconds ago
POST CONTENT: 
Hola Amigo

COMMENT ID: 2, UPVOTES: 0, DOWNVOTES: 0, PARENT COMMENT ID: null
POSTED: a few seconds ago
COMMENT CONTENT: 
Hola Migo




POST ID: 3, UPVOTES: 0, DOWNVOTES: 0, COMMENTS: 0
POSTED: a few seconds ago
POST CONTENT: 
Dhoom Ma Chale
```
