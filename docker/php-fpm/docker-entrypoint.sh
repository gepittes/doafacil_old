#!/bin/bash
set -e

if [ "$UPDATE_COMPOSER_DEPENDENCIES" == "true" ]; then
	echo "[ ****************** ] Updating composer dependencies."
	cd /var/www/salic
    composer update --prefer-source --no-interaction
fi

if  ! [ -e "/application/.env" ] ; then
    echo "[ ****************** ] Copying sample application configuration to real one"
    cp /application/.env.example /application/.env
fi

exec "$@"
