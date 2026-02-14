
import { Achievement, UserStats } from './types';

// Spaced Repetition Intervals in Days
export const SRS_INTERVALS = [1, 3, 7, 14, 30, 60, 90];

export const XP_REWARDS = {
  ADD_PROBLEM: 50,
  REVIEW_PROBLEM: 20,
  STREAK_BONUS: 100,
};

export const DIFFICULTY_COLORS = {
  Easy: 'text-teal-400 bg-teal-400/10 border-teal-400/20',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Hard: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_blood',
    title: 'Hello World',
    description: 'Log your first problem',
    icon: 'Zap',
    condition: (stats: UserStats) => stats.totalSolved >= 1
  },
  {
    id: 'streak_3',
    title: 'Momentum',
    description: 'Reach a 3-day streak',
    icon: 'Flame',
    condition: (stats: UserStats) => stats.streak >= 3
  },
  {
    id: 'streak_7',
    title: 'Unstoppable',
    description: 'Reach a 7-day streak',
    icon: 'Rocket',
    condition: (stats: UserStats) => stats.streak >= 7
  },
  {
    id: 'novice_review',
    title: 'Dedicated',
    description: 'Review 10 problems total',
    icon: 'BookOpen',
    condition: (stats: UserStats) => stats.totalReviewed >= 10
  },
  {
    id: 'master_log',
    title: 'Algorithmist',
    description: 'Log 50 unique problems',
    icon: 'Database',
    condition: (stats: UserStats) => stats.totalSolved >= 50
  },
  {
    id: 'xp_hunter',
    title: 'Level Up',
    description: 'Reach 1000 XP',
    icon: 'Crown',
    condition: (stats: UserStats) => stats.xp >= 1000
  }
];

export const SAMPLE_PROBLEMS = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    createdAt: Date.now(),
    lastReviewed: Date.now(),
    nextReview: Date.now(),
    level: 0,
    history: []
  }
];

