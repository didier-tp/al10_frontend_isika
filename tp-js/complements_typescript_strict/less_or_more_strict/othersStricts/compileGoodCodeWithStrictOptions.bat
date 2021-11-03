del *.txt
tsc --alwaysStrict --strictBindCallApply --strictFunctionTypes  goodStrict.ts > noErrorWithStrictOptions.txt && node goodStrict.js > resultExec.txt