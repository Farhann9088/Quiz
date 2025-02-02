// Initialize empty questions array
let questions = [];
let questionsLoaded = false;

// Function to decode HTML entities
function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

// Function to fetch questions from API
async function fetchQuestions() {
    if (questionsLoaded) return; // Don't fetch if already loaded

    try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&category=18&type=multiple');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Transform the API data to match our quiz format
        questions = data.results.map((q, index) => {
            let allOptions = [q.correct_answer, ...q.incorrect_answers];
            allOptions = allOptions.sort(() => Math.random() - 0.5);
            const correctIndex = allOptions.indexOf(q.correct_answer);

            return {
                numb: index + 1,
                question: decodeHTMLEntities(q.question),
                answer: `${String.fromCharCode(65 + correctIndex)}. ${decodeHTMLEntities(q.correct_answer)}`,
                options: allOptions.map((opt, i) => 
                    `${String.fromCharCode(65 + i)}. ${decodeHTMLEntities(opt)}`
                )
            };
        });

        questionsLoaded = true;

    } catch (error) {
        console.error('Failed to fetch questions:', error);
        // Fallback questions if API fails
        questions = [
            {
                numb: 1,
                question: "What does HTML stand for?",
                answer: "C. Hyper Text Markup Language",
                options: [
                    "A. Hyper Type Multi Language",
                    "B. Hyper Text Multiple Language",
                    "C. Hyper Text Markup Language",
                    "D. Home Text Multi Language",
                ]
            },
            {
                numb: 2,
                question: "What does CSS stand for?",
                answer: "A. Cascading Style Sheet",
                options: [
                    "A. Cascading Style Sheet",
                    "B. Cute Style Sheet",
                    "C. Computer Style Sheet",
                    "D. Common Style Sheet",
                ]
            },
            {
                numb: 3,
                question: "What does PHP stand for?",
                answer: "A. Hypertext Preprocessor",
                options: [
                    "A. Hypertext Preprocessor",
                    "B. Home Programming Page",
                    "C. Hypertext Programming",
                    "D. Programming Home Page",
                ]
            },
            {
                numb: 4,
                question: "What does SQL stand for?",
                answer: "A. Structured Query Language",
                options: [
                    "A. Structured Query Language",
                    "B. Standard Query Language",
                    "C. Simple Query Language",
                    "D. System Query Language",
                ]
            },
            {
                numb: 5,
                question: "What does XML stand for?",
                answer: "A. Extensible Markup Language",
                options: [
                    "A. Extensible Markup Language",
                    "B. Execute Multiple Language",
                    "C. Extra Markup Language",
                    "D. Examine Multiple Language",
                ]
            }
        ];
        questionsLoaded = true;
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch questions immediately when page loads
    await fetchQuestions();
    
    // Add event listener to start button
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (questions.length > 0) {
                const popupInfo = document.querySelector('.popup-info');
                const main = document.querySelector('.main');
                popupInfo.classList.add('active');
                main.classList.add('active');
            }
        });
    }

    // Add event listener to continue button
    const continueBtn = document.querySelector('.continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            if (questions.length > 0) {
                // Initialize the quiz
                if (typeof showQuestions === 'function') {
                    showQuestions(0);
                }
                if (typeof questionCounter === 'function') {
                    questionCounter(1);
                }
                if (typeof headerScore === 'function') {
                    headerScore();
                }
            }
        });
    }
});