const problems = [
    {
        title: "Two Sum",
        slug: "two-sum",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
        difficulty: "Easy",
        tags: ["Arrays", "Hash Table"],
        leetcodeUrl: "https://leetcode.com/problems/two-sum/",
        order: 1
    },
    {
        title: "Add Two Numbers",
        slug: "add-two-numbers",
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order.",
        difficulty: "Medium",
        tags: ["Linked List", "Math", "Recursion"],
        leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/",
        order: 2
    },
    {
        title: "Longest Substring Without Repeating Characters",
        slug: "longest-substring-without-repeating-characters",
        description: "Given a string `s`, find the length of the longest substring without repeating characters.",
        difficulty: "Medium",
        tags: ["Hash Table", "String", "Sliding Window"],
        leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        order: 3
    },
    {
        title: "Median of Two Sorted Arrays",
        slug: "median-of-two-sorted-arrays",
        description: "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.",
        difficulty: "Hard",
        tags: ["Array", "Binary Search", "Divide and Conquer"],
        leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        order: 4
    },
    {
        title: "Longest Palindromic Substring",
        slug: "longest-palindromic-substring",
        description: "Given a string `s`, return the longest palindromic substring in `s`.",
        difficulty: "Medium",
        tags: ["String", "Dynamic Programming"],
        leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
        order: 5
    },
    {
        title: "Container With Most Water",
        slug: "container-with-most-water",
        description: "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        difficulty: "Medium",
        tags: ["Array", "Two Pointers", "Greedy"],
        leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
        order: 6
    },
    {
        title: "3Sum",
        slug: "3sum",
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
        difficulty: "Medium",
        tags: ["Array", "Two Pointers", "Sorting"],
        leetcodeUrl: "https://leetcode.com/problems/3sum/",
        order: 7
    },
    {
        title: "Letter Combinations of a Phone Number",
        slug: "letter-combinations-of-a-phone-number",
        description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.",
        difficulty: "Medium",
        tags: ["Hash Table", "String", "Backtracking"],
        leetcodeUrl: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
        order: 8
    },
    {
        title: "Remove Nth Node From End of List",
        slug: "remove-nth-node-from-end-of-list",
        description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
        difficulty: "Medium",
        tags: ["Linked List", "Two Pointers"],
        leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
        order: 9
    },
    {
        title: "Valid Parentheses",
        slug: "valid-parentheses",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        difficulty: "Easy",
        tags: ["String", "Stack"],
        leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
        order: 10
    },
    {
        title: "Merge Two Sorted Lists",
        slug: "merge-two-sorted-lists",
        description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a sorted manner.",
        difficulty: "Easy",
        tags: ["Linked List", "Recursion"],
        leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
        order: 11
    },
    {
        title: "Generate Parentheses",
        slug: "generate-parentheses",
        description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
        difficulty: "Medium",
        tags: ["String", "Dynamic Programming", "Backtracking"],
        leetcodeUrl: "https://leetcode.com/problems/generate-parentheses/",
        order: 12
    },
    {
        title: "Merge k Sorted Lists",
        slug: "merge-k-sorted-lists",
        description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list.",
        difficulty: "Hard",
        tags: ["Linked List", "Divide and Conquer", "Heap (Priority Queue)", "Merge Sort"],
        leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
        order: 13
    },
    {
        title: "Search in Rotated Sorted Array",
        slug: "search-in-rotated-sorted-array",
        description: "Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
        difficulty: "Medium",
        tags: ["Array", "Binary Search"],
        leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        order: 14
    },
    {
        title: "Find First and Last Position of Element in Sorted Array",
        slug: "find-first-and-last-position-of-element-in-sorted-array",
        description: "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.",
        difficulty: "Medium",
        tags: ["Array", "Binary Search"],
        leetcodeUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
        order: 15
    }
];

module.exports = { problems };