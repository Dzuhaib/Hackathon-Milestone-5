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
        // Center the name at the top with red color
        doc.setTextColor(255, 0, 0); // Red color
        doc.setFontSize(20);
        doc.text(resume.personalInfo.name, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
        // Draw a line below the name
        doc.setLineWidth(0.5);
        doc.line(10, 30, doc.internal.pageSize.getWidth() - 10, 30); // Horizontal line
        // Display email on the left and phone number on the right
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Black for email and phone
        doc.text(resume.personalInfo.email, 10, 40); // Left side for email
        doc.text(resume.personalInfo.phone, doc.internal.pageSize.getWidth() - 10, 40, { align: 'right' }); // Right side for phone
        // Add the "Education" title in yellow
        doc.setTextColor(255, 215, 0); // Yellow color
        doc.setFontSize(16);
        doc.text("Education", 10, 60);
        // Add each education entry with proper spacing
        doc.setTextColor(0, 0, 0); // Black for education details
        resume.education.forEach((edu, index) => {
            const offset = 70 + index * 10;
            doc.text(`${edu.institution} - ${edu.degree} (${edu.year})`, 10, offset);
        });
        // Add the "Work Experience" title in red
        doc.setTextColor(255, 0, 0); // Red color
        doc.setFontSize(16);
        doc.text("Work Experience", 10, 90 + resume.education.length * 10);
        // Add each work experience entry with proper spacing
        doc.setTextColor(0, 0, 0); // Black for work experience details
        resume.workExperience.forEach((work, index) => {
            const offset = 100 + resume.education.length * 10 + index * 10;
            doc.text(`${work.company} - ${work.role} (${work.duration})`, 10, offset);
        });
        // Add the "Skills" title in red
        doc.setTextColor(255, 0, 0); // Red color
        doc.setFontSize(16);
        const skillsOffset = 110 + resume.education.length * 10 + resume.workExperience.length * 10;
        doc.text("Skills", 10, skillsOffset);
        // Add each skill with proper spacing
        doc.setTextColor(0, 0, 0); // Black for skills
        resume.skills.forEach((skill, index) => {
            doc.text(skill, 10, skillsOffset + 10 + index * 10);
        });
        // Save the PDF
        doc.save('resume.pdf');
    };
    // Function to generate a shareable link
    const generateShareableLink = () => {
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
      <ul>${resume.workExperience.map(w => `<li>${w.company} - ${w.role} (${w.duration})}</li>`).join('')}</ul>
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
        // Show the form for editing
        resumeForm.style.display = 'block';
        resumePreview.style.display = 'none';
        resumeActions.style.display = 'none';
    });
    // Handle Download button click
    downloadButton.addEventListener('click', generatePDF);
    // Handle Share button click
    shareButton.addEventListener('click', () => {
        const shareableLink = generateShareableLink();
        alert(`Shareable link: ${shareableLink}`);
    });
});
