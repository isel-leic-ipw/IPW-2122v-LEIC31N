
# Maintaining a login session with cookies


## Before session

1. Access all public resources

2. Access a login resource page (public access) - GET

3. Send the user provided credentials (public access) - POST
    a. The provided credentials are correct:
        - Send a Set-Cookie header with the user session unique identifier
        - Send a 302 redirect to homepage

    b. The provided credentials are incorrect:
        - Send a 401 response
        - Send in body the same page with an erros message and with the login forma partially filled (without password)

# During session

4. During session client send the the session cookie received in 3. a) in all requests - All kind of requests

5. Session end
    a. Logout - POST
       - Send a Set-Cookie header invalidating the session cookie
    b. The session expires
       - The cookie is sent but the server considers it invalid, removing it from the client

# After session
6. Go back to 1


