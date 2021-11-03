del *.txt
tsc --noImplicitAny  --noImplicitThis  badImplicit.ts > errMsgWithStrictNoImplicitOptions.txt && node badImplicit.js > resultExec.txt
