const CppValidator = require('./utils/cppValidator');

const testCases = [
    {
        user: "int* x",
        solution: "int *x",
        expected: true
    },
    {
        user: "int * x = &y;",
        solution: "int* x=&y;",
        expected: true
    },
    {
        user: "std::cout<<*ptr;",
        solution: "std :: cout << * ptr ;",
        expected: true
    },
    {
        user: "int x=10",
        solution: "int x=11",
        expected: false
    }
];

console.log("Running C++ Validator Tests...");
testCases.forEach((tc, i) => {
    const result = CppValidator.validateFillInBlank(tc.user, tc.solution);
    console.log(`Test ${i + 1}: ${result === tc.expected ? '✅ PASSED' : '❌ FAILED'} (User: "${tc.user}", Solution: "${tc.solution}")`);
});
