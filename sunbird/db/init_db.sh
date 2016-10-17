#!/bin/bash
user_name='sysadmin'
user_password='1'
db_name='sunbird'
schema_file='./schema.sql'
data_file='./data.sql'

psql -U postgres -d postgres \
  -c "CREATE USER IF NOT EXISTS $user_name WITH ENCRYPTED PASSWORD '$user_password';" \
  -c "CREATE DATABASE $db_name WITH OWNER $user_name;";

psql -U $user_name -d $db_name -f $schema_file;
psql -U $user_name -d $db_name -f $data_file;
