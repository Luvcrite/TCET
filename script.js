// Grammar Checker Implementation
document.getElementById("checkGrammar").addEventListener("click", async () => {
    const text = document.getElementById("grammarInput").value;

    // LanguageTool API URL
    const url = 'https://api.languagetool.org/v2/check';

    // API Request
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            language: 'en-GB', // Use UK English
            text: text
        })
    });

    const result = await response.json();

    // Get the results div
    const resultsDiv = document.getElementById("grammarResults");
    resultsDiv.innerHTML = ''; // Clear previous results

    // Check if there are any matches (mistakes)
    if (result.matches.length === 0) {
        // If no mistakes, show "No mistakes found"
        resultsDiv.innerHTML = '<p style="color: green; font-weight: bold;">No mistakes found!</p>';
    } else {
        // Display the mistakes with numbering
        result.matches.forEach((match, index) => {
            const error = document.createElement("div");
            error.innerHTML = `
                <p><strong>Error ${index + 1}:</strong> ${match.message}</p>
                <p><strong>Suggestions:</strong> ${match.replacements.map(r => r.value).join(', ')}</p>
            `;
            resultsDiv.appendChild(error);
        });
    }
});

// Evaluation Tool Implementation
document.getElementById("evaluationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const userRequest = document.getElementById("userRequest").value.split('.').filter(Boolean);
    const responseA = document.getElementById("responseA").value.split('.').filter(Boolean);
    const responseB = document.getElementById("responseB").value.split('.').filter(Boolean);

    let maxLength = Math.max(userRequest.length, responseA.length, responseB.length);
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>User Request</th>
                    <th>Response A</th>
                    <th>Response B</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < maxLength; i++) {
        tableHTML += `
            <tr>
                <td>${userRequest[i] || ''}</td>
                <td>${responseA[i] || ''}</td>
                <td>${responseB[i] || ''}</td>
            </tr>
        `;
    }

    tableHTML += `
            </tbody>
        </table>
    `;

    document.getElementById("evaluationResults").innerHTML = tableHTML;
});

// Switch between Grammar Checker and Evaluation Tool
document.getElementById("grammarButton").addEventListener("click", () => {
    document.getElementById("grammarSection").style.display = "block";
    document.getElementById("evaluationSection").style.display = "none";
});

document.getElementById("evaluationButton").addEventListener("click", () => {
    document.getElementById("grammarSection").style.display = "none";
    document.getElementById("evaluationSection").style.display = "block";
});
