#!/usr/bin/env bash

if [ "$1" != "--local" ] && [ "$1" != "--remote" ]; then
    echo "Usage: $0 --local|--remote"
    exit 1
fi

if [ "$1" == "--remote" ]; then
    echo "WARNING: You are about to delete ALL data from the REMOTE database!"
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

npx wrangler d1 execute strataspheric ${target}--file $migrations_dir/_remove_all_data.sql
