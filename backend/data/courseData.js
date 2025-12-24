const cPlusPlusCourse = {
    title: "Mastering C++: The Complete Curriculum",
    language: "cpp",
    description: "A comprehensive path from 'Hello World' to Template Metaprogramming.",
    units: [
        /* =========================================
           UNIT 1: ABSOLUTE BEGINNER
           ========================================= */
        {
            id: "unit-01",
            title: "Unit 1: Foundations of C++",
            level: "Beginner",
            order: 0,
            lessons: [
                {
                    title: "1.1 Anatomy of a Program",
                    slug: "cpp-anatomy",
                    description: "Understanding headers, the main function, and comments.",
                    order: 0,
                    content: [
                        { type: "text", body: "Every C++ program requires a 'main' function. This is the entry point where execution begins." },
                        { type: "code", body: "#include <iostream> // Preprocessor directive\n\n// Main execution function\nint main() {\n    std::cout << \"Hello World\";\n    return 0;\n}" },
                        { type: "text", body: "Directives like `#include` tell the compiler to add specific libraries before compiling." }
                    ],
                    questions: [
                        {
                            type: "MCQ",
                            prompt: "What is the purpose of '#include <iostream>'?",
                            options: ["To include input/output stream functionality", "To start the main function", "To declare integer variables", "To add mathematical functions"],
                            solution: 0,
                            concepts: ["preprocessor", "syntax"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Complete the code to print text to the console.",
                            codeTemplate: "std::___ << \"Hello\";",
                            solution: "cout",
                            concepts: ["io", "syntax"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Reorder the blocks to create a valid C++ program.",
                            blocks: [
                                "#include <iostream>",
                                "int main() {",
                                "    std::cout << \"Hi\";",
                                "    return 0;",
                                "}"
                            ],
                            solution: [0, 1, 2, 3, 4],
                            concepts: ["syntax"]
                        }
                    ]
                },
                {
                    title: "1.2 Variables & Primitive Types",
                    slug: "vars-and-types",
                    description: "Storing data: int, double, char, bool, and string.",
                    order: 1,
                    content: [
                        { type: "text", body: "C++ is strongly typed. Common types include `int` (integers), `double` (decimals), `char` (single characters), and `bool` (true/false)." },
                        { type: "code", body: "int score = 100;\ndouble pi = 3.14159;\nchar grade = 'A';\nbool isPassed = true;" }
                    ],
                    questions: [
                        {
                            type: "MCQ",
                            prompt: "How many bytes does a standard 'int' usually occupy on modern 64-bit systems?",
                            options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
                            solution: 2,
                            concepts: ["memory", "types"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Declare a boolean variable named 'isActive' set to true.",
                            codeTemplate: "___ isActive = true;",
                            solution: "bool",
                            concepts: ["types"]
                        }
                    ]
                },
                {
                    title: "1.3 Control Flow (If/Else & Loops)",
                    slug: "control-flow",
                    description: "Making decisions and repeating tasks.",
                    order: 2,
                    content: [
                        { type: "text", body: "Use `if`, `else if`, and `else` for logic. Use `for` and `while` loops for iteration." },
                        { type: "code", body: "for (int i = 0; i < 5; i++) {\n    if (i % 2 == 0) std::cout << i << \" is even\";\n}" }
                    ],
                    questions: [
                        {
                            type: "MCQ",
                            prompt: "Which loop is best when you know exactly how many times you need to iterate?",
                            options: ["while loop", "do-while loop", "for loop", "infinite loop"],
                            solution: 2,
                            concepts: ["loops"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Arrange code to print numbers 0 to 9.",
                            blocks: [
                                "for (int i = 0; i < 10; i++) {",
                                "    std::cout << i;",
                                "}"
                            ],
                            solution: [0, 1, 2],
                            concepts: ["loops", "logic"]
                        }
                    ]
                }
            ]
        },

        /* =========================================
           UNIT 2: MEMORY MANAGEMENT (THE CORE)
           ========================================= */
        {
            id: "unit-02",
            title: "Unit 2: Pointers & Memory",
            level: "Intermediate",
            order: 1,
            lessons: [
                {
                    title: "2.1 Pointers & References",
                    slug: "pointers-refs",
                    description: "The difference between an address and an alias.",
                    order: 0,
                    content: [
                        { type: "text", body: "A pointer stores a memory address. A reference is an alias for an existing variable." },
                        { type: "code", body: "int x = 10;\nint* ptr = &x; // ptr holds address of x\nint& ref = x;  // ref is an alias for x" },
                        { type: "text", body: "Changing `ref` changes `x`. Changing `ptr` makes it point somewhere else." }
                    ],
                    questions: [
                        {
                            type: "MCQ",
                            prompt: "What happens if you try to modify a const reference?",
                            options: ["The value updates", "Compiler error", "Runtime error", "The pointer becomes null"],
                            solution: 1,
                            concepts: ["references", "const"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Access the value stored at the address contained in pointer 'p'.",
                            codeTemplate: "int val = ___p;",
                            solution: "*",
                            concepts: ["pointers", "dereferencing"]
                        }
                    ]
                },
                {
                    title: "2.2 Dynamic Memory (New & Delete)",
                    slug: "dynamic-memory",
                    description: "Allocating memory on the Heap.",
                    order: 1,
                    content: [
                        { type: "text", body: "Local variables live on the Stack. For persistent memory, we use the Heap with `new`." },
                        { type: "code", body: "int* arr = new int[5]; // Allocates array on heap\n// ... use array ...\ndelete[] arr; // Manual cleanup required!" }
                    ],
                    questions: [
                        {
                            type: "MCQ",
                            prompt: "What is a 'Memory Leak'?",
                            options: ["When RAM is full", "Failing to release heap memory using delete", "Writing outside array bounds", "Using uninitialized variables"],
                            solution: 1,
                            concepts: ["memory-management"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Allocate a single integer on the heap and delete it.",
                            blocks: [
                                "int* p = new int;",
                                "*p = 5;",
                                "delete p;",
                                "p = nullptr;"
                            ],
                            solution: [0, 1, 2, 3],
                            concepts: ["heap", "safety"]
                        }
                    ]
                }
            ]
        },

        /* =========================================
           UNIT 3: OBJECT ORIENTED PROGRAMMING
           ========================================= */
        {
            id: "unit-03",
            title: "Unit 3: Object-Oriented Programming",
            level: "Intermediate",
            order: 2,
            lessons: [
                {
                    title: "3.1 Classes & Encapsulation",
                    slug: "classes",
                    description: "Blueprints, access modifiers, and constructors.",
                    order: 0,
                    content: [
                        { type: "text", body: "Classes bundle data and methods. `public` members are accessible everywhere; `private` members only inside the class." },
                        { type: "code", body: "class BankAccount {\nprivate:\n    double balance;\npublic:\n    BankAccount(double b) : balance(b) {} // Constructor\n};" }
                    ],
                    questions: [
                        {
                            type: "MCQ",
                            prompt: "Which special function is called automatically when an object is created?",
                            options: ["Initializer", "Constructor", "Builder", "Main"],
                            solution: 1,
                            concepts: ["oop", "constructors"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Prevent a class member from being accessed outside the class.",
                            codeTemplate: "___: int secretData;",
                            solution: "private",
                            concepts: ["oop", "encapsulation"]
                        }
                    ]
                },
                {
                    title: "3.2 Inheritance & Polymorphism",
                    slug: "inheritance",
                    description: "Is-A relationships and Virtual Functions.",
                    order: 1,
                    content: [
                        { type: "text", body: "Inheritance allows a class to derive features from a parent. Polymorphism allows a child class to override parent behavior using `virtual` functions." },
                        { type: "code", body: "class Animal {\npublic:\n    virtual void speak() { cout << \"Noise\"; }\n};\n\nclass Dog : public Animal {\npublic:\n    void speak() override { cout << \"Bark\"; }\n};" }
                    ],
                    questions: [
                        {
                            type: "MCQ",
                            prompt: "Which keyword is required in the Base class to allow a function to be overridden?",
                            options: ["static", "virtual", "inline", "friend"],
                            solution: 1,
                            concepts: ["oop", "polymorphism"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Explicitly state that a function is intended to override a base function.",
                            codeTemplate: "void myFunction() ___",
                            solution: "override",
                            concepts: ["oop", "modern-cpp"]
                        }
                    ]
                }
            ]
        },

        /* =========================================
           UNIT 4: THE STANDARD TEMPLATE LIBRARY (STL)
           ========================================= */
        {
            id: "unit-04",
            title: "Unit 4: The STL",
            level: "Advanced",
            order: 3,
            lessons: [
                {
                    title: "4.1 Containers (Vectors & Maps)",
                    slug: "stl-containers",
                    description: "Dynamic arrays and key-value stores.",
                    order: 0,
                    content: [
                        { type: "text", body: "Stop using raw arrays. Use `std::vector` for dynamic lists and `std::map` for dictionaries." },
                        { type: "code", body: "std::vector<int> nums = {1, 2, 3};\nnums.push_back(4);\n\nstd::map<string, int> ages;\nages[\"John\"] = 30;" }
                    ],
                    questions: [
                        {
                            type: "MCQ",
                            prompt: "What is the time complexity of accessing an element in a vector by index?",
                            options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                            solution: 0,
                            concepts: ["complexity", "stl"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Check the number of elements in a vector named 'v'.",
                            codeTemplate: "int s = v.___;",
                            solution: "size()", // Accepting size() or size
                            concepts: ["stl"]
                        }
                    ]
                },
                {
                    title: "4.2 Algorithms",
                    slug: "stl-algorithms",
                    description: "Sorting, searching, and manipulating ranges.",
                    order: 1,
                    content: [
                        { type: "text", body: "The `<algorithm>` header provides powerful functions like `sort`, `find`, and `transform`." },
                        { type: "code", body: "#include <algorithm>\nstd::vector<int> v = {4, 1, 3};\nstd::sort(v.begin(), v.end()); // v becomes {1, 3, 4}" }
                    ],
                    questions: [
                        {
                            type: "MCQ",
                            prompt: "Which iterators do you pass to sort the entire vector 'v'?",
                            options: ["v[0], v[size]", "v.start(), v.finish()", "v.begin(), v.end()", "v.first(), v.last()"],
                            solution: 2,
                            concepts: ["stl", "iterators"]
                        }
                    ]
                }
            ]
        },

        /* =========================================
           UNIT 5: MODERN C++ (C++11/14/17/20)
           ========================================= */
        {
            id: "unit-05",
            title: "Unit 5: Modern C++ Features",
            level: "Master",
            order: 4,
            lessons: [
                {
                    title: "5.1 Smart Pointers",
                    slug: "smart-pointers",
                    description: "Automated memory management: unique_ptr vs shared_ptr.",
                    order: 0,
                    content: [
                        { type: "text", body: "Never call `new` or `delete` manually again. Use `std::unique_ptr` for exclusive ownership and `std::shared_ptr` for shared ownership." },
                        { type: "code", body: "#include <memory>\nauto p = std::make_unique<int>(10);" }
                    ],
                    questions: [
                        {
                            type: "MCQ",
                            prompt: "Can you copy a std::unique_ptr?",
                            options: ["Yes, always", "No, it must be moved", "Only if it's null", "Yes, using std::copy"],
                            solution: 1,
                            concepts: ["memory", "smart-pointers"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Create a shared pointer that counts references.",
                            codeTemplate: "std::___<int> p = std::make_shared<int>(5);",
                            solution: "shared_ptr",
                            concepts: ["memory"]
                        }
                    ]
                },
                {
                    title: "5.2 Lambda Expressions",
                    slug: "lambdas",
                    description: "Anonymous functions and closures.",
                    order: 1,
                    content: [
                        { type: "text", body: "Lambdas are inline functions often used with STL algorithms." },
                        { type: "code", body: "auto add = [](int a, int b) { return a + b; };\nint x = 10;\nauto captureX = [x](int a) { return x + a; };" }
                    ],
                    questions: [
                        {
                            type: "PARSONS",
                            prompt: "Construct a lambda that takes no arguments and prints 'Hi'.",
                            blocks: [
                                "auto func = ",
                                "[]",
                                "() {",
                                "    cout << \"Hi\";",
                                "};"
                            ],
                            solution: [0, 1, 2, 3, 4],
                            concepts: ["functional", "syntax"]
                        }
                    ]
                }
            ]
        },

        /* =========================================
           UNIT 6: ADVANCED CONCEPTS
           ========================================= */
        {
            id: "unit-06",
            title: "Unit 6: Advanced Metaprogramming",
            level: "Master",
            order: 5,
            lessons: [
                {
                    title: "6.1 Templates & Generics",
                    slug: "templates",
                    description: "Writing code that generates code.",
                    order: 0,
                    content: [
                        { type: "text", body: "Templates allow functions and classes to operate with generic types." },
                        { type: "code", body: "template <typename T>\nT getMax(T a, T b) {\n    return (a > b) ? a : b;\n}" }
                    ],
                    questions: [
                        {
                            type: "MCQ",
                            prompt: "When is template code actually compiled?",
                            options: ["At runtime", "When the template is defined", "When the template is instantiated", "During preprocessing"],
                            solution: 2,
                            concepts: ["compilation", "templates"]
                        }
                    ]
                },
                {
                    title: "6.2 Move Semantics (R-Values)",
                    slug: "move-semantics",
                    description: "Performance optimization by 'stealing' resources.",
                    order: 1,
                    content: [
                        { type: "text", body: "Moving is cheaper than copying. An R-value reference (`&&`) binds to temporary objects." },
                        { type: "code", body: "void process(std::string&& s) {\n    std::string kept = std::move(s);\n}" }
                    ],
                    questions: [
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Cast variable 'x' to an r-value to enable moving.",
                            codeTemplate: "std::___(x);",
                            solution: "move",
                            concepts: ["optimization"]
                        }
                    ]
                }
            ]
        }
    ]
};

module.exports = { cPlusPlusCourse };
