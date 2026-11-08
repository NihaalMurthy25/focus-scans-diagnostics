# Medigrids demo portal

## Account categories
- Medical Service Provider: Doctor, Diagnostic Centre, Pharmacy
- General Public: individual / patient

## Run locally
Open two terminals from `care-portal-login`:

```powershell
npm.cmd --prefix server install
npm.cmd --prefix server run dev
```

```powershell
npm.cmd --prefix client install
npm.cmd --prefix client run dev
```

Frontend: http://localhost:5173  
API health check: http://localhost:4000/api/health

## Run frontend tests

```powershell
npm.cmd --prefix client install
npm.cmd --prefix client run test:run
```

## Important demo limitation
The current API stores accounts only in server memory and clears them when the server restarts. It is a demonstration of the registration/login flow, not production authentication. It does not use a database, password hashing, email/phone verification, secure sessions/JWT, provider credential verification, audit logging, or production security controls. The demo API currently holds passwords in memory for comparison. Do not use real credentials, patient information, or medical data. Before deployment, replace this demo API with a database-backed implementation using a suitable password-hashing library, verified account workflows, secure session management, authorization, HTTPS, rate limiting and privacy/security review.
