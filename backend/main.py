import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app_config import origins, title, description, root_path
from routes import dm_canbo, account, details_clean, log_status, total, units, cadres, executed_techday
from authentication import login


app = FastAPI(
    title=title,
    description=description,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login.token_router)
app.include_router(dm_canbo.router)
app.include_router(account.router)
app.include_router(details_clean.router)
app.include_router(log_status.router)
app.include_router(total.router)
app.include_router(units.router)
app.include_router(cadres.router)
app.include_router(executed_techday.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info", reload=True)