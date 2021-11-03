del *.txt
tsc --noImplicitAny  --noImplicitThis  withNoImplicit.ts > noErrorWithStrictNoImplicitOptions.txt && node withNoImplicit.js > resultExec.txt