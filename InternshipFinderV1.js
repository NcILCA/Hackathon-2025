<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Internship Matcher - Pro Edition</title>
    <!-- Load Tailwind CSS for modern styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom styles for the loader */
        .loader {
            border: 8px solid #E5E7EB; /* Gray 200 */
            border-top: 8px solid #4F46E5; /* Indigo 600 for the spinner */
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        /* Enhanced button styling for better engagement */
        .submit-btn {
            background-size: 200% auto;
            transition: all 0.4s ease-in-out;
        }
        .submit-btn:hover {
            background-position: right center; /* change the direction of the change on hover */
        }
        /* Card hover effect */
        .result-card {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
            transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        }
        .result-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
        }
    </style>
</head>
<body class="bg-gray-100 font-sans antialiased min-h-screen text-gray-800">

    <!-- Main Content Container -->
    <div class="container mx-auto max-w-3xl p-6 md:p-10">
        
        <!-- Header with Logo and Vibrant Title -->
        <header class="mb-12 text-center">
            <div class="flex flex-col items-center justify-center">
                <!-- SVG Logo: Rocket Launch (Career Launch) -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-16 h-16 text-indigo-600 mb-3 animate-bounce">
                    <path d="M5.47 5.72a.75.75 0 0 0 0 1.06l7.849 7.848.777-.777a.75.75 0 0 0-1.06-1.06l-7.85 7.85A.75.75 0 0 0 6.94 19.5h10.31a.75.75 0 0 0 .528-1.28L8.747 6.497l.776-.776a.75.75 0 0 0 1.06 0l7.85 7.85A.75.75 0 0 0 19.5 13.5v-7.69a.75.75 0 0 0-1.28-.528L5.72 5.47a.75.75 0 0 0-.25-.25Z" />
                </svg>
                <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-sky-500 tracking-tighter">InternMatch Pro</h1>
                <p class="text-xl text-gray-600 mt-2 font-medium">Verified, company-direct internship listings for your career launch.</p>
            </div>
        </header>

        <!-- Input Form -->
        <div class="bg-white p-8 rounded-2xl shadow-2xl shadow-indigo-200/50">
            <form id="internship-form">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Academic Level -->
                    <div>
                        <label for="academic-level" class="block text-sm font-semibold text-gray-700 mb-2">Academic Level</label>
                        <select id="academic-level" name="academic-level" class="w-full p-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200">
                            <option value="High School Senior">High School Senior</option>
                            <option value="Undergraduate (Freshman)">Undergraduate (Freshman)</option>
                            <option value="Undergraduate (Sophomore)">Undergraduate (Sophomore)</option>
                            <option value="Undergraduate (Junior)">Undergraduate (Junior)</option>
                            <option value="Undergraduate (Senior)">Undergraduate (Senior)</option>
                            <option value="Graduate Student">Graduate Student</option>
                            <option value="Recent Graduate">Recent Graduate</option>
                        </select>
                    </div>

                    <!-- GPA -->
                    <div>
                        <label for="gpa" class="block text-sm font-semibold text-gray-700 mb-2">Current GPA (e.g., 3.7)</label>
                        <input type="number" id="gpa" name="gpa" min="0.0" max="5.0" step="0.1" placeholder="e.g., 3.7" class="w-full p-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200" required>
                    </div>
                </div>

                <!-- Major / Field of Study -->
                <div class="mt-6">
                    <label for="major" class="block text-sm font-semibold text-gray-700 mb-2">Target Internship Field / Role</label>
                    <input type="text" id="major" name="major" placeholder="e.g., Software Engineering, Marketing, Financial Analyst" class="w-full p-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200" required>
                </div>

                <!-- Interests / Skills / Extracurriculars -->
                <div class="mt-6">
                    <label for="interests" class="block text-sm font-semibold text-gray-700 mb-2">Key Skills, Projects, & Experience</label>
                    <textarea id="interests" name="interests" rows="3" class="w-full p-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200" placeholder="e.g., Proficient in Python/React, built e-commerce site, leadership role in university club"></textarea>
                </div>

                <!-- Desired Location / Type -->
                <div class="mt-6">
                    <label for="demographics" class="block text-sm font-semibold text-gray-700 mb-2">Desired Location / Internship Type (Optional)</label>
                    <textarea id="demographics" name="demographics" rows="2" class="w-full p-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200" placeholder="e.g., Remote only, Summer 2025, Bay Area, specific company types"></textarea>
                </div>

                <!-- Submit Button -->
                <div class="mt-8">
                    <button type="submit" id="submit-button" class="submit-btn w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 text-white font-extrabold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl hover:from-indigo-700 hover:to-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.01]">
                        Find My Internships
                    </button>
                </div>
            </form>
        </div>

        <!-- Results Section -->
        <div id="results-container" class="bg-white p-8 rounded-2xl shadow-2xl shadow-indigo-200/50 mt-12 hidden">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 border-b border-indigo-200 pb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 text-indigo-500 mr-2">
                    <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 1.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 .75-.75h2Zm5 0a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1-.75-.75v-8.5a.75.75 0 0 1 .75-.75h2Zm5 0a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 .75-.75h2Z" clip-rule="evenodd" />
                </svg>
                Verified Listings
            </h2>
            
            <!-- Loader -->
            <div id="loader" class="flex justify-center items-center h-32 hidden">
                <div class="loader"></div>
            </div>

            <!-- Error Message -->
            <div id="error-message" class="hidden bg-red-50 border border-red-300 text-red-700 p-4 rounded-xl mb-6 shadow-sm" role="alert">
                <strong class="font-bold">Search Error:</strong>
                <span class="block sm:inline" id="error-text"></span>
            </div>

            <!-- Results List -->
            <div id="results-list" class="space-y-6">
                <!-- Internship cards will be injected here by JavaScript -->
            </div>
        </div>

    </div>

    <!-- JavaScript Logic -->
    <script type="module">
        // --- DOM Elements ---
        const form = document.getElementById('internship-form');
        const submitButton = document.getElementById('submit-button');
        const resultsContainer = document.getElementById('results-container');
        const loader = document.getElementById('loader');
        const errorMessage = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');
        const resultsList = document.getElementById('results-list');

        // --- Gemini API Configuration ---
        const API_KEY = ""; 
        const API_MODEL = "gemini-2.5-flash-preview-09-2025";
        
        // API URL for the model
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${API_MODEL}:generateContent`;

        // --- Event Listener ---
        form.addEventListener('submit', handleFormSubmit);

        // --- Link Validation Utility ---
        
        /**
         * Checks if a URL is likely an aggregator (third-party job board)
         * to prevent serving unvalidated or indirect links.
         * @param {string} url - The URL to check.
         * @returns {boolean} - True if the URL is from a blocked aggregator domain.
         */
        function isAggregator(url) {
            if (typeof url !== 'string' || !url) return true;
            try {
                const urlObject = new URL(url);
                const hostname = urlObject.hostname.toLowerCase();
                
                // Common aggregators to block (case-insensitive)
                const blockedDomains = [
                    'indeed.com', 'linkedin.com', 'glassdoor.com', 'handshake.com', 
                    'monster.com', 'ziprecruiter.com', 'simplyhired.com', 'careerbuilder.com',
                ];
                
                // Check if the hostname or path contains any of the blocked domain names
                return blockedDomains.some(domain => hostname.includes(domain));
            } catch (e) {
                // If the URL is not a valid URL structure, treat it as invalid
                return true; 
            }
        }


        /**
         * Clears previous results and sets the loading state of the application.
         * @param {boolean} isLoading - Whether the application is currently loading.
         */
        function setLoading(isLoading) {
            resultsContainer.classList.remove('hidden');

            if (isLoading) {
                // ERASE PAST SEARCH RESULTS
                resultsList.innerHTML = '';
                errorMessage.classList.add('hidden');
                
                loader.classList.remove('hidden');
                submitButton.disabled = true;
                submitButton.textContent = 'Searching...';
                
            } else {
                // Hide all loaders and enable button
                loader.classList.add('hidden');
                submitButton.disabled = false;
                submitButton.textContent = 'Find My Internships';
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
                        return response;
                    }
                    throw new Error(`Retryable status code: ${response.status}`);
                } catch (error) {
                    if (i === MAX_RETRIES - 1) {
                        throw error;
                    }
                    // Wait for an increasing delay before retrying
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2; 
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
            const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            // CRITICAL UPDATE: System Prompt - STRONGLY EMPHASIZED Link Validation/Freshness
            const systemPrompt = "You are an expert internship researcher. Your task is to find a minimum of 5, currently open, legitimate internships. You are strictly forbidden from hallucinating any data. CRITICAL: The search results often contain expired or broken links (404 errors or refusal to connect). You MUST perform multiple search iterations to ensure the link (URL property) is HIGHLY likely to be working, currently active, and leads DIRECTLY to the official, primary company or organizational job board job *listing*. ABSOLUTELY AVOID ALL third-party job aggregators (like Indeed, LinkedIn, Handshake, Glassdoor, etc.). If a link is questionable or results in a redirect, discard it. The URL MUST be to an **active, direct company career page listing**. If the search tool does not yield a direct company link to an active application, you must skip that result. You MUST use the provided Google Search tool. Return ONLY a JSON array, with no other text.";
            
            // User Prompt for Internships
            const userPrompt = `
                Here is the student's profile:
                - Academic Level: ${userProfile.level}
                - GPA: ${userProfile.gpa}
                - Target Internship Field/Role: ${userProfile.major}
                - Key Skills/Experience: ${userProfile.interests || 'N/A'}
                - Desired Location/Type: ${userProfile.demographics || 'N/A'}

                Please find up to 10 internships that are a strong match for this profile. Use multiple search queries and take your time to ensure all 10 results are found if possible. Never make up or hallucinate internship data.
                
                CRITICAL REQUIREMENT: The internship MUST be currently accepting applications (deadline must be 'Rolling' or after ${currentDate}). The 'url' property MUST link directly to the official company's job posting page. DO NOT use links to job aggregators like Indeed or LinkedIn.
                
                For the internships, provide:
                1.  "title": The official title of the internship (e.g., "Software Engineer Intern").
                2.  "company": The company offering the internship.
                3.  "description": A brief one-sentence description of the role and what it involves.
                4.  "location": The location (e.g., "Remote", "New York, NY").
                5.  "duration": The typical duration or period (e.g., "Summer 2025 (12 Weeks)", "Ongoing").
                6.  "deadline": The application deadline (e.g., "October 31, 2025", "Rolling").
                7.  "url": The direct URL to the company's job listing or application page.

                Return ONLY a valid JSON array of internship objects with the above properties. Do not include any text, headers, or explanations outside the JSON array block.
            `;

            // 3. Call the Gemini API
            try {
                const responseData = await callGeminiApi(userPrompt, systemPrompt);
                
                if (responseData && Array.isArray(responseData)) {
                    displayResults({
                        internships: responseData,
                    });
                } else {
                    displayError("The AI returned an unexpected format. Please try again.");
                }
            } catch (error) {
                console.error("Error calling Gemini API:", error);
                displayError(`An error occurred while fetching internships: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        /**
         * Calls the Gemini API with exponential backoff.
         */
        async function callGeminiApi(userPrompt, systemPrompt) {
            const payload = {
                contents: [{ 
                    parts: [{ text: userPrompt }] 
                }],
                tools: [{ 
                    "google_search": {} 
                }],
                systemInstruction: {
                    parts: [{ text: systemPrompt }]
                },
            };
            
            const response = await fetchWithBackoff(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                let errorBody = await response.text();
                try {
                    const errorJson = JSON.parse(errorBody);
                    if (errorJson.error && errorJson.error.message) {
                        errorBody = errorJson.error.message;
                    }
                } catch (e) {} 
                
                // Explicit check for authentication errors (401/403)
                if (response.status === 401 || response.status === 403) {
                    throw new Error(`API request failed with status ${response.status} (Authentication/Permission Denied). Please ensure the API key is valid.`);
                }
                
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

            // --- Robust JSON PARSING LOGIC ---
            try {
                let cleanJsonText = jsonText.trim();
                cleanJsonText = cleanJsonText
                    .replace(/```json\s*/gs, '') 
                    .replace(/```/gs, '')
                    .trim();

                let finalJsonString = cleanJsonText;
                
                const firstIndex = finalJsonString.search(/[\{\[]/);
                
                if (firstIndex !== -1) {
                    const startChar = finalJsonString[firstIndex];
                    const endChar = (startChar === '{') ? '}' : ']';
                    const lastIndex = finalJsonString.lastIndexOf(endChar);

                    if (lastIndex > firstIndex) {
                        finalJsonString = finalJsonString.substring(firstIndex, lastIndex + 1);
                    } else {
                        throw new Error("Cannot find matching closing brace/bracket.");
                    }
                } else {
                    throw new Error("No starting JSON character ({ or [) found.");
                }

                let parsedResult = JSON.parse(finalJsonString);
                
                // Expect an array of internships
                if (Array.isArray(parsedResult)) {
                    return parsedResult;
                } else if (typeof parsedResult === 'object' && parsedResult !== null && parsedResult.internships) {
                    // Handling potential root object structure if model deviates
                    return parsedResult.internships;
                }
                
                throw new Error("Parsed content did not match expected structure (JSON array of internships).");
                
            } catch (parseError) {
                console.error("Failed to parse JSON from raw API response. Raw Text:", jsonText, parseError);
                throw new Error(`The model response could not be parsed as JSON. Syntax Error: ${parseError.message}.`);
            }
            // --- END JSON PARSING LOGIC ---
        }

        /**
         * Simple utility to escape HTML characters in dynamic text.
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
         * Displays the internship results as cards, filtering for unique and valid URLs.
         * @param {object} resultsObject - Object containing 'internships' array.
         */
        function displayResults(resultsObject) {
            resultsList.innerHTML = ''; // Clear previous results

            const rawInternships = resultsObject.internships || [];
            
            // 1. Filter out duplicates and invalid/aggregator links
            const seenUrls = new Set();
            const uniqueInternships = rawInternships.filter(internship => {
                const url = internship.url;

                // CRITICAL VALIDATION CHECK: Must be a string, start with http/https, and not be an aggregator.
                if (typeof url !== 'string' || (!url.startsWith('http://') && !url.startsWith('https://')) || isAggregator(url)) {
                    console.warn("Filtered out invalid or aggregator URL:", url);
                    return false; 
                }
                
                // Uniqueness check
                if (seenUrls.has(url.toLowerCase())) {
                    console.log("Skipping duplicate URL:", url);
                    return false; 
                }

                seenUrls.add(url.toLowerCase());
                return true; 
            });
            
            const internships = uniqueInternships;

            // --- Display Internship Cards ---
            if (internships.length === 0) {
                resultsList.innerHTML += `<p class="text-gray-600 text-center p-6 rounded-xl bg-indigo-50 border-2 border-indigo-200">
                    <strong class="font-bold text-indigo-800">No Listings Found.</strong> 
                    We couldn't find any *currently open*, company-direct job postings that matched your criteria. Try broadening your search terms or checking back soon.
                    </p>`;
                return;
            }

            internships.forEach(internship => {
                const cardClasses = 'result-card rounded-xl p-6 transition-all duration-300 bg-white border border-gray-200 shadow-lg border-l-4 border-l-indigo-500';
                
                const buttonClasses = 'inline-block bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-700 transition-colors transform hover:shadow-xl';

                const icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 inline mr-2 text-indigo-500">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.204a.75.75 0 0 1-.51.721A15.424 15.424 0 0 1 9 18a15.424 15.424 0 0 1-10.74-2.924.75.75 0 0 1-.51-.721V14.15" />
                         <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a1.5 1.5 0 0 0 1.5-1.5V6.444l-.75-.75-.75.75V19.5A1.5 1.5 0 0 0 12 21Z" />
                         <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 3h-13.5A.75.75 0 0 0 4.5 3.75v16.5A.75.75 0 0 0 5.25 21h13.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 18.75 3Z" />
                       </svg>`;

                const card = document.createElement('div');
                card.className = cardClasses;
                
                card.innerHTML = `
                    <h3 class="text-xl font-bold text-gray-900 flex items-center mb-1">${icon}${escapeHTML(internship.title)}</h3>
                    <p class="text-sm font-semibold text-gray-500 mb-3">${escapeHTML(internship.company) || 'Confidential'}</p>
                    <p class="text-gray-600 text-base">${escapeHTML(internship.description)}</p>
                    <div class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                        <div>
                            <span class="text-xs font-medium uppercase text-gray-400">Location</span>
                            <p class="text-lg font-bold text-gray-800 mt-0.5">${escapeHTML(internship.location) || 'N/A'}</p>
                        </div>
                        <div>
                            <span class="text-xs font-medium uppercase text-gray-400">Duration</span>
                            <p class="text-lg font-bold text-gray-800 mt-0.5">${escapeHTML(internship.duration) || 'Varies'}</p>
                        </div>
                         <div>
                            <span class="text-xs font-medium uppercase text-gray-400">Deadline</span>
                            <p class="text-lg font-bold text-red-600 mt-0.5">${escapeHTML(internship.deadline) || 'Rolling'}</p>
                        </div>
                    </div>
                    <div class="mt-6 text-right">
                        <a href="${escapeHTML(internship.url)}" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="${buttonClasses}">
                            View & Apply &rarr;
                        </a>
                    </div>
                `;
                resultsList.appendChild(card);
            });
        }
    </script>
</body>
</html>
