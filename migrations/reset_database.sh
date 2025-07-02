#!/usr/bin/env bash

migrations_dir=$( dirname $0 )
migrations=($( ls $migrations_dir ))
# target="--remote "
target="--local "

echo "running $file"
npx wrangler d1 execute strataspheric ${target}--file $migrations_dir/_remove_all_data.sql
