FROM php:7.2.5-fpm

WORKDIR "/application"

RUN apt-get update

RUN echo "[ ***** ***** ***** ] - Installing each item in new command to use cache and avoid download again ***** ***** ***** "
RUN apt-get install -y apt-utils
RUN apt-get install -y libfreetype6-dev
RUN apt-get install -y libjpeg62-turbo-dev
RUN apt-get install -y libcurl4-gnutls-dev
RUN apt-get install -y libxml2-dev
RUN apt-get install -y freetds-dev
RUN apt-get install -y git
RUN apt-get install -y curl 
RUN apt-get install -y supervisor

RUN echo "[ ***** ***** ***** ] - Installing PHP Dependencies ***** ***** ***** "
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/
RUN docker-php-ext-install gd
RUN docker-php-ext-install soap

RUN docker-php-ext-install calendar
#RUN docker-php-ext-configure mssql --with-libdir=/lib/x86_64-linux-gnu && docker-php-ext-install mssql
RUN docker-php-ext-configure pdo_dblib --with-libdir=/lib/x86_64-linux-gnu && docker-php-ext-install pdo_dblib