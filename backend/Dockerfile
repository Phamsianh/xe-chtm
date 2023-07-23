FROM python:3.11

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

COPY openssl.cnf /etc/ssl/openssl.cnf

SHELL ["/bin/bash", "-c"]

RUN /usr/src/app/setup.sh

CMD [ "uvicorn" , "main:app" , "--reload" , "--host", "0.0.0.0" , "--port", "8000" ]