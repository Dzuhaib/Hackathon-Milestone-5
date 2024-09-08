"use strict";
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c;
    const resumeForm = document.getElementById('resumeForm');
    const resumePreview = document.getElementById('resumePreview');
    const resumeContent = document.getElementById('resumeContent');
    const generateButton = document.querySelector('button[type="submit"]');
    const editButton = document.getElementById('editButton');
    const downloadButton = document.getElementById('downloadButton');
    const shareButton = document.getElementById('shareButton');
    const resumeActions = document.getElementById('resumeActions');
    let resume = null;
    let isEditing = false;
    // Function to add education fields dynamically
    const addEducationField = () => {
        const educationFields = document.getElementById('educationFields');
        const newEducation = document.createElement('div');
        newEducation.classList.add('education');
        newEducation.innerHTML = `
      <input type="text" class="institution" placeholder="Institution" required>
      <input type="text" class="degree" placeholder="Degree" required>
      <input type="text" class="year" placeholder="Year" required>
    `;
        educationFields.appendChild(newEducation);
    };
    // Function to add work experience fields dynamically
    const addWorkExperienceField = () => {
        const workExperienceFields = document.getElementById('workExperienceFields');
        const newWorkExperience = document.createElement('div');
        newWorkExperience.classList.add('workExperience');
        newWorkExperience.innerHTML = `
      <input type="text" class="company" placeholder="Company" required>
      <input type="text" class="role" placeholder="Role" required>
      <input type="text" class="duration" placeholder="Duration" required>
    `;
        workExperienceFields.appendChild(newWorkExperience);
    };
    // Function to add skill fields dynamically
    const addSkillField = () => {
        const skillsFields = document.getElementById('skillsFields');
        const newSkill = document.createElement('input');
        newSkill.classList.add('skill');
        newSkill.type = 'text';
        newSkill.placeholder = 'Skill';
        newSkill.required = true;
        skillsFields.appendChild(newSkill);
    };
    (_a = document.getElementById('addEducation')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addEducationField);
    (_b = document.getElementById('addWorkExperience')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', addWorkExperienceField);
    (_c = document.getElementById('addSkill')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', addSkillField);
    // Function to generate PDF
    const generatePDF = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        // Add resume content
        doc.setTextColor(0, 0, 0); // Black text color
        doc.text(resumeContent.innerText, 10, 10);
        doc.save('resume.pdf');
    };
    // Function to generate a shareable link
    const generateShareableLink = () => {
        // Example of generating a shareable link (you'll need to implement a real one)
        const link = `https://example.com/share?resumeId=${encodeURIComponent('unique_resume_id')}`;
        return link;
    };
    // Function to update resume content for preview
    const updateResumeContent = (resume) => {
        resumeContent.innerHTML = `
      <h3>${resume.personalInfo.name}</h3>
      <p>Email: ${resume.personalInfo.email}</p>
      <p>Phone: ${resume.personalInfo.phone}</p>
      <h4>Education</h4>
      <ul>${resume.education.map(e => `<li>${e.institution} - ${e.degree} (${e.year})</li>`).join('')}</ul>
      <h4>Work Experience</h4>
      <ul>${resume.workExperience.map(w => `<li>${w.company} - ${w.role} (${w.duration})</li>`).join('')}</ul>
      <h4>Skills</h4>
      <ul>${resume.skills.map(s => `<li>${s}</li>`).join('')}</ul>
    `;
    };
    // Function to handle resume generation and switching to preview mode
    const generateResume = () => {
        if (!resume)
            return;
        updateResumeContent(resume);
        resumeForm.style.display = 'none';
        resumePreview.style.display = 'block';
        resumeActions.style.display = 'block';
    };
    // Handle form submission
    resumeForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload
        const personalInfo = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
        };
        const education = Array.from(document.querySelectorAll('.education')).map(e => ({
            institution: e.querySelector('.institution').value,
            degree: e.querySelector('.degree').value,
            year: e.querySelector('.year').value,
        }));
        const workExperience = Array.from(document.querySelectorAll('.workExperience')).map(w => ({
            company: w.querySelector('.company').value,
            role: w.querySelector('.role').value,
            duration: w.querySelector('.duration').value,
        }));
        const skills = Array.from(document.querySelectorAll('.skill')).map(s => s.value);
        resume = { personalInfo, education, workExperience, skills };
        generateResume();
    });
    // Handle Edit button click
    editButton.addEventListener('click', () => {
        if (!resume)
            return;
        // Populate form fields with resume data for editing
        document.getElementById('name').value = resume.personalInfo.name;
        document.getElementById('email').value = resume.personalInfo.email;
        document.getElementById('phone').value = resume.personalInfo.phone;
        const educationFields = document.getElementById('educationFields');
        educationFields.innerHTML = '';
        resume.education.forEach(e => {
            const newEducation = document.createElement('div');
            newEducation.classList.add('education');
            newEducation.innerHTML = `
        <input type="text" class="institution" value="${e.institution}" placeholder="Institution" required>
        <input type="text" class="degree" value="${e.degree}" placeholder="Degree" required>
        <input type="text" class="year" value="${e.year}" placeholder="Year" required>
      `;
            educationFields.appendChild(newEducation);
        });
        const workExperienceFields = document.getElementById('workExperienceFields');
        workExperienceFields.innerHTML = '';
        resume.workExperience.forEach(w => {
            const newWorkExperience = document.createElement('div');
            newWorkExperience.classList.add('workExperience');
            newWorkExperience.innerHTML = `
        <input type="text" class="company" value="${w.company}" placeholder="Company" required>
        <input type="text" class="role" value="${w.role}" placeholder="Role" required>
        <input type="text" class="duration" value="${w.duration}" placeholder="Duration" required>
      `;
            workExperienceFields.appendChild(newWorkExperience);
        });
        const skillsFields = document.getElementById('skillsFields');
        skillsFields.innerHTML = '';
        resume.skills.forEach(s => {
            const newSkill = document.createElement('input');
            newSkill.classList.add('skill');
            newSkill.type = 'text';
            newSkill.value = s;
            newSkill.placeholder = 'Skill';
            newSkill.required = true;
            skillsFields.appendChild(newSkill);
        });
        resumeForm.style.display = 'block';
        resumePreview.style.display = 'none';
        resumeActions.style.display = 'none';
        isEditing = true;
    });
    downloadButton.addEventListener('click', generatePDF);
    shareButton.addEventListener('click', () => {
        const link = generateShareableLink();
        window.prompt("Copy this link to share your resume:", link);
    });
});
