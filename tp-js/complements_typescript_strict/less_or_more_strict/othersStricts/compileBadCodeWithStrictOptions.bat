del *.txt
tsc --alwaysStrict  --strictBindCallApply --strictFunctionTypes badStrict.ts > errMsgWithStrictOptions.txt && node badStrict.js > resultExec.txt
