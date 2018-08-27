#!/bin/bash
set -e

supervisord -n

exec "$@"
