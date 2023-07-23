import os

############################## DATABASE CONFIG ##############################
# For development, use the following config for database:
database = 'postgresql'
host = 'localhost'
port = '5432'
user_name = 'postgres'
password = '123456'
database_name = 'xe-chtm'

############################## FASTAPI CONFIG ##############################
# For development comment out the api_root_path.
title = "Phần mềm huấn luyện bài tập tổng hợp đối với xe CHTM"
description = """Phần mềm huấn luyện bài tập tổng hợp đối với xe CHTM"""
servers = [
    {'url': 'http://localhost:8000/', 'description': 'Development server'},
    {'url': 'http://localhost/api/', 'description': 'Production server'}
]
origins = [
    "*",
    ]
root_path="/api"

############################## TOKEN USING FOR AUTHENTICATION ##############################
SECRET_KEY = "5c303030e2c614051f0787b0a6250615247be31677e92f21afc210d2d4607c18"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 43200  #  = 30*24*60 = 1 month