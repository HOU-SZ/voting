# Voting

<font color=grey>Application: VoTeam</font> 

<font color=grey>Developer: Hou Shizheng, Zheng Ying</font> 

<font color=grey>Time: Sep. 2021 to Nov. 2021</font> 



## 1. Introduction

### 1.1 Project Structure

```
.
├── README.md
├── package-lock.json
├── Voting.postman_collection.json
├── client					# client handler folder
		├── package.json
		├── node_modules	# folder for dependency modules in server-side
		├── public
		└── src             # folder for all react components
└── server					# server handle folder
		├── package.json
		├── node_modules	# folder for dependency modules in client-side
		├── app.js			# main driver
        ├── config			# configration info
        ├── controller		# Controllers
        ├── middleware		# middlewares for authorization error-handler
        ├── model			# models
        ├── router			# routers for different apis
        ├── util			# jwt and md5
		└── validator 		# validators
```



### 1.2 Brief

This project is a Kanban like web application. 

MERN stack is used here to develop full-stack web application. Namely, the Express framework based on NodeJS is used to realize back end, MongoDB is used as our database and the ReactJS
is used to realize front end.

The backend server is running on port `6001`, the backend database is running on port `27017` and the frontend client is running on port `3000`.



## 2. Prerequisites

> It is possible for you to run `./server` in Docker and `./client` on local to simulate two machine.
>
> Of course you can also deploy backend server-side code on remote server.



### 2.1 Server

#### ① Setup env

* Pull docker image

```sh
docker pull ubuntu: latest
```

* Create a new container

```sh
docker run -p 6001:6001 -p 27017 -it --name voting ubuntu 
```

* Install git

```sh
apt update
apt upgrade
apt install git
```

* Install npm

```sh
apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
# restart container to enable nvm & check nvm using command 'nvm'
nvm install 10
npm install -g npm@6
```

* Install mongoDB

```sh
apt install gnupg
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list 
apt update
apt install mongodb-org
apt install screen
mkdir -p /data/db
screen mongod 
# Press Ctrl+a followed by d to return to terminal
# Use command 'mongo' to open a mongoDB CLI
```



#### ② Get source code

> git is needed

GitHub repo: https://github.com/HOU-SZ/voting.git

```sh
git clone https://github.com/HOU-SZ/voting.git
```



#### ③ Install dependencies

> npm is needed

```sh
cd voting/server
npm install
```



### 2.2 Client

#### ① Setup env

* Install git
* Install npm



#### ② Get source code

> git is needed

GitHub repo: https://github.com/HOU-SZ/voting.git

```sh
git clone https://github.com/HOU-SZ/voting.git
```



#### ③ Install dependencies 

> npm is needed

```sh
cd voting/client
npm install
npm install typescript
```



## 3. Get Started

### 3.1 Server

```sh
cd voting/server
screen mongod
node app.js
```



### 3.2 Client

```sh
cd voting/client
npm start
```

Access http://localhost:3000/ in your browser 



## 4. Usage

* Click `Register` to register an account
* Click `Login` to log in your account
* Click `Dashboard` to create your topic, then you can explore to use all the functions
* Click `Voteam` logo or `Home` to return to the homepage
* Click `Logout` to log out your account

> Notice: when you Drag and Drop the idea card, you may see the below error:
>
> `NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.` 
>
> Do not have to care about it. This error is caused by dragula library. It is visible only in development. It will not appear if the app crashes in production.