// Simplified NeetCode 150 Data (Partial for demo purposes, can be expanded)
export const NEETCODE_PROBLEMS = [
    { category: "Arrays & Hashing", title: "Contains Duplicate", difficulty: "Easy", link: "https://leetcode.com/problems/contains-duplicate/" },
    { category: "Arrays & Hashing", title: "Valid Anagram", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram/" },
    { category: "Arrays & Hashing", title: "Two Sum", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/" },
    { category: "Arrays & Hashing", title: "Group Anagrams", difficulty: "Medium", link: "https://leetcode.com/problems/group-anagrams/" },
    { category: "Arrays & Hashing", title: "Top K Frequent Elements", difficulty: "Medium", link: "https://leetcode.com/problems/top-k-frequent-elements/" },
    { category: "Arrays & Hashing", title: "Product of Array Except Self", difficulty: "Medium", link: "https://leetcode.com/problems/product-of-array-except-self/" },
    { category: "Arrays & Hashing", title: "Valid Sudoku", difficulty: "Medium", link: "https://leetcode.com/problems/valid-sudoku/" },
    { category: "Arrays & Hashing", title: "Longest Consecutive Sequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-consecutive-sequence/" },
    { category: "Two Pointers", title: "Valid Palindrome", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome/" },
    { category: "Two Pointers", title: "Two Sum II Input Array Is Sorted", difficulty: "Medium", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
    { category: "Two Pointers", title: "3Sum", difficulty: "Medium", link: "https://leetcode.com/problems/3sum/" },
    { category: "Two Pointers", title: "Container With Most Water", difficulty: "Medium", link: "https://leetcode.com/problems/container-with-most-water/" },
    { category: "Two Pointers", title: "Trapping Rain Water", difficulty: "Hard", link: "https://leetcode.com/problems/trapping-rain-water/" },
    { category: "Sliding Window", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { category: "Sliding Window", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { category: "Sliding Window", title: "Longest Repeating Character Replacement", difficulty: "Medium", link: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
    { category: "Sliding Window", title: "Permutation in String", difficulty: "Medium", link: "https://leetcode.com/problems/permutation-in-string/" },
    { category: "Stack", title: "Valid Parentheses", difficulty: "Easy", link: "https://leetcode.com/problems/valid-parentheses/" },
    { category: "Stack", title: "Min Stack", difficulty: "Medium", link: "https://leetcode.com/problems/min-stack/" },
    { category: "Stack", title: "Evaluate Reverse Polish Notation", difficulty: "Medium", link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
    { category: "Stack", title: "Generate Parentheses", difficulty: "Medium", link: "https://leetcode.com/problems/generate-parentheses/" },
    { category: "Stack", title: "Daily Temperatures", difficulty: "Medium", link: "https://leetcode.com/problems/daily-temperatures/" },
    { category: "Stack", title: "Car Fleet", difficulty: "Medium", link: "https://leetcode.com/problems/car-fleet/" },
    { category: "Stack", title: "Largest Rectangle in Histogram", difficulty: "Hard", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
    { category: "Binary Search", title: "Binary Search", difficulty: "Easy", link: "https://leetcode.com/problems/binary-search/" },
    { category: "Binary Search", title: "Search a 2D Matrix", difficulty: "Medium", link: "https://leetcode.com/problems/search-a-2d-matrix/" },
    { category: "Binary Search", title: "Koko Eating Bananas", difficulty: "Medium", link: "https://leetcode.com/problems/koko-eating-bananas/" },
    { category: "Binary Search", title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
    { category: "Binary Search", title: "Search in Rotated Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
    { category: "Binary Search", title: "Time Based Key-Value Store", difficulty: "Medium", link: "https://leetcode.com/problems/time-based-key-value-store/" },
    { category: "Binary Search", title: "Median of Two Sorted Arrays", difficulty: "Hard", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/" }
];

export const BLIND75_PROBLEMS = [
    { category: "Array", title: "Two Sum", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/" },
    { category: "Array", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { category: "Array", title: "Contains Duplicate", difficulty: "Easy", link: "https://leetcode.com/problems/contains-duplicate/" },
    { category: "Array", title: "Product of Array Except Self", difficulty: "Medium", link: "https://leetcode.com/problems/product-of-array-except-self/" },
    { category: "Array", title: "Maximum Subarray", difficulty: "Medium", link: "https://leetcode.com/problems/maximum-subarray/" },
    { category: "Array", title: "Maximum Product Subarray", difficulty: "Medium", link: "https://leetcode.com/problems/maximum-product-subarray/" },
    { category: "Array", title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
    { category: "Array", title: "Search in Rotated Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
    { category: "Array", title: "3Sum", difficulty: "Medium", link: "https://leetcode.com/problems/3sum/" },
    { category: "Array", title: "Container With Most Water", difficulty: "Medium", link: "https://leetcode.com/problems/container-with-most-water/" },
    { category: "Binary", title: "Sum of Two Integers", difficulty: "Medium", link: "https://leetcode.com/problems/sum-of-two-integers/" },
    { category: "Binary", title: "Number of 1 Bits", difficulty: "Easy", link: "https://leetcode.com/problems/number-of-1-bits/" },
    { category: "Binary", title: "Counting Bits", difficulty: "Easy", link: "https://leetcode.com/problems/counting-bits/" },
    { category: "Binary", title: "Missing Number", difficulty: "Easy", link: "https://leetcode.com/problems/missing-number/" },
    { category: "Binary", title: "Reverse Bits", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-bits/" },
    { category: "DP", title: "Climbing Stairs", difficulty: "Easy", link: "https://leetcode.com/problems/climbing-stairs/" },
    { category: "DP", title: "Coin Change", difficulty: "Medium", link: "https://leetcode.com/problems/coin-change/" },
    { category: "DP", title: "Longest Increasing Subsequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-increasing-subsequence/" },
    { category: "DP", title: "Longest Common Subsequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-common-subsequence/" },
    { category: "DP", title: "Word Break", difficulty: "Medium", link: "https://leetcode.com/problems/word-break/" },
    { category: "DP", title: "Combination Sum", difficulty: "Medium", link: "https://leetcode.com/problems/combination-sum/" },
    { category: "DP", title: "House Robber", difficulty: "Medium", link: "https://leetcode.com/problems/house-robber/" },
    { category: "DP", title: "House Robber II", difficulty: "Medium", link: "https://leetcode.com/problems/house-robber-ii/" },
    { category: "DP", title: "Decode Ways", difficulty: "Medium", link: "https://leetcode.com/problems/decode-ways/" },
    { category: "DP", title: "Unique Paths", difficulty: "Medium", link: "https://leetcode.com/problems/unique-paths/" },
    { category: "DP", title: "Jump Game", difficulty: "Medium", link: "https://leetcode.com/problems/jump-game/" },
    { category: "Graph", title: "Clone Graph", difficulty: "Medium", link: "https://leetcode.com/problems/clone-graph/" },
    { category: "Graph", title: "Course Schedule", difficulty: "Medium", link: "https://leetcode.com/problems/course-schedule/" },
    { category: "Graph", title: "Pacific Atlantic Water Flow", difficulty: "Medium", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
    { category: "Graph", title: "Number of Islands", difficulty: "Medium", link: "https://leetcode.com/problems/number-of-islands/" },
    { category: "Graph", title: "Longest Consecutive Sequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-consecutive-sequence/" },
    { category: "Graph", title: "Alien Dictionary", difficulty: "Hard", link: "https://leetcode.com/problems/alien-dictionary/" },
    { category: "Graph", title: "Graph Valid Tree", difficulty: "Medium", link: "https://leetcode.com/problems/graph-valid-tree/" },
    { category: "Graph", title: "Number of Connected Components in an Undirected Graph", difficulty: "Medium", link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },
    { category: "Interval", title: "Insert Interval", difficulty: "Medium", link: "https://leetcode.com/problems/insert-interval/" },
    { category: "Interval", title: "Merge Intervals", difficulty: "Medium", link: "https://leetcode.com/problems/merge-intervals/" },
    { category: "Interval", title: "Non-overlapping Intervals", difficulty: "Medium", link: "https://leetcode.com/problems/non-overlapping-intervals/" },
    { category: "Interval", title: "Meeting Rooms", difficulty: "Easy", link: "https://leetcode.com/problems/meeting-rooms/" },
    { category: "Interval", title: "Meeting Rooms II", difficulty: "Medium", link: "https://leetcode.com/problems/meeting-rooms-ii/" },
    { category: "Linked List", title: "Reverse Linked List", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-linked-list/" },
    { category: "Linked List", title: "Linked List Cycle", difficulty: "Easy", link: "https://leetcode.com/problems/linked-list-cycle/" },
    { category: "Linked List", title: "Merge Two Sorted Lists", difficulty: "Easy", link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
    { category: "Linked List", title: "Merge k Sorted Lists", difficulty: "Hard", link: "https://leetcode.com/problems/merge-k-sorted-lists/" },
    { category: "Linked List", title: "Remove Nth Node From End of List", difficulty: "Medium", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
    { category: "Linked List", title: "Reorder List", difficulty: "Medium", link: "https://leetcode.com/problems/reorder-list/" },
    { category: "Matrix", title: "Set Matrix Zeroes", difficulty: "Medium", link: "https://leetcode.com/problems/set-matrix-zeroes/" },
    { category: "Matrix", title: "Spiral Matrix", difficulty: "Medium", link: "https://leetcode.com/problems/spiral-matrix/" },
    { category: "Matrix", title: "Rotate Image", difficulty: "Medium", link: "https://leetcode.com/problems/rotate-image/" },
    { category: "String", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { category: "String", title: "Longest Repeating Character Replacement", difficulty: "Medium", link: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
    { category: "String", title: "Minimum Window Substring", difficulty: "Hard", link: "https://leetcode.com/problems/minimum-window-substring/" },
    { category: "String", title: "Valid Anagram", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram/" },
    { category: "String", title: "Group Anagrams", difficulty: "Medium", link: "https://leetcode.com/problems/group-anagrams/" },
    { category: "String", title: "Valid Parentheses", difficulty: "Easy", link: "https://leetcode.com/problems/valid-parentheses/" },
    { category: "String", title: "Valid Palindrome", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome/" },
    { category: "String", title: "Longest Palindromic Substring", difficulty: "Medium", link: "https://leetcode.com/problems/longest-palindromic-substring/" },
    { category: "String", title: "Palindromic Substrings", difficulty: "Medium", link: "https://leetcode.com/problems/palindromic-substrings/" },
    { category: "Tree", title: "Maximum Depth of Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
    { category: "Tree", title: "Same Tree", difficulty: "Easy", link: "https://leetcode.com/problems/same-tree/" },
    { category: "Tree", title: "Invert Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/invert-binary-tree/" },
    { category: "Tree", title: "Binary Tree Maximum Path Sum", difficulty: "Hard", link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
    { category: "Tree", title: "Binary Tree Level Order Traversal", difficulty: "Medium", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
    { category: "Tree", title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
    { category: "Tree", title: "Subtree of Another Tree", difficulty: "Easy", link: "https://leetcode.com/problems/subtree-of-another-tree/" },
    { category: "Tree", title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
    { category: "Tree", title: "Validate Binary Search Tree", difficulty: "Medium", link: "https://leetcode.com/problems/validate-binary-search-tree/" },
    { category: "Tree", title: "Kth Smallest Element in a BST", difficulty: "Medium", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
    { category: "Tree", title: "Lowest Common Ancestor of a Binary Search Tree", difficulty: "Medium", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
    { category: "Tree", title: "Implement Trie (Prefix Tree)", difficulty: "Medium", link: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
    { category: "Tree", title: "Design Add and Search Words Data Structure", difficulty: "Medium", link: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
    { category: "Tree", title: "Word Search II", difficulty: "Hard", link: "https://leetcode.com/problems/word-search-ii/" },
    { category: "Heap", title: "Merge k Sorted Lists", difficulty: "Hard", link: "https://leetcode.com/problems/merge-k-sorted-lists/" },
    { category: "Heap", title: "Top K Frequent Elements", difficulty: "Medium", link: "https://leetcode.com/problems/top-k-frequent-elements/" },
    { category: "Heap", title: "Find Median from Data Stream", difficulty: "Hard", link: "https://leetcode.com/problems/find-median-from-data-stream/" }
];
