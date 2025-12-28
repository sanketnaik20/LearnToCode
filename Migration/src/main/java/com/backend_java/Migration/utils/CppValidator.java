package com.backend_java.Migration.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CppValidator {
    
    // Updated Regex to include Scope Resolution (::) and more robust operators
    private static final String TOKEN_REGEX = "\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|[a-zA-Z_]\\w*|[0-9]+|<<|>>|\\+\\+|--|==|!=|>=|<=|&&|\\|\\||->|::|[\\+\\-\\*\\/\\%=\\&\\|\\!<>:;,\\.\\(\\)\\[\\]\\{\\}]";
    private static final Pattern PATTERN = Pattern.compile(TOKEN_REGEX);

    public static List<String> tokenize(String code) {
        if (code == null) return new ArrayList<>();
        List<String> tokens = new ArrayList<>();
        Matcher matcher = PATTERN.matcher(code);
        while (matcher.find()) {
            tokens.add(matcher.group());
        }
        return tokens;
    }

    public static boolean validateFillInBlank(String userInput, String solution) {
        if (userInput == null || solution == null) return false;
        List<String> userTokens = tokenize(userInput.trim());
        List<String> solutionTokens = tokenize(solution.trim());
        
        return userTokens.equals(solutionTokens);
    }

    /**
     * More robust version that compares lists regardless of whether they contain 
     * Strings, Integers, or mixed types by comparing their string representations.
     */
    public static boolean validateParsons(Object userOrder, Object solution) {
        if (!(userOrder instanceof List) || !(solution instanceof List)) return false;
        
        List<?> userList = (List<?>) userOrder;
        List<?> solutionList = (List<?>) solution;

        if (userList.size() != solutionList.size()) return false;

        for (int i = 0; i < userList.size(); i++) {
            if (!String.valueOf(userList.get(i)).equals(String.valueOf(solutionList.get(i)))) {
                return false;
            }
        }
        return true;
    }
}
