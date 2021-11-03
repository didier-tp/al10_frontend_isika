del *.txt
tsc --strictPropertyInitialization --strictNullChecks noInitialization.ts > errMsgWithStrictPropertyInitialization.txt && node noInitialization.js > resultExec.txt
