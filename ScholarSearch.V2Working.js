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
            border-top-color: #3498db;
            -webkit-animation: spin 1s linear infinite;
            animation: spin 1s linear infinite;
        }
        @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
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
            <p class="text-lg text-gray-600 mt-2">Enter your details, and let AI find scholarships you qualify for.</p>
        </header>

        <!-- Input Form -->
        <div class="bg-white p-8 rounded-lg shadow-xl">
            <form id="scholarship-form">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Academic Level -->
                    <div>
                        <label for="academic-level" class="block text-sm font-semibold text-gray-700 mb-2">Academic Level</label>
                        <select id="academic-level" name="academic-level" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                        <label for="gpa" class="block text-sm font-semibold text-gray-700 mb-2">Current GPA</label>
                        <input type="number" id="gpa" name="gpa" min="0.0" max="5.0" step="0.1" placeholder="e.g., 3.7" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                </div>

                <!-- Major / Field of Study -->
                <div class="mt-6">
                    <label for="major" class="block text-sm font-semibold text-gray-700 mb-2">Major / Field of Study</label>
                    <input type="text" id="major" name="major" placeholder="e.g., Computer Science, Nursing, Art History" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>

                <!-- Interests / Skills / Extracurriculars -->
                <div class="mt-6">
                    <label for="interests" class="block text-sm font-semibold text-gray-700 mb-2">Interests, Skills, & Extracurriculars</label>
                    <textarea id="interests" name="interests" rows="4" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Volunteering at animal shelter, debate team captain, proficient in Python, plays violin"></textarea>
                </div>

                <!-- Demographic / Personal Info -->
                <div class="mt-6">
                    <label for="demographics" class="block text-sm font-semibold text-gray-700 mb-2">Demographic / Personal Info (Optional)</label>
                    <textarea id="demographics" name="demographics" rows="3" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., First-generation student, resident of Texas, member of [specific group], financial need"></textarea>
                </div>

                <!-- Submit Button -->
                <div class="mt-8">
                    <button type="submit" id="submit-button" class="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ease-in-out disabled:bg-gray-400">
                        Find My Scholarships
                    </button>
                </div>
            </form>
        </div>

        <!-- Results Section -->
        <div id="results-container" class="bg-white p-8 rounded-lg shadow-xl mt-10 hidden">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Matching Scholarships</h2>
            
            <!-- Loader -->
            <div id="loader" class="flex justify-center items-center h-32 hidden">
                <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
            </div>

            <!-- Error Message -->
            <div id="error-message" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6" role="alert">
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
        // NOTE: The API key is an empty string. The environment will provide it.
        const API_KEY = ""; 
        const API_MODEL = "gemini-2.5-flash-preview-09-2025";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${API_MODEL}:generateContent?key=${API_KEY}`;

        // --- Event Listener ---
        form.addEventListener('submit', handleFormSubmit);

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

            // 2. Construct the prompts and schema
            const systemPrompt = "You are a world-class scholarship research assistant. Your task is to find relevant, current, and legitimate scholarships for a student based on their profile. You MUST use the provided Google Search tool to find scholarships. Provide your findings as a JSON object.";
            
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

                Return ONLY a valid JSON object adhering to the specified schema.
            `;

            const schema = {
                type: "OBJECT",
                properties: {
                    "scholarships": {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                "name": { type: "STRING" },
                                "description": { type: "STRING" },
                                "amount": { type: "STRING" },
                                "deadline": { type: "STRING" },
                                "url": { type: "STRING" }
                            },
                            required: ["name", "description", "amount", "deadline", "url"]
                        }
                    }
                },
                required: ["scholarships"]
            };

            // 3. Call the Gemini API
            try {
                const responseData = await callGeminiApi(userPrompt, systemPrompt, schema);
                if (responseData && responseData.scholarships) {
                    displayResults(responseData.scholarships);
                } else {
                    displayError("The API returned an unexpected format. No scholarships found.");
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
         * @param {object} schema - The JSON schema for the response.
         * @returns {Promise<object>} - The parsed JSON response from the API.
         */
        async function callGeminiApi(userPrompt, systemPrompt, schema) {
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
                // 3. Add Generation Config for structured JSON output
                // REMOVED: This conflicts with the 'tools' property, causing a 400 error.
                // We will rely on the prompt instructions to get JSON output.
                /*
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: schema
                }
                */
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
                    // Try to parse as JSON for more detailed error info from Gemini
                    const errorJson = JSON.parse(errorBody);
                    if (errorJson.error && errorJson.error.message) {
                        errorBody = errorJson.error.message;
                    }
                } catch (e) {
                    // It wasn't JSON, just use the raw text
                }
                throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
            }

            const result = await response.json();
            
            // Extract the text part and parse it as JSON
            const candidate = result.candidates?.[0];
            const jsonText = candidate?.content?.parts?.[0]?.text;

            if (!jsonText) {
                if (result.promptFeedback) {
                    console.error("Prompt Feedback:", result.promptFeedback);
                    throw new Error(`Request was blocked. Reason: ${result.promptFeedback.blockReason}`);
                }
                throw new Error("Invalid API response structure. No content part found.");
            }

            // The response is now plain text, and we must parse the JSON from it.
            // The model was prompted to return *only* JSON.
            try {
                // Sometimes the model wraps the JSON in markdown
                const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/);
                if (jsonMatch && jsonMatch[1]) {
                    // Found JSON in a markdown block
                    return JSON.parse(jsonMatch[1]);
                } else {
                    // Assume the entire response is the JSON string
                    return JSON.parse(jsonText);
                }
            } catch (parseError) {
                console.error("Failed to parse JSON from API response:", jsonText, parseError);
                throw new Error(`Failed to parse the API's response. Make sure it's valid JSON.`);
            }
        }

        /**
         * Displays the scholarship results as cards.
         * @param {Array<object>} scholarships - An array of scholarship objects.
         */
        function displayResults(scholarships) {
            resultsList.innerHTML = ''; // Clear previous results

            if (scholarships.length === 0) {
                resultsList.innerHTML = `<p class="text-gray-600 text-center">No matching scholarships were found based on your profile. Try broadening your search terms.</p>`;
                return;
            }

            scholarships.forEach(scholarship => {
                const card = document.createElement('div');
                card.className = 'bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm transform transition-transform hover:scale-[1.02] hover:shadow-md';
                
                card.innerHTML = `
                    <h3 class="text-xl font-bold text-blue-700">${escapeHTML(scholarship.name)}</h3>
                    <p class="text-gray-700 mt-2">${escapeHTML(scholarship.description)}</p>
                    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <span class="text-sm font-semibold text-gray-500">Amount</span>
                            <p class="text-lg font-semibold text-gray-900">${escapeHTML(scholarship.amount) || 'N/A'}</p>
                        </div>
                        <div>
                            <span class="text-sm font-semibold text-gray-500">Deadline</span>
                            <p class="text-lg font-semibold text-gray-900">${escapeHTML(scholarship.deadline) || 'N/A'}</p>
                        </div>
                    </div>
                    <div class="mt-5">
                        <a href="${escapeHTML(scholarship.url)}" target="_blank" rel="noopener noreferrer" class="inline-block bg-green-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-green-700 transition-colors">
                            View Details &rarr;
                        </a>
                    </div>
                `;
                resultsList.appendChild(card);
            });
        }

        /**
         * Displays an error message.
         * @param {string} message - The error message to display.
         */
        function displayError(message) {
            errorText.textContent = message;
            errorMessage.classList.remove('hidden');
        }

        /**
         * Toggles the loading state of the UI.
         * @param {boolean} isLoading - Whether to show the loading state.
         */
        function setLoading(isLoading) {
            if (isLoading) {
                submitButton.disabled = true;
                submitButton.textContent = 'Searching...';
                resultsContainer.classList.remove('hidden');
                loader.classList.remove('hidden');
                errorMessage.classList.add('hidden');
                resultsList.innerHTML = '';
            } else {
                submitButton.disabled = false;
                submitButton.textContent = 'Find My Scholarships';
                loader.classList.add('hidden');
            }
        }
        
        /**
         * Escapes HTML to prevent XSS.
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
                    "'": '&#039;'
                }[m];
            });
        }
    </script>
</body>
</html>
