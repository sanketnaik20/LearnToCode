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
                    level: "Beginner",
                    order: 0,
                    content: [
                        { type: "text", body: "Every C++ program requires a 'main' function. This is the entry point where execution begins." },
                        { type: "code", body: "#include <iostream> // Preprocessor directive\n\n// Main execution function\nint main() {\n    std::cout << \"Hello World\";\n    return 0;\n}" },
                        { type: "text", body: "Directives like `#include` tell the compiler to add specific libraries before compiling." },
                        { type: "text", body: "The `return 0;` statement indicates that the program executed successfully. A non-zero return value typically indicates an error." }
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
                            type: "MCQ",
                            prompt: "What does the 'return 0;' statement signify at the end of main()?",
                            options: ["The program will restart", "Successful program execution", "An error occurred", "Memory is being freed"],
                            solution: 1,
                            concepts: ["syntax", "fundamentals"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Complete the code to print text to the console.",
                            codeTemplate: "std::___ << \"Hello\";",
                            solution: "cout",
                            concepts: ["io", "syntax"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Complete the preprocessor directive to include the input/output library.",
                            codeTemplate: "#___ <iostream>",
                            solution: "include",
                            concepts: ["preprocessor", "syntax"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Reorder the blocks to create a valid C++ program that prints 'Hello'.",
                            blocks: [
                                "#include <iostream>",
                                "int main() {",
                                "    std::cout << \"Hello\";",
                                "    return 0;",
                                "}"
                            ],
                            solution: [0, 1, 2, 3, 4],
                            concepts: ["syntax"]
                        },
                        {
                            type: "MCQ",
                            prompt: "Which symbol is used to start a single-line comment in C++?",
                            options: ["/* */", "#", "//", "--"],
                            solution: 2,
                            concepts: ["syntax", "comments"]
                        }
                    ]
                },
                {
                    title: "1.2 Variables & Primitive Types",
                    slug: "vars-and-types",
                    description: "Storing data: int, double, char, bool, and string.",
                    level: "Beginner",
                    order: 1,
                    content: [
                        { type: "text", body: "C++ is strongly typed. Common types include `int` (integers), `double` (decimals), `char` (single characters), and `bool` (true/false)." },
                        { type: "code", body: "int score = 100;\ndouble pi = 3.14159;\nchar grade = 'A';\nbool isPassed = true;" },
                        { type: "text", body: "Type safety helps catch bugs at compile time rather than runtime. Choose appropriate types for your data." }
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
                            type: "MCQ",
                            prompt: "Which data type would be most appropriate for storing a person's age?",
                            options: ["double", "char", "int", "bool"],
                            solution: 2,
                            concepts: ["types", "design"]
                        },
                        {
                            type: "MCQ",
                            prompt: "What is the difference between 'float' and 'double'?",
                            options: ["float is for integers", "double has more precision", "They are identical", "float is for scientific notation only"],
                            solution: 1,
                            concepts: ["types", "precision"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Declare a boolean variable named 'isActive' set to true.",
                            codeTemplate: "___ isActive = true;",
                            solution: "bool",
                            concepts: ["types"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Declare a character variable named 'initial' set to 'X'.",
                            codeTemplate: "___ initial = 'X';",
                            solution: "char",
                            concepts: ["types"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Arrange the code to declare variables and print their sum.",
                            blocks: [
                                "int a = 5;",
                                "int b = 10;",
                                "int sum = a + b;",
                                "std::cout << sum;"
                            ],
                            solution: [0, 1, 2, 3],
                            concepts: ["variables", "arithmetic"]
                        }
                    ]
                },
                {
                    title: "1.3 Control Flow (If/Else & Loops)",
                    slug: "control-flow",
                    description: "Making decisions and repeating tasks.",
                    level: "Beginner",
                    order: 2,
                    content: [
                        { type: "text", body: "Use `if`, `else if`, and `else` for logic. Use `for` and `while` loops for iteration." },
                        { type: "code", body: "for (int i = 0; i < 5; i++) {\n    if (i % 2 == 0) std::cout << i << \" is even\";\n}" },
                        { type: "text", body: "The modulo operator (%) returns the remainder of a division. It's useful for checking if a number is even or odd." }
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
                            type: "MCQ",
                            prompt: "What will be the output of: for(int i=0; i<3; i++) { cout << i; }",
                            options: ["123", "012", "0123", "321"],
                            solution: 1,
                            concepts: ["loops", "output"]
                        },
                        {
                            type: "MCQ",
                            prompt: "When does a 'do-while' loop check its condition?",
                            options: ["Before the first iteration", "After each iteration", "Only once at the start", "Never"],
                            solution: 1,
                            concepts: ["loops"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Complete the condition to check if 'x' is greater than 10.",
                            codeTemplate: "if (x ___ 10) { /* do something */ }",
                            solution: ">",
                            concepts: ["conditionals", "operators"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Complete the loop to iterate from 0 to 9.",
                            codeTemplate: "for (int i = 0; i ___ 10; i++)",
                            solution: "<",
                            concepts: ["loops"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Arrange code to print numbers 0 to 4.",
                            blocks: [
                                "for (int i = 0; i < 5; i++) {",
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
                    level: "Intermediate",
                    order: 3,
                    content: [
                        { type: "text", body: "A pointer stores a memory address. A reference is an alias for an existing variable." },
                        { type: "code", body: "int x = 10;\nint* ptr = &x; // ptr holds address of x\nint& ref = x;  // ref is an alias for x" },
                        { type: "text", body: "Changing `ref` changes `x`. Changing `ptr` makes it point somewhere else." },
                        { type: "text", body: "The `&` operator gets the address of a variable. The `*` operator dereferences a pointer to access the value at that address." }
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
                            type: "MCQ",
                            prompt: "What does 'int* ptr = nullptr;' mean?",
                            options: ["ptr points to integer 0", "ptr is a null pointer", "ptr is undefined", "ptr points to negative memory"],
                            solution: 1,
                            concepts: ["pointers", "nullptr"]
                        },
                        {
                            type: "MCQ",
                            prompt: "If int x = 5; int& ref = x; ref = 10; what is the value of x?",
                            options: ["5", "10", "0", "Undefined"],
                            solution: 1,
                            concepts: ["references"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Access the value stored at the address contained in pointer 'p'.",
                            codeTemplate: "int val = ___p;",
                            solution: "*",
                            concepts: ["pointers", "dereferencing"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Get the memory address of variable 'x'.",
                            codeTemplate: "int* ptr = ___x;",
                            solution: "&",
                            concepts: ["pointers", "address-of"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Arrange code to create a pointer to x and print the value via the pointer.",
                            blocks: [
                                "int x = 42;",
                                "int* ptr = &x;",
                                "std::cout << *ptr;"
                            ],
                            solution: [0, 1, 2],
                            concepts: ["pointers"]
                        }
                    ]
                },
                {
                    title: "2.2 Dynamic Memory (New & Delete)",
                    slug: "dynamic-memory",
                    description: "Allocating memory on the Heap.",
                    level: "Intermediate",
                    order: 4,
                    content: [
                        { type: "text", body: "Local variables live on the Stack. For persistent memory, we use the Heap with `new`." },
                        { type: "code", body: "int* arr = new int[5]; // Allocates array on heap\n// ... use array ...\ndelete[] arr; // Manual cleanup required!" },
                        { type: "text", body: "Failing to call delete causes a memory leak. Always pair new with delete, and new[] with delete[]." }
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
                            type: "MCQ",
                            prompt: "Which should you use to delete an array allocated with 'new int[10]'?",
                            options: ["delete arr;", "delete[] arr;", "free(arr);", "arr.delete();"],
                            solution: 1,
                            concepts: ["memory-management", "arrays"]
                        },
                        {
                            type: "MCQ",
                            prompt: "Where is dynamically allocated memory stored?",
                            options: ["Stack", "Heap", "Registry", "Cache"],
                            solution: 1,
                            concepts: ["memory-management"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Allocate a single integer on the heap.",
                            codeTemplate: "int* p = ___ int;",
                            solution: "new",
                            concepts: ["heap", "allocation"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Free the memory pointed to by pointer 'p'.",
                            codeTemplate: "___ p;",
                            solution: "delete",
                            concepts: ["heap", "deallocation"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Allocate a single integer on the heap, use it, and delete it safely.",
                            blocks: [
                                "int* p = new int;",
                                "*p = 5;",
                                "std::cout << *p;",
                                "delete p;",
                                "p = nullptr;"
                            ],
                            solution: [0, 1, 2, 3, 4],
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
                    level: "Intermediate",
                    order: 5,
                    content: [
                        { type: "text", body: "Classes bundle data and methods. `public` members are accessible everywhere; `private` members only inside the class." },
                        { type: "code", body: "class BankAccount {\nprivate:\n    double balance;\npublic:\n    BankAccount(double b) : balance(b) {} // Constructor\n    double getBalance() { return balance; }\n};" }
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
                            type: "MCQ",
                            prompt: "What is the default access modifier for class members in C++?",
                            options: ["public", "private", "protected", "internal"],
                            solution: 1,
                            concepts: ["oop", "access-modifiers"]
                        },
                        {
                            type: "MCQ",
                            prompt: "What is the purpose of a destructor?",
                            options: ["To create objects", "To clean up resources when an object is destroyed", "To copy objects", "To compare objects"],
                            solution: 1,
                            concepts: ["oop", "destructors"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Prevent a class member from being accessed outside the class.",
                            codeTemplate: "___: int secretData;",
                            solution: "private",
                            concepts: ["oop", "encapsulation"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Allow a class member to be accessed from anywhere.",
                            codeTemplate: "___: void display();",
                            solution: "public",
                            concepts: ["oop", "encapsulation"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Arrange the code to define a simple class with a constructor.",
                            blocks: [
                                "class Dog {",
                                "private:",
                                "    std::string name;",
                                "public:",
                                "    Dog(std::string n) : name(n) {}",
                                "};"
                            ],
                            solution: [0, 1, 2, 3, 4, 5],
                            concepts: ["oop", "constructors"]
                        }
                    ]
                },
                {
                    title: "3.2 Inheritance & Polymorphism",
                    slug: "inheritance",
                    description: "Is-A relationships and Virtual Functions.",
                    level: "Intermediate",
                    order: 6,
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
                            type: "MCQ",
                            prompt: "What type of inheritance is 'class Dog : public Animal'?",
                            options: ["Private inheritance", "Public inheritance", "Protected inheritance", "Multiple inheritance"],
                            solution: 1,
                            concepts: ["oop", "inheritance"]
                        },
                        {
                            type: "MCQ",
                            prompt: "What is a pure virtual function?",
                            options: ["A function with no body, declared with = 0", "A function that cannot be overridden", "A static function", "A friend function"],
                            solution: 0,
                            concepts: ["oop", "abstract-classes"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Explicitly state that a function is intended to override a base function.",
                            codeTemplate: "void myFunction() ___",
                            solution: "override",
                            concepts: ["oop", "modern-cpp"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Declare that a class inherits publicly from Animal.",
                            codeTemplate: "class Cat : ___ Animal",
                            solution: "public",
                            concepts: ["oop", "inheritance"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Arrange code to create a derived class that overrides a virtual function.",
                            blocks: [
                                "class Shape {",
                                "public:",
                                "    virtual double area() = 0;",
                                "};",
                                "class Circle : public Shape {",
                                "public:",
                                "    double area() override { return 3.14 * r * r; }",
                                "};"
                            ],
                            solution: [0, 1, 2, 3, 4, 5, 6, 7],
                            concepts: ["oop", "polymorphism"]
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
                    level: "Advanced",
                    order: 7,
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
                            type: "MCQ",
                            prompt: "What is the underlying data structure of std::map?",
                            options: ["Hash table", "Red-black tree", "Array", "Linked list"],
                            solution: 1,
                            concepts: ["stl", "data-structures"]
                        },
                        {
                            type: "MCQ",
                            prompt: "Which container would you use for fast key-value lookups with no ordering?",
                            options: ["std::map", "std::unordered_map", "std::vector", "std::set"],
                            solution: 1,
                            concepts: ["stl", "performance"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Check the number of elements in a vector named 'v'.",
                            codeTemplate: "int s = v.___;",
                            solution: "size()",
                            concepts: ["stl"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Add element 42 to the end of vector 'v'.",
                            codeTemplate: "v.___(42);",
                            solution: "push_back",
                            concepts: ["stl", "vectors"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Create a vector, add elements, and iterate through it.",
                            blocks: [
                                "std::vector<int> v;",
                                "v.push_back(10);",
                                "v.push_back(20);",
                                "for (int x : v) {",
                                "    std::cout << x;",
                                "}"
                            ],
                            solution: [0, 1, 2, 3, 4, 5],
                            concepts: ["stl", "loops"]
                        }
                    ]
                },
                {
                    title: "4.2 Algorithms",
                    slug: "stl-algorithms",
                    description: "Sorting, searching, and manipulating ranges.",
                    level: "Advanced",
                    order: 8,
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
                        },
                        {
                            type: "MCQ",
                            prompt: "What algorithm would you use to find the maximum element in a range?",
                            options: ["std::find", "std::max_element", "std::binary_search", "std::upper_bound"],
                            solution: 1,
                            concepts: ["stl", "algorithms"]
                        },
                        {
                            type: "MCQ",
                            prompt: "What is the time complexity of std::sort?",
                            options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
                            solution: 1,
                            concepts: ["complexity", "algorithms"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Sort a vector 'v' in ascending order.",
                            codeTemplate: "std::___(v.begin(), v.end());",
                            solution: "sort",
                            concepts: ["stl", "algorithms"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Reverse the elements in vector 'v'.",
                            codeTemplate: "std::___(v.begin(), v.end());",
                            solution: "reverse",
                            concepts: ["stl", "algorithms"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Sort a vector and find the minimum element.",
                            blocks: [
                                "#include <algorithm>",
                                "std::vector<int> v = {5, 2, 8, 1};",
                                "std::sort(v.begin(), v.end());",
                                "int minVal = *std::min_element(v.begin(), v.end());",
                                "std::cout << minVal;"
                            ],
                            solution: [0, 1, 2, 3, 4],
                            concepts: ["stl", "algorithms"]
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
                    level: "Master",
                    order: 9,
                    content: [
                        { type: "text", body: "Never call `new` or `delete` manually again. Use `std::unique_ptr` for exclusive ownership and `std::shared_ptr` for shared ownership." },
                        { type: "code", body: "#include <memory>\nauto p = std::make_unique<int>(10);\n// No need for delete!" }
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
                            type: "MCQ",
                            prompt: "What happens when a unique_ptr goes out of scope?",
                            options: ["Nothing", "The memory is automatically freed", "A memory leak occurs", "An exception is thrown"],
                            solution: 1,
                            concepts: ["memory", "smart-pointers"]
                        },
                        {
                            type: "MCQ",
                            prompt: "When should you use shared_ptr over unique_ptr?",
                            options: ["Always", "When multiple owners need to share the resource", "Never", "For primitive types only"],
                            solution: 1,
                            concepts: ["memory", "smart-pointers"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Create a shared pointer that counts references.",
                            codeTemplate: "std::___<int> p = std::make_shared<int>(5);",
                            solution: "shared_ptr",
                            concepts: ["memory"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Create a unique pointer to an integer with value 42.",
                            codeTemplate: "auto ptr = std::___<int>(42);",
                            solution: "make_unique",
                            concepts: ["memory", "smart-pointers"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Create a unique_ptr and transfer ownership to another.",
                            blocks: [
                                "auto ptr1 = std::make_unique<int>(100);",
                                "auto ptr2 = std::move(ptr1);",
                                "std::cout << *ptr2;",
                                "// ptr1 is now nullptr"
                            ],
                            solution: [0, 1, 2, 3],
                            concepts: ["smart-pointers", "move-semantics"]
                        }
                    ]
                },
                {
                    title: "5.2 Lambda Expressions",
                    slug: "lambdas",
                    description: "Anonymous functions and closures.",
                    level: "Master",
                    order: 10,
                    content: [
                        { type: "text", body: "Lambdas are inline functions often used with STL algorithms." },
                        { type: "code", body: "auto add = [](int a, int b) { return a + b; };\nint x = 10;\nauto captureX = [x](int a) { return x + a; };" }
                    ],
                    questions: [
                        {
                            type: "MCQ",
                            prompt: "What does [&] in a lambda capture clause mean?",
                            options: ["Capture all by value", "Capture all by reference", "Capture nothing", "Create a new scope"],
                            solution: 1,
                            concepts: ["lambdas", "capture"]
                        },
                        {
                            type: "MCQ",
                            prompt: "What does [=] in a lambda capture clause mean?",
                            options: ["Capture all by reference", "Capture all by value", "No capture", "Mutable capture"],
                            solution: 1,
                            concepts: ["lambdas", "capture"]
                        },
                        {
                            type: "MCQ",
                            prompt: "How do you explicitly specify the return type of a lambda?",
                            options: ["Using return keyword only", "Using -> after the parameter list", "Using typedef", "Lambdas auto-deduce only"],
                            solution: 1,
                            concepts: ["lambdas", "syntax"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Define a lambda that takes two integers and returns their product.",
                            codeTemplate: "auto multiply = [](int a, int b) { ___ a * b; };",
                            solution: "return",
                            concepts: ["lambdas"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Capture variable 'x' by reference in a lambda.",
                            codeTemplate: "auto func = [___]() { x++; };",
                            solution: "&x",
                            concepts: ["lambdas", "capture"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Construct a lambda that takes no arguments and prints 'Hi'.",
                            blocks: [
                                "auto func = ",
                                "[]",
                                "() {",
                                "    std::cout << \"Hi\";",
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
                    level: "Master",
                    order: 11,
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
                        },
                        {
                            type: "MCQ",
                            prompt: "What is template specialization?",
                            options: ["Making templates faster", "Providing custom implementation for specific types", "Removing template code", "Converting templates to macros"],
                            solution: 1,
                            concepts: ["templates", "specialization"]
                        },
                        {
                            type: "MCQ",
                            prompt: "What keyword can be used instead of 'typename' in a template declaration?",
                            options: ["type", "class", "auto", "generic"],
                            solution: 1,
                            concepts: ["templates", "syntax"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Declare a template function with a type parameter T.",
                            codeTemplate: "template <___ T>",
                            solution: "typename",
                            concepts: ["templates"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Create a template class that stores a generic type.",
                            codeTemplate: "___ <typename T>\nclass Container { T value; };",
                            solution: "template",
                            concepts: ["templates"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Create a template function that swaps two values.",
                            blocks: [
                                "template <typename T>",
                                "void swap(T& a, T& b) {",
                                "    T temp = a;",
                                "    a = b;",
                                "    b = temp;",
                                "}"
                            ],
                            solution: [0, 1, 2, 3, 4, 5],
                            concepts: ["templates", "functions"]
                        }
                    ]
                },
                {
                    title: "6.2 Move Semantics (R-Values)",
                    slug: "move-semantics",
                    description: "Performance optimization by 'stealing' resources.",
                    level: "Master",
                    order: 12,
                    content: [
                        { type: "text", body: "Moving is cheaper than copying. An R-value reference (`&&`) binds to temporary objects." },
                        { type: "code", body: "void process(std::string&& s) {\n    std::string kept = std::move(s);\n}" }
                    ],
                    questions: [
                        {
                            type: "MCQ",
                            prompt: "What is the difference between an L-value and an R-value?",
                            options: ["L-values are on the left of assignment, R-values are temporary", "There is no difference", "R-values are always larger", "L-values are literals"],
                            solution: 0,
                            concepts: ["move-semantics"]
                        },
                        {
                            type: "MCQ",
                            prompt: "After std::move(x), what is the state of x?",
                            options: ["Unchanged", "Undefined (but valid)", "Null", "Deleted"],
                            solution: 1,
                            concepts: ["move-semantics"]
                        },
                        {
                            type: "MCQ",
                            prompt: "When should you implement a move constructor?",
                            options: ["Always", "When your class manages resources like dynamic memory", "Never", "Only for primitive types"],
                            solution: 1,
                            concepts: ["move-semantics", "oop"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Cast variable 'x' to an r-value to enable moving.",
                            codeTemplate: "std::___(x);",
                            solution: "move",
                            concepts: ["optimization"]
                        },
                        {
                            type: "FILL_IN_BLANK",
                            prompt: "Declare a function parameter as an r-value reference to string.",
                            codeTemplate: "void process(std::string___ s);",
                            solution: "&&",
                            concepts: ["move-semantics"]
                        },
                        {
                            type: "PARSONS",
                            prompt: "Create a class with a move constructor.",
                            blocks: [
                                "class Buffer {",
                                "    int* data;",
                                "public:",
                                "    Buffer(Buffer&& other) noexcept {",
                                "        data = other.data;",
                                "        other.data = nullptr;",
                                "    }",
                                "};"
                            ],
                            solution: [0, 1, 2, 3, 4, 5, 6, 7],
                            concepts: ["move-semantics", "constructors"]
                        }
                    ]
                }
            ]
        }
    ]
};

module.exports = { cPlusPlusCourse };
