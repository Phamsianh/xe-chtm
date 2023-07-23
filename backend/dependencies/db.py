from ORM.engine import engine
from ORM.session import Session


def get_session():
    session = Session(bind=engine, autoflush=False, expire_on_commit=False)
    try:
        yield session
    finally:
        session.close()