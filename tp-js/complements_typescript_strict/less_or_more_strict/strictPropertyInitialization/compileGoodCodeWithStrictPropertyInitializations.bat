del *.txt
tsc --strictPropertyInitialization --strictNullChecks withInitialization.ts > noErrorWithStrictPropertyInitialization.txt && node withInitialization.js > resultExec.txt
