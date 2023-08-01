import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app_config import api_root_path # for development leave this line in comment
from app_config import origins, title, description
from routes import users
from routes import conditions
from routes import members
from routes import equipments
from routes import types
from routes import contents
from routes import files
from routes import reset_db
from authentication import login


app = FastAPI(
    title=title,
    description=description,
    root_path=api_root_path, # for development leave this line in comment
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reset_db.router)
app.include_router(login.token_router)
app.include_router(files.router)
app.include_router(users.router)
app.include_router(conditions.router)
app.include_router(members.router)
app.include_router(equipments.router)
app.include_router(types.router)
app.include_router(contents.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info", reload=True)