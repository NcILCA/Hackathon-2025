<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ScholarSearch</title>
    <!-- Load Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom styles for the loader */
        .loader {
            border: 8px solid #f3f3f3; /* Light grey */
            border-top: 8px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body class="bg-gray-100 font-sans antialiased">

    <!-- Main Content Container -->
    <div class="container mx-auto max-w-3xl p-6 md:p-10">
        
        <!-- Header -->
        <header class="mb-8 text-center">
            <h1 class="text-4xl font-bold text-gray-800">AI Scholarship Matcher</h1>
            <p class="text-lg text-gray-600 mt-2">Enter your details, and let AI find scholarships you qualify for using up-to-date web search.</p>
        </header>

        <!-- Input Form -->
        <div class="bg-white p-8 rounded-xl shadow-2xl">
            <form id="scholarship-form">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Academic Level -->
                    <div>
                        <label for="academic-level" class="block text-sm font-semibold text-gray-700 mb-2">Academic Level</label>
                        <select id="academic-level" name="academic-level" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow">
                            <option value="High School Senior">High School Senior</option>
                            <option value="Undergraduate (Freshman)">Undergraduate (Freshman)</option>
                            <option value="Undergraduate (Sophomore)">Undergraduate (Sophomore)</option>
                            <option value="Undergraduate (Junior)">Undergraduate (Junior)</option>
                            <option value="Undergraduate (Senior)">Undergraduate (Senior)</option>
                            <option value="Graduate Student">Graduate Student</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <!-- GPA -->
                    <div>
                        <label for="gpa" class="block text-sm font-semibold text-gray-700 mb-2">Current GPA (e.g., 3.7)</label>
                        <input type="number" id="gpa" name="gpa" min="0.0" max="5.0" step="0.1" placeholder="e.g., 3.7" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" required>
                    </div>
                </div>

                <!-- Major / Field of Study -->
                <div class="mt-6">
                    <label for="major" class="block text-sm font-semibold text-gray-700 mb-2">Major / Field of Study</label>
                    <input type="text" id="major" name="major" placeholder="e.g., Civil Engineering, Nursing, Art History" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" required>
                </div>

                <!-- Interests / Skills / Extracurriculars -->
                <div class="mt-6">
                    <label for="interests" class="block text-sm font-semibold text-gray-700 mb-2">Key Interests, Skills, & Extracurriculars</label>
                    <textarea id="interests" name="interests" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="e.g., Volunteering at animal shelter, debate team captain, proficient in Python, plays violin"></textarea>
                </div>

                <!-- Demographic / Personal Info -->
                <div class="mt-6">
                    <label for="demographics" class="block text-sm font-semibold text-gray-700 mb-2">Demographic / Personal Info (Optional)</label>
                    <textarea id="demographics" name="demographics" rows="2" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" placeholder="e.g., First-generation student, resident of Texas, member of specific group, financial need"></textarea>
                </div>

                <!-- Submit Button -->
                <div class="mt-8">
                    <button type="submit" id="submit-button" class="w-full bg-blue-600 text-white font-extrabold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Find My Scholarships
                    </button>
                </div>
            </form>
        </div>

        <!-- Results Section -->
        <div id="results-container" class="bg-white p-8 rounded-xl shadow-2xl mt-10 hidden">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Matching Scholarships</h2>
            
            <!-- Loader -->
            <div id="loader" class="flex justify-center items-center h-32 hidden">
                <div class="loader"></div>
            </div>

            <!-- Error Message -->
            <div id="error-message" class="hidden bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6" role="alert">
                <strong class="font-bold">Error:</strong>
                <span class="block sm:inline" id="error-text"></span>
            </div>

            <!-- Results List -->
            <div id="results-list" class="space-y-6">
                <!-- Scholarship cards will be injected here by JavaScript -->
            </div>
        </div>

    </div>

    <!-- JavaScript Logic -->
    <script type="module">
        // --- DOM Elements ---
        const form = document.getElementById('scholarship-form');
        const submitButton = document.getElementById('submit-button');
        const resultsContainer = document.getElementById('results-container');
        const loader = document.getElementById('loader');
        const errorMessage = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');
        const resultsList = document.getElementById('results-list');

        // --- Gemini API Configuration ---
        const API_KEY = ""; 
        const API_MODEL = "gemini-2.5-flash-preview-09-2025";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${API_MODEL}:generateContent?key=${API_KEY}`;

        // --- Event Listener ---
        form.addEventListener('submit', handleFormSubmit);

        /**
         * Clears previous results and sets the loading state of the application.
         * @param {boolean} isLoading - Whether the application is currently loading.
         */
        function setLoading(isLoading) {
            // Ensure results container is visible when starting a search
            resultsContainer.classList.remove('hidden');

            if (isLoading) {
                // 1. ERASE PAST SEARCH RESULTS (Addressing user request)
                resultsList.innerHTML = '';
                errorMessage.classList.add('hidden');
                
                // 2. Show loader and disable button
                loader.classList.remove('hidden');
                submitButton.disabled = true;
                submitButton.textContent = 'Searching...';
            } else {
                // Hide loader and enable button
                loader.classList.add('hidden');
                submitButton.disabled = false;
                submitButton.textContent = 'Find My Scholarships';
            }
        }
        
        /**
         * Displays an error message.
         * @param {string} message - The error message to display.
         */
        function displayError(message) {
            errorText.textContent = message;
            errorMessage.classList.remove('hidden');
            resultsList.innerHTML = ''; // Ensure list is clear if an error occurred
        }

        /**
         * Fetches a resource with exponential backoff retry logic.
         * @param {string} url - The URL to fetch.
         * @param {object} options - The fetch options (method, headers, body, etc.).
         * @returns {Promise<Response>} - The successful response object.
         */
        async function fetchWithBackoff(url, options) {
            const MAX_RETRIES = 5;
            let delay = 1000; // 1 second

            for (let i = 0; i < MAX_RETRIES; i++) {
                try {
                    const response = await fetch(url, options);
                    if (response.status !== 429 && response.status < 500) {
                        // Success or non-retryable error (e.g., 400s)
                        return response;
                    }
                    // Handle 429 (Rate Limit) or 5xx (Server Errors)
                    // Continue to the catch block to initiate delay
                    throw new Error(`Retryable status code: ${response.status}`);
                } catch (error) {
                    if (i === MAX_RETRIES - 1) {
                        // Throw the error if max retries reached
                        throw error;
                    }
                    // Wait with exponential backoff
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2; // Double the delay for the next attempt
                }
            }
        }


        /**
         * Handles the form submission event.
         * @param {Event} event - The form submission event.
         */
        async function handleFormSubmit(event) {
            event.preventDefault();
            setLoading(true);

            // 1. Collect form data
            const formData = new FormData(form);
            const userProfile = {
                level: formData.get('academic-level'),
                gpa: formData.get('gpa'),
                major: formData.get('major'),
                interests: formData.get('interests'),
                demographics: formData.get('demographics')
            };

            // 2. Construct the prompts
            const systemPrompt = "You are a world-class scholarship research assistant. Your task is to find relevant, current, and legitimate scholarships for a student based on their profile. You MUST use the provided Google Search tool to find scholarships. Provide your findings as a JSON object with a single root key 'scholarships' that holds an array of scholarship objects. Do not include any text, headers, or explanations outside the JSON block.";
            
            const userPrompt = `
                Here is the student's profile:
                - Academic Level: ${userProfile.level}
                - GPA: ${userProfile.gpa}
                - Major/Field of Study: ${userProfile.major}
                - Interests/Skills/Extracurriculars: ${userProfile.interests || 'N/A'}
                - Demographic/Personal Info: ${userProfile.demographics || 'N/A'}

                Please find up to 7 scholarships that are a strong match for this profile. 
                For each scholarship, provide:
                1.  "name": The official name of the scholarship.
                2.  "description": A brief one-sentence description of what it is and who it's for.
                3.  "amount": The award amount (e.g., "$1,000", "Varies", "Up to $5,000").
                4.  "deadline": The application deadline (e.g., "October 31, 2025", "Varies").
                5.  "url": The direct URL to the scholarship information or application page.

                Return ONLY a valid JSON object adhering to the specified format.
            `;

            // 3. Call the Gemini API
            try {
                const responseData = await callGeminiApi(userPrompt, systemPrompt);
                if (responseData && responseData.scholarships) {
                    displayResults(responseData.scholarships);
                } else {
                    displayError("The AI returned an unexpected format. Please try again.");
                }
            } catch (error) {
                console.error("Error calling Gemini API:", error);
                displayError(`An error occurred while fetching scholarships: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        /**
         * Calls the Gemini API with exponential backoff.
         * @param {string} userPrompt - The user's query.
         * @param {string} systemPrompt - The system instruction.
         * @returns {Promise<object>} - The parsed JSON response from the API.
         */
        async function callGeminiApi(userPrompt, systemPrompt) {
            const payload = {
                contents: [{ 
                    parts: [{ text: userPrompt }] 
                }],
                // 1. Add Google Search tool for real-time research
                tools: [{ 
                    "google_search": {} 
                }],
                // 2. Add System Instruction for role-setting
                systemInstruction: {
                    parts: [{ text: systemPrompt }]
                },
            };
            
            const response = await fetchWithBackoff(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                let errorBody = await response.text();
                try {
                    const errorJson = JSON.parse(errorBody);
                    if (errorJson.error && errorJson.error.message) {
                        errorBody = errorJson.error.message;
                    }
                } catch (e) {} // Ignore parse error if body isn't JSON
                throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
            }

            const result = await response.json();
            
            const candidate = result.candidates?.[0];
            const jsonText = candidate?.content?.parts?.[0]?.text;

            if (!jsonText) {
                if (result.promptFeedback) {
                    console.error("Prompt Feedback:", result.promptFeedback);
                    throw new Error(`Request was blocked. Reason: ${result.promptFeedback.blockReason}`);
                }
                throw new Error("Invalid API response structure. No text content part found.");
            }

            // --- REVISED AND IMPROVED JSON PARSING LOGIC ---
            try {
                let cleanJsonText = jsonText.trim();

                // 1. Aggressively strip markdown code block wrappers (```json, ```, etc.)
                cleanJsonText = cleanJsonText
                    .replace(/```json\s*/gs, '') 
                    .replace(/```/gs, '')
                    .trim();

                let finalJsonString = cleanJsonText;
                
                // 2. Find the start and end of the outermost JSON structure ({...} or [...])
                const firstIndex = finalJsonString.search(/[\{\[]/);
                
                if (firstIndex !== -1) {
                    const startChar = finalJsonString[firstIndex];
                    const endChar = (startChar === '{') ? '}' : ']';
                    const lastIndex = finalJsonString.lastIndexOf(endChar);

                    if (lastIndex > firstIndex) {
                        // Extract only the content from the first brace/bracket to the last
                        finalJsonString = finalJsonString.substring(firstIndex, lastIndex + 1);
                    } else {
                        throw new Error("Cannot find matching closing brace/bracket.");
                    }
                } else {
                    throw new Error("No starting JSON character ({ or [) found.");
                }

                // 3. Attempt to parse the cleaned text
                let parsedResult = JSON.parse(finalJsonString);
                
                // 4. Normalize the result: ensure it is an object with a 'scholarships' key
                if (Array.isArray(parsedResult)) {
                    // Model returned a bare array (like in your error log), wrap it
                    return { scholarships: parsedResult };
                } else if (typeof parsedResult === 'object' && parsedResult !== null && parsedResult.scholarships) {
                    // Model returned the full object, as expected
                    return parsedResult;
                } else {
                    throw new Error("Parsed content was neither a JSON array nor an object containing a 'scholarships' key.");
                }
                
            } catch (parseError) {
                // If parsing fails, throw a specific error with the raw text in the console
                console.error("Failed to parse JSON from raw API response. Raw Text:", jsonText, parseError);
                throw new Error(`The model response could not be parsed as JSON. Syntax Error: ${parseError.message}.`);
            }
            // --- END REVISED JSON PARSING LOGIC ---
        }

        /**
         * Simple utility to escape HTML characters in dynamic text.
         * @param {string} str - The string to escape.
         * @returns {string} - The escaped string.
         */
        function escapeHTML(str) {
            if (typeof str !== 'string') return '';
            return str.replace(/[&<>"']/g, function(m) {
                return {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                }[m];
            });
        }

        /**
         * Displays the scholarship results as cards.
         * @param {Array<object>} scholarships - An array of scholarship objects.
         */
        function displayResults(scholarships) {
            resultsList.innerHTML = ''; // Clear previous results

            if (scholarships.length === 0) {
                resultsList.innerHTML = `<p class="text-gray-600 text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200">No matching scholarships were found based on your profile. Try broadening your search terms.</p>`;
                return;
            }

            scholarships.forEach(scholarship => {
                const card = document.createElement('div');
                card.className = 'bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:border-blue-300';
                
                card.innerHTML = `
                    <h3 class="text-xl font-bold text-blue-700">${escapeHTML(scholarship.name)}</h3>
                    <p class="text-gray-700 mt-2">${escapeHTML(scholarship.description)}</p>
                    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
                        <div>
                            <span class="text-xs font-semibold uppercase text-gray-500">Amount</span>
                            <p class="text-lg font-bold text-green-700">${escapeHTML(scholarship.amount) || 'N/A'}</p>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase text-gray-500">Deadline</span>
                            <p class="text-lg font-bold text-red-600">${escapeHTML(scholarship.deadline) || 'N/A'}</p>
                        </div>
                    </div>
                    <div class="mt-5">
                        <a href="${escapeHTML(scholarship.url)}" target="_blank" rel="noopener noreferrer" class="inline-block bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-colors transform hover:-translate-y-0.5">
                            View Details &rarr;
                        </a>
                    </div>
                `;
                resultsList.appendChild(card);
            });
        }
    </script>
</body>
</html>
