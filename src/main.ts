import "./style.css";
import { generateCoverLetter } from "./api";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div class="container">

  <h1>AI Cover Letter Generator</h1>

  <form id="coverLetterForm">

    <label>Candidate Name</label>
    <input id="name" type="text" placeholder="Enter your full name" required>

    <label>Job Role</label>
    <input id="role" type="text" placeholder="Data Analyst" required>

    <label>Target Company</label>
    <input id="company" type="text" placeholder="Google" required>

    <label>Key Skills</label>
    <textarea id="skills" rows="5" placeholder="Python, SQL, Power BI..." required></textarea>

    <button type="submit">
      Generate Cover Letter
    </button>

  </form>


  <div class="output">

    <h2>Generated Cover Letter</h2>

    <textarea id="result" rows="12" readonly></textarea>

    <button id="copyBtn">
      Copy to Clipboard
    </button>

  </div>

</div>
`;


const form = document.getElementById("coverLetterForm") as HTMLFormElement;


form.addEventListener("submit", async (e) => {

  e.preventDefault();


  const name = (document.getElementById("name") as HTMLInputElement).value;

  const role = (document.getElementById("role") as HTMLInputElement).value;

  const company = (document.getElementById("company") as HTMLInputElement).value;

  const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;


  const result = document.getElementById("result") as HTMLTextAreaElement;

  const button = document.querySelector(
    "button[type='submit']"
  ) as HTMLButtonElement;


  button.innerText = "Generating...";
  button.disabled = true;

  result.value = "Generating AI cover letter...";


  const prompt = `
Generate a professional ATS friendly cover letter.

Candidate Name:
${name}

Job Role:
${role}

Target Company:
${company}

Skills:
${skills}

Write a concise professional cover letter.
`;


  try {

    const coverLetter = await generateCoverLetter(prompt);

    result.value = coverLetter || "No response received";


  } catch (error) {

    console.log(error);

    result.value = "Error generating cover letter";

  }


  button.innerText = "Generate Cover Letter";
  button.disabled = false;

});


// Copy Button

const copyBtn = document.getElementById("copyBtn") as HTMLButtonElement;

copyBtn.addEventListener("click", async () => {

  const result = document.getElementById("result") as HTMLTextAreaElement;

  await navigator.clipboard.writeText(result.value);

  alert("Cover letter copied!");

});