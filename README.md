# Movie search app

### Hi, I did that app for isobar company

Well, fronted is done with Vue.js 3 and backend with Node.js, Express and Redis. As CSS framework I used bootstrap 4.6, not bootstrap-vue because plugin is still not ready for Vue 3.
Application checks token on each login so dont be surprised if the application will login automatically. 


To run this app

* clone repository
* cd ./backend
* cp config.sample.js config.js
* add your OMDb API key and secret key to config.js file

To run via docker

* go to the app root directory
* docker-compose -f docker-compose.yml build
* docker-compose -f docker-compose.yml up

application will be available on http://localhost 

login data or check ./backend/database/user.js:
```javascrip 
{
    id: 1,
    login: 'isobar',
    password: 'isobaristhebest',
},
{
    id: 2,
    login: 'dima',
    password: '1'
}
```

Enjoy :)

Author: Dmitrii Averin