# Client side

## Requirements

Client side needs [node][1] and [bower][2] and [grunt][3]

## Installation

~~~
cd client
npm install
bower install
grunt
~~~

Then you need to provides the client app through a webserver, eg.

_/etc/apache2/sites-available/app-boilerplate.conf_

~~~
<VirtualHost *:80>
        ServerName app-boilerplate
        DocumentRoot /......./app-boilerplate/client/public
</VirtualHost>
~~~

Then

~~~
sudo a2ensite app-boilerplate.conf
~~~

## Usage

You only need to compile sources to expose changes :

~~~
grunt
~~~


[1]: http://howtonode.org/how-to-install-nodejs
[2]: http://bower.io/
[3]: http://gruntjs.com/getting-started#installing-the-cli
