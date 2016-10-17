#!/bin/bash
user_name='sysadmin'
user_password='1'
db_name='sunbird'
schema_file='./schema.sql'
data_file='./data.sql'

psql -U postgres -d postgres -c "DROP DATABASE $db_name;";

