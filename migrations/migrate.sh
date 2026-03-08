#!/usr/bin/env bash

if [ "$1" != "--local" ] && [ "$1" != "--remote" ]; then
    echo "Usage: $0 --local|--remote"
    exit 1
fi

if [ "$1" == "--remote" ]; then
    echo "WARNING: You are about to run migrations against the REMOTE database!"
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
    target="--remote "
else
    target="--local "
fi

migrations_dir=$( dirname $0 )
migrations=($( ls $migrations_dir ))

npx wrangler d1 execute strataspheric ${target}\
    --command "CREATE TABLE IF NOT EXISTS migrations (migration_name text primary key)"

executed_migrations=($( npx wrangler d1 execute strataspheric ${target}--json \
    --command "SELECT migration_name FROM migrations ORDER BY migration_name ASC" | \
    jq .[0].results[].migration_name -r ))

for file in "${migrations[@]}"; do
    if [ "$file" == "migrate.sh" ]; then
        continue
    elif [ "$file" == "reset_database.sh" ]; then
        continue
    elif [ "$file" == "_remove_all_data.sql" ]; then
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

    echo "running $file"

    npx wrangler d1 execute strataspheric ${target}--file $migrations_dir/$file

    if [ $? -eq 1 ]; then
        echo "migration $file failed"
        exit 1
    fi

    npx wrangler d1 execute strataspheric ${target}\
        --command "INSERT INTO migrations VALUES ('${file}')"
done
