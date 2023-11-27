#!/usr/bin/env bash

migrations_dir=$( dirname $0 )
migrations=($( ls $migrations_dir ))

if [ "$1" == "init" ]; then
    npx wrangler d1 execute strataspheric --local \
        --command "CREATE TABLE IF NOT EXISTS migrations (migration_name text primary key)"

    exit 1
elif [ "$1" == "create" ]; then
    

    exit 1
fi

executed_migrations=($( npx wrangler d1 execute strataspheric --local --json \
    --command "SELECT migration_name FROM migrations ORDER BY migration_name ASC" | \
    jq .[0].results[].migration_name -r ))

for file in "${migrations[@]}"; do
    if [ "$file" == "migrate.sh" ]; then
        continue
    fi

    already_run=0
    for migration in "${executed_migrations[@]}"; do
        if [ "$migration" == "$file" ]; then
            already_run=1
            break
        fi
    done

    if [ $already_run -eq 1 ]; then
        continue
    fi 

    npx wrangler d1 execute strataspheric --local --file $migrations_dir/$file

    if [ $? -eq 1 ]; then 
        echo "migration $file failed"
        exit 1
    fi
    
    npx wrangler d1 execute strataspheric --local \
        --command "INSERT INTO migrations VALUES ('${file}')"
done