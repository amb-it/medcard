#!/bin/sh
export $(grep -v '^#' ./infra/.env | xargs)
cd frontend
npm run build