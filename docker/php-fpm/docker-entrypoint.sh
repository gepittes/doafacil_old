#!/bin/bash
set -e

echo "[ ****************** ] Starting Endpoint of Application"

if [ "$UPDATE_COMPOSER_DEPENDENCIES" == "true" ]; then
	echo "[ ****************** ] Updating composer dependencies."
    composer update --prefer-source --no-interaction
fi

if  ! [ -e "/application/.env" ] ; then
    echo "[ ****************** ] Copying sample application configuration to real one"
    cp /application/.env.example /application/.env
fi

echo "[ ****************** ] Ending Endpoint of Application"

set -- php-fpm

exec "$@"