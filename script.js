document.getElementById("textForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Split the text into sentences
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

    // Helper function to highlight differences
    function highlightDifferences(text1, text2) {
        if (!text1 || !text2) return text1 || text2;

        let diff = '';
        const words1 = text1.split(' ');
        const words2 = text2.split(' ');

        for (let i = 0; i < Math.max(words1.length, words2.length); i++) {
            if (words1[i] !== words2[i]) {
                diff += `<span style="background-color: yellow">${words2[i] || ''}</span> `;
            } else {
                diff += `${words2[i] || ''} `;
            }
        }

        return diff.trim();
    }

    // Generate table rows
    for (let i = 0; i < maxLength; i++) {
        const highlightedResponseA = highlightDifferences(responseA[i], responseB[i]);
        const highlightedResponseB = highlightDifferences(responseB[i], responseA[i]);

        tableHTML += `
            <tr>
                <td>${userRequest[i] || ''}</td>
                <td>${highlightedResponseA || ''}</td>
                <td>${highlightedResponseB || ''}</td>
            </tr>
        `;
    }

    tableHTML += `
            </tbody>
        </table>
    `;

    document.getElementById("result").innerHTML = tableHTML;
});
