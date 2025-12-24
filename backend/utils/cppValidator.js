/**
 * C++ Answer Validator
 * Validates 'Fill-in-the-blank' and code-based answers by tokenizing 
 * to allow for flexible whitespace and formatting.
 */

class CppValidator {
    /**
     * Tokenizes C++ code into an array of meaningful strings.
     * @param {string} code 
     * @returns {string[]}
     */
    static tokenize(code) {
        if (!code) return [];
        
        // Regex to match:
        // 1. Strings: "..." or '...'
        // 2. Identifiers and Keywords: [a-zA-Z_][a-zA-Z0-9_]*
        // 3. Numbers: [0-9]+
        // 4. Multi-char operators: <<, >>, ++, --, ==, !=, >=, <=, &&, ||, ->
        // 5. Single-char operators/punctuators: +, -, *, /, %, =, &, |, !, <, >, ;, ,, ., (, ), [, ], {, }
        const tokenRegex = /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[a-zA-Z_]\w*|[0-9]+|<<|>>|\+\+|--|==|!=|>=|<=|&&|\|\||->|[\+\-\*\/\%=\&\|\!<>:;,\.\(\)\[\]\{\}]/g;
        
        return code.match(tokenRegex) || [];
    }

    /**
     * Compare user input against the expected solution.
     * @param {string} userInput 
     * @param {string} solution 
     * @returns {boolean}
     */
    static validateFillInBlank(userInput, solution) {
        const userTokens = this.tokenize(userInput.trim());
        const solutionTokens = this.tokenize(solution.trim());

        if (userTokens.length !== solutionTokens.length) {
            return false;
        }

        return userTokens.every((token, index) => token === solutionTokens[index]);
    }

    /**
     * Validate Parson's Problem (Code Reordering)
     * @param {number[]} userOrder - Array of indices
     * @param {number[]} solutionOrder - Array of indices
     * @returns {boolean}
     */
    static validateParsons(userOrder, solutionOrder) {
        if (userOrder.length !== solutionOrder.length) return false;
        return userOrder.every((val, index) => val === solutionOrder[index]);
    }
}

module.exports = CppValidator;
