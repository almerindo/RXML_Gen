openssl genrsa -out privatekey.pen 1024
openssl req -new -x509 -key privatekey.pen -out publickey.cer -days 1825
openssl pkcs12 -export -out public_privatekey.pfx -inkey privatekey.pem -in publickey.cer



