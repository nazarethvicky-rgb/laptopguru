// --- JARGON BUSTER DEFINITIONS (SPRINT 2) ---
const JARGON_DEFINITIONS = {
    'TGP': "Engine Ki Power (Engine Power). Higher TGP means the laptop gives more electricity to the graphics card, making games run much smoother.",
    'sRGB': "Range of Colours. This measures how many colours the screen can show. 100% sRGB means the colours are accurate, which is essential for design and video editing.",
    'H-Series': "High-Performance. Found in gaming and professional laptops. These chips are powerful and need more cooling, but they give the best speed.",
    'U-Series': "Ultra-Efficient. Found in thin, everyday laptops. These chips use very little battery, making your charge last longer, but they are not for heavy gaming.",
    'QHD': "High Resolution Screen. A much clearer, sharper picture than standard Full HD (FHD). It's great for detailed work and watching high-quality content."
};

// --- LANGUAGE VERDICTS (HINGLISH/ENGLISH) (SPRINT 2) ---
const LANGUAGE_VERDICTS = {
    'ENG': {
        'QuizTitle': "Laptop Finder Quiz",
        'ScamAlert_RED': "RED FLAG: SCAM ALERT!",
        'ScamAlert_GREEN': "GREEN LIGHT: EXCELLENT CHOICE!",
        'HighlyRecommended': "Highly Recommended",
        'Acceptable': "Acceptable",
        'NOTRecommended': "NOT Recommended",
        'BuyNow': "Buy Now"
    },
    'HING': {
        'QuizTitle': "Laptop Dhoondne Wala Quiz",
        'ScamAlert_RED': "🔴 RED FLAG: Dhokha Hai Bhai!",
        'ScamAlert_GREEN': "🟢 GREEN LIGHT: Ek Number Choice!",
        'HighlyRecommended': "Ek Number Recommendation",
        'Acceptable': "Chalta Hai",
        'NOTRecommended': "Nahi Lena Chahiye",
        'BuyNow': "Abhi Kharido"
    }
};

let currentLanguage = 'ENG'; // Default language state
let quizAnswers = {}; // Stores user selections

// --- CORE FILTERING LOGIC (SPRINT 1) ---
function runFiltering(answers) {
    const { category, budget, specifics } = answers;

    let filteredLaptops = LAPTOP_DATA.filter(laptop => laptop.Category === category);

    // Sort by price (ascending) or rating (descending) based on specifics
    if (specifics === 'Lowest Price') {
        filteredLaptops.sort((a, b) => a.Price - b.Price);
    } else if (specifics === 'Highest Graphics') {
        filteredLaptops.sort((a, b) => b.Rating - a.Rating);
    }

    // Apply budget filter (simplified for simulation)
    const maxBudget = budget === 'High' ? 150000 : 70000;
    filteredLaptops = filteredLaptops.filter(laptop => laptop.Price <= maxBudget);
    
    // Return the top 3 best matching results
    return filteredLaptops.slice(0, 3);
}

// --- SCAM DETECTOR LOGIC (SPRINT 2) ---
function getScamDetectorVerdict(laptop) {
    const rating = laptop.Rating;
    let color, status;

    if (rating >= 9) {
        color = 'GREEN';
        status = LANGUAGE_VERDICTS[currentLanguage].ScamAlert_GREEN;
    } else if (rating >= 7) {
        color = 'YELLOW';
        status = '🟡 ' + (currentLanguage === 'ENG' ? 'YELLOW ALERT: ACCEPTABLE' : 'YELLOW ALERT: Chalta Hai');
    } else {
        color = 'RED';
        status = LANGUAGE_VERDICTS[currentLanguage].ScamAlert_RED;
    }

    return { color, status, recommendation: laptop.Recommendation };
}

// --- COMMERCIAL TRACKING LOGIC (SPRINT 2) ---
function trackAffiliateClick(laptop) {
    const timestamp = new Date().toISOString();
    // In a real app, SESSION_ID would be generated and stored when the user opens the app
    const SESSION_ID = 'SIMULATED_A1B2C3'; 
    
    const logEntry = {
        Timestamp: timestamp,
        Model_ID: laptop.Model_ID,
        Action: 'Affiliate_Click',
        Category: laptop.Category,
        Price: laptop.Price,
        Quiz_Answers: quizAnswers,
        Session_ID: SESSION_ID
    };

    console.log("--- ADVANCED TRACKING LOG ---");
    console.log(JSON.stringify(logEntry, null, 2));
    console.log("-----------------------------");

    alert("Navigating to Amazon! Tracking click for analytics.");

    // Opens the link in a new tab (Simulated)
    window.open(laptop['Purchase link'], '_blank');
}

// --- UI/DISPLAY FUNCTIONS (Simulated Output) ---
function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    
    // Update main title with current language
    document.getElementById('main-title').textContent = LANGUAGE_VERDICTS[currentLanguage].QuizTitle;

    results.forEach(laptop => {
        const verdict = getScamDetectorVerdict(laptop);
        
        // Simplified HTML rendering for simulation
        const html = `
            <div class="laptop-card laptop-card-${verdict.color.toLowerCase()}">
                <h3 class="model-id">${laptop.Model_ID}</h3>
                <div class="scam-alert-banner">${verdict.status}</div>
                <p><strong>Verdict:</strong> ${laptop.Recommendation} (${laptop.Rating}/10)</p>
                
                <p><strong>CPU:</strong> ${laptop.CPU_Model} 
                    <span class="jargon" title="${JARGON_DEFINITIONS['H-Series']}">i</span> 
                </p>
                <p><strong>GPU Power (TGP):</strong> ${laptop.TGP_W}W 
                    <span class="jargon" title="${JARGON_DEFINITIONS['TGP']}">i</span>
                </p>
                <p><strong>Screen:</strong> ${laptop.Screen_Specs}
                    <span class="jargon" title="${JARGON_DEFINITIONS['sRGB']}">i</span>
                </p>

                <button class="buy-now-btn" onclick="trackAffiliateClick(${JSON.stringify(laptop).replace(/"/g, '&quot;')})">
                    ${LANGUAGE_VERDICTS[currentLanguage].BuyNow}
                </button>
            </div>
        `;
        resultsContainer.innerHTML += html;
    });
}

// --- INITIALIZATION AND EVENT LISTENERS ---
function init() {
    // Simulated quiz submission
    document.getElementById('submit-quiz').addEventListener('click', () => {
        // Simulate user input for our Golden Path test
        quizAnswers = {
            category: 'Performance',
            budget: 'High',
            specifics: 'Highest Graphics' 
        };
        const results = runFiltering(quizAnswers);
        displayResults(results);
        document.getElementById('quiz-view').style.display = 'none';
        document.getElementById('results-view').style.display = 'block';
    });

    // Language Toggle Listener
    document.getElementById('lang-toggle-eng').addEventListener('click', () => {
        currentLanguage = 'ENG';
        // Re-display results to apply new language
        const results = runFiltering(quizAnswers);
        displayResults(results);
    });
    
    document.getElementById('lang-toggle-hing').addEventListener('click', () => {
        currentLanguage = 'HING';
        // Re-display results to apply new language
        const results = runFiltering(quizAnswers);
        displayResults(results);
    });
}

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', init);
