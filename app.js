/* ==========================================================================
   Data Mining Project Proposal - Interactive JavaScript Functions
   ========================================================================== */

// 1. Tab Switcher Function
function switchTab(tabName) {
    // Remove active class from all buttons and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Activate selected tab
    if (tabName === 'supervised') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('tab-supervised').classList.add('active');
    } else if (tabName === 'unsupervised') {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('tab-unsupervised').classList.add('active');
    }
}

// 2. Bareme Table Live Search Filter
function filterBareme() {
    const input = document.getElementById('bareme-search');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('bareme-table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        
        // Skip header section rows
        if (row.classList.contains('table-section-row')) {
            continue;
        }

        const textContent = row.textContent || row.innerText;
        if (textContent.toLowerCase().indexOf(filter) > -1) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

// 3. Email Subject Line Generator
function generateEmailSubject() {
    const type = document.getElementById('email-type').value;
    let leader = document.getElementById('leader-code').value.trim() || 'IASD01';
    let project = document.getElementById('project-name').value.trim() || 'Projet Data Mining';

    const formattedSubject = `[DM-2026][${type}] Groupe ${leader} - ${project}`;
    document.getElementById('generated-subject').innerText = formattedSubject;
}

// 4. Copy Email Subject Line to Clipboard
function copyEmailSubject() {
    const subjectText = document.getElementById('generated-subject').innerText;
    
    navigator.clipboard.writeText(subjectText).then(() => {
        const copyBtn = document.querySelector('.email-output-box .btn');
        const originalHTML = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copié !';
        copyBtn.style.borderColor = '#00B09B';
        copyBtn.style.color = '#00B09B';

        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.borderColor = '';
            copyBtn.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Erreur lors de la copie: ', err);
    });
}

// Initialize default state on page load
document.addEventListener('DOMContentLoaded', () => {
    generateEmailSubject();
});
