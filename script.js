document.addEventListener("DOMContentLoaded", function () {
    // Setup variables
    const questions = document.querySelectorAll(".question");
    const totalQuestions = questions.length;
    let currentQuestionIndex = 0;
    let userAnswers = {};
    let quizStarted = false;
    let quizSubmitted = false;

    // Timer setup - 30 minutes
    let timeLeft = 3 * 60 * 60;  // 3 hours in seconds
    const timerElement = document.getElementById("timer");

    // Navigation buttons
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");
    const resultDiv = document.getElementById("result");

    // Question navigation panel
    const rightBox = document.querySelector(".right.box");

    // Correct answers
    const correctAnswers = {
        q1: "B", // To establish the framework for governing a state
        q2: "C", // It is committed to fundamental values like equality and liberty
        q3: "C", // It lays down rules to guard against the misuse of authority by political leaders
        q4: "D", // By ensuring a dominant group does not use its power against less powerful people or groups
        q5: "B", // It enables the government to fulfill the aspirations of people
        q6: "A", // Monarchy
        q7: "B", // The Prime Minister and Council of Ministers
        q8: "A", // A unique blend of rigidity and flexibility
        q9: "D", // It distributes powers between the Union and States
        q10: "B", // It has independent authority and is not subject to control by any external power
        q11: "C", // India is a free and an independent country, not under the domination of any foreign state
        q12: "D", // The Indian state is neutral and impartial in matters of religion
        q13: "C", // Religious tolerance and equality
        q14: "B", // To remain independent of religious influence and ensure equality for all citizens
        q15: "A", // The People of India
        q16: "A", // India is a democratic republic where the head of state is an elected individual
        q17: "D", // Discrimination based on caste, creed, color, religion, gender, or place of birth
        q18: "C", // Equal, free, and fair opportunities for all to participate in the political process
        q19: "D", // Freedom of thought, expression, belief, faith, and worship
        q20: "B", // Ensuring the absence of special privileges for any section of society
        q21: "A", // Provision of adequate opportunities for all individuals without discrimination
        q22: "C", // The feeling of oneness and a sense of belonging among the people of the country
        q23: "D", // To strengthen the unity and solidarity of the nation
        q24: "C", // Right to freedom of speech and expression
        q25: "B", // Article 14
        q26: "A", // Right to freedom of religion
        q27: "A", // Right to life and personal liberty
        q28: "B", // To abide by the Constitution and respect its ideals and institutions, including the National Flag and the National Anthem
        q29: "C", // By protecting and improving the natural environment, including forests, lakes, rivers, and wildlife
        q30: "D", // To value and preserve the rich heritage of India's composite culture
        q31: "D", // To develop the scientific temper, humanism, and the spirit of inquiry and reform
        q32: "C", // Both A and B
        q33: "A", // Right to equality
        q34: "B", // Prohibition of forced labor
        q35: "D", // Right to freedom of religion
        q36: "B", // Article 17
        q37: "D", // Article 24
        q38: "B", // Article 16
        q39: "C", // Article 21
        q40: "B", // 42nd Amendment
        q41: "C", // To abide by the Constitution and respect its ideals and institutions
        q42: "A", // To protect the natural environment
        q43: "B", // To transfer control of Indian administration from the East India Company to the British Crown
        q44: "A", // The British Crown
        q45: "C", // Secretary of State for India
        q46: "B", // The Viceroy and a 15-member Council of Ministers
        q47: "B", // Responsible for the executive, legislative, and judicial functions in India
        q48: "B", // Rigidly centralized with no popular participation
        q49: "B", // The Revolt of 1857
        q50: "A", // It allowed the Parliament to directly manage Indian affairs
        q51: "B", // A Legislative Council
        q52: "C", // Intensified bitterness of intellectuals against British domination
        q53: "B", // Morley-Minto Reforms
        q54: "A", // Lord Minto and John Morley
        q55: "C", // Land, irrigation, and judicial stamps
        q56: "D", // To guarantee that Indians were represented in the administration
        q57: "A", // Montague-Chelmsford Reforms
        q58: "B", // Dyarchy or dual government system
        q59: "C", // Central and Provincial
        q60: "B", // Federal with a unitary bias
        q61: "D", // Edwin Samuel Montague and Lord Chelmsford
        q62: "C", // It provided a rigid constitution with no possibility for amendment
        q63: "A", // The power to veto bills, with additional veto power by the Crown
        q64: "B", // The power to make temporary ordinances and permanent acts at any time
        q65: "C", // Oppression and discrimination of native Indians
        q66: "D", // Through political treaties and Anglo-Carnatic wars
        q67: "A", // Mahatma Gandhi
        q68: "B", // Non-violent methods
        q69: "C", // Indian Independence Act
        q70: "D", // Lord Listowel
        q71: "C", // Termination of two hundred-year-old British rule of India
        q72: "B", // Political authority
        q73: "A", // Measures towards self-rule for Indian support in the war
        q74: "B", // To join either the Indian or Pakistan unions
        q75: "C", // Lord Listowel
        q76: "D", // February 20, 1947
        q77: "A", // The Parliament of the United Kingdom
        q78: "C", // Lord Mountbatten
        q79: "B", // Indian Independence Act 1947
        q80: "C", // Lord Mountbatten and Clement Attlee
        q81: "B", // Granting of independence to India and Pakistan
        q82: "D", // Self-government
        q83: "C", // King George VI
        q84: "B", // The British Crown
        q85: "A", // Sovereign, Socialist, Secular, Democratic, Republic
        q86: "C", // Sovereignty of the people
        q87: "B", // Part III
        q88: "C", // Right against exploitation
        q89: "D", // 42nd Amendment
        q90: "A", // 11
        q91: "D", // The Parliament
        q92: "B", // Lok Sabha and Rajya Sabha
        q93: "B", // A mixed economy where the government directs resources towards social welfare
        q94: "A", // Article 38
        q95: "C", // State ownership and control over key industries
        q96: "C", // Achieving equitable distribution of wealth
        q97: "A", // Economic justice
        q98: "B", // Private property
        q99: "C", // Unequal distribution of wealth
        q100: "A", // Conversion by force
        q101: "B", // Right to religious education in state-funded schools
        q102: "C", // Dr. B.R. Ambedkar
        q103: "B", // To safeguard fundamental rights
        q104: "D", // Both A and B
        q105: "B", // We, the People of India
        q106: "A", // Sovereign, Socialist, Secular, Democratic, Republic
        q107: "C", // Social, Economic, Political
        q108: "A", // Brotherhood among all citizens
        q109: "B", // Elected by the people
        q110: "B", // Chairman of the Drafting Committee
        q111: "C", // Chief architect of the Indian Constitution
        q112: "D", // Abolition of untouchability
        q113: "A", // Women, Dalits, and other marginalized communities
        q114: "B", // To draft and prepare a constitution for independent India
        q115: "D", // All of the above
        q116: "B", // To draft a constitution that ensures justice, liberty, and equality for all citizens
        q117: "D", // The Indian Constitution
        q118: "D", // Communist
        q119: "A", // Union of States
        q120: "A", // Battle of Plassey
        q121: "A", // Government of India Act 1858
        q122: "B", // It left the administration largely in the hands of British officials
        q123: "C", // Non-Cooperation Movement
        q124: "B", // Government of India Act, 1935
        q125: "B", // Introduced provincial autonomy
        q126: "B", // Single citizenship
        q127: "C", // USA
        q128: "D", // All citizens enjoy the same political and civil rights throughout the country
        q129: "A", // Part III
        q130: "B", // Right to property
        q131: "A", // Article 23
        q132: "B", // Articles 29-30
        q133: "A", // All individuals are free to practice, propagate, and profess any religion
        q134: "B", // United States
        q135: "A", // France
        q136: "C", // United States
        q137: "D", // Canada
        q138: "B", // United Kingdom
        q139: "C", // United Kingdom
        q140: "B", // South Africa
        q141: "B", // Articles 36 to 51
        q142: "D", // To provide guidelines for governance
        q143: "C", // Non-justiciability
        q144: "A", // Ireland
        q145: "A", // Promotion of cottage industries
        q146: "B", // Living wage and decent standard of life
        q147: "D", // Welfare state
        q148: "B", // They cannot be enforced by courts
        q149: "B", // 11
        q150: "C", // To enhance civic responsibility
        q151: "B", // Duty to defend the country
        q152: "C", // Social discrimination
        q153: "D", // They are moral obligations without legal enforcement
        q154: "C" // Scientific society
    };

    // Add CSS for navigation button states
    const navButtonStyles = document.createElement("style");
    navButtonStyles.textContent = `
        .right.box .btn {
            /* Keep original styling but add transitions */
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        /* Not attempted - default state */
        .right.box .btn.not-attempted {
            background-color: #f0f0f0;
            color: #555;
        }
        
        /* Attempted */
        .right.box .btn.answered {
            background-color: #2196F3;
            color: white;
        }
        
        /* Incorrect answer */
        .right.box .btn.incorrect {
            background-color: #FF5252;
            color: white;
        }
        
        /* Correct answer */
        .right.box .btn.correct {
            background-color: #4CAF50;
            color: white;
        }
        
        /* Active question */
        .right.box .btn.active {
            border: 2px solid #000;
            font-weight: bold;
        }
    `;
    document.head.appendChild(navButtonStyles);

    // Initialize question navigation buttons
    for (let i = 1; i <= totalQuestions; i++) {
        let btn = document.createElement("button");
        btn.classList.add("btn", "not-attempted");
        btn.textContent = i;
        btn.addEventListener("click", function () {
            showQuestion(i - 1);
        });
        rightBox.appendChild(btn);
    }

    // Track answer changes
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function () {
            const questionName = this.name;
            const questionNumber = parseInt(questionName.substring(1)) - 1;
            userAnswers[questionName] = this.value;

            // Update the navigation button to show it's been answered
            const navButton = document.querySelectorAll('.right.box .btn')[questionNumber];
            navButton.classList.remove('not-attempted');
            navButton.classList.add('answered');
        });
    });

    // Function to display a specific question
    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.style.display = i === index ? "block" : "none";
        });

        // Update navigation buttons
        if (!quizSubmitted) {
            prevBtn.style.display = index === 0 ? "none" : "inline-block";
            nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block";
            submitBtn.style.display = "block"; // Always show submit button
        } else {
            // After submission, always show prev/next buttons (except at boundaries)
            prevBtn.style.display = index === 0 ? "none" : "inline-block";
            nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block";
            submitBtn.style.display = "none";  // Hide submit button after submission
        }

        // Update the active question button
        document.querySelectorAll('.right.box .btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });

        currentQuestionIndex = index;
    }

    // Initialize timer
    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft > 0 && !quizSubmitted) {
            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else if (!quizSubmitted) {
            // Time's up - auto submit
            submitQuiz();
        }
    }

    // Submit the quiz
    function submitQuiz(violation = false) {
        quizSubmitted = true;
        let score = 0;
        let answeredCount = 0;

        // Calculate score
        for (let key in correctAnswers) {
            if (userAnswers[key]) {
                answeredCount++;
                if (userAnswers[key] === correctAnswers[key]) {
                    score++;
                }
            }
        }

        // Display result
        const timeExpired = timeLeft <= 0;
        resultDiv.innerHTML = `
            <h2>Quiz Results</h2>
            <p>Your Score: ${score}/${totalQuestions}</p>
            <p>Questions Answered: ${answeredCount}/${totalQuestions}</p>
            ${timeExpired ? '<p>Time Expired!</p>' : ''}
            <h3>Question Summary</h3>
            <div id="question-summary"></div>
        `;

        // Create and append question summary
        const summaryDiv = document.getElementById("question-summary");
        for (let i = 1; i <= totalQuestions; i++) {
            const qKey = `q${i}`;
            const userAnswer = userAnswers[qKey] || "Not Attempted";
            const isCorrect = userAnswers[qKey] === correctAnswers[qKey];
            const wasAttempted = userAnswers[qKey] !== undefined;

            let statusClass = "not-attempted";
            let statusText = "Not Attempted";

            if (wasAttempted) {
                if (isCorrect) {
                    statusClass = "correct";
                    statusText = "Correct";
                } else {
                    statusClass = "incorrect";
                    statusText = "Incorrect";
                }
            }

            // Update the navigation button colors based on correctness
            const navButton = document.querySelectorAll('.right.box .btn')[i-1];
            navButton.classList.remove('not-attempted', 'answered', 'correct', 'incorrect');
            navButton.classList.add(statusClass);

            const questionSummary = document.createElement("div");
            questionSummary.className = `question-result ${statusClass}`;
            questionSummary.innerHTML = `
                <p>Question ${i}: <span class="${statusClass}">${statusText}</span></p>
                <p>Your Answer: ${userAnswer}</p>
                <p>Correct Answer: ${correctAnswers[qKey]}</p>
            `;
            summaryDiv.appendChild(questionSummary);
        }

        // Add styles for the question summary
        const styleEl = document.createElement("style");
        styleEl.textContent = `
            #question-summary {
                max-height: 400px;
                overflow-y: auto;
                margin-top: 20px;
            }
            .question-result {
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 10px;
                margin-bottom: 10px;
                background-color: #f9f9f9;
            }
            .correct {
                color: green;
                font-weight: bold;
            }
            .incorrect {
                color: red;
                font-weight: bold;
            }
            .not-attempted {
                color: orange;
                font-weight: bold;
            }
        `;
        document.head.appendChild(styleEl);

        resultDiv.style.display = "block";

        // Disable all inputs but keep navigation buttons enabled
        document.querySelectorAll("input[type=radio]").forEach(input => {
            input.disabled = true;
        });

        // Only disable submit button, keep navigation buttons active
        submitBtn.disabled = true;

        // Highlight correct and incorrect answers on the quiz interface
        questions.forEach((question, qIndex) => {
            const qName = `q${qIndex + 1}`;
            const options = question.querySelectorAll("label");
            const userChoice = userAnswers[qName];
            const correctChoice = correctAnswers[qName];
            
            options.forEach(label => {
                const input = label.querySelector("input");
                const value = input.value;
                
                // Reset any existing styling
                label.classList.remove("correct-answer", "incorrect-answer", "user-choice");
                
                // Apply new styling based on correctness
                if (value === correctChoice) {
                    label.classList.add("correct-answer");
                }
                
                if (userChoice === value && userChoice !== correctChoice) {
                    label.classList.add("incorrect-answer");
                }
                
                if (userChoice === value) {
                    label.classList.add("user-choice");
                }
            });
        });

        // Add CSS for answer labels
        const quizStyleEl = document.createElement("style");
        quizStyleEl.textContent = `
            .correct-answer {
                background-color: rgba(0, 128, 0, 0.2) !important;
                border-left: 5px solid green !important;
                padding-left: 10px !important;
                font-weight: bold;
                position: relative;
            }
            
            .correct-answer::after {
                content: "✓ Correct Answer";
                position: absolute;
                right: 10px;
                color: green;
                font-weight: bold;
            }
            
            .incorrect-answer {
                background-color: rgba(255, 0, 0, 0.1) !important;
                border-left: 5px solid red !important;
                padding-left: 10px !important;
                text-decoration: line-through;
                color: #777;
                position: relative;
            }
            
            .incorrect-answer::after {
                content: "✗ Incorrect";
                position: absolute;
                right: 10px;
                color: red;
                font-weight: bold;
            }
            
            .user-choice {
                font-weight: bold;
            }
            
            label {
                display: block;
                margin: 10px 0;
                padding: 10px;
                border-radius: 5px;
                border: 1px solid #ddd;
                transition: all 0.3s ease;
            }
            
            /* Add some spacing between submit button and next/prev buttons */
            #submitBtn {
                margin-top: 10px;
                margin-bottom: 10px;
                display: block;
                width: 100%;
                padding: 10px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            }
            
            #submitBtn:hover {
                background-color: #45a049;
            }
        `;
        document.head.appendChild(quizStyleEl);

        // End quiz state
        quizStarted = false;
        
        // Update navigation display after submission
        showQuestion(currentQuestionIndex);
    }

    // Event listeners
    prevBtn.addEventListener("click", function () {
        if (currentQuestionIndex > 0) {
            showQuestion(currentQuestionIndex - 1);
        }
    });

    nextBtn.addEventListener("click", function () {
        if (currentQuestionIndex < questions.length - 1) {
            showQuestion(currentQuestionIndex + 1);
        }
    });

    submitBtn.addEventListener("click", function () { submitQuiz(false); });

    // Initialize the quiz and start timer immediately
    showQuestion(0);
    quizStarted = true;
    updateTimer();
});