const notes = [];
let currentLanguage = 'ar'; // اللغة الافتراضية

const texts = {
    ar: {
        title: "Storka",
        placeholderTitle: "عنوان الملاحظة",
        placeholderText: "اكتب ملاحظتك هنا...",
        addNote: "أضف ملاحظة",
        dateTimeFormat: "تاريخ ووقت: "
    },
    en: {
        title: "Storka",
        placeholderTitle: "Note Title",
        placeholderText: "Write your note here...",
        addNote: "Add Note",
        dateTimeFormat: "Date and Time: "
    }
};

function updateDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const formattedDateTime = now.toLocaleString(getLocale(), options);
    document.getElementById('date-time').innerText = texts[currentLanguage].dateTimeFormat + formattedDateTime;
}

function getLocale() {
    return currentLanguage === 'ar' ? 'ar-SA' : 'en-US';
}

function changeLanguage() {
    const selectedLanguage = document.getElementById('language-select').value;
    currentLanguage = selectedLanguage;

    // تحديث النصوص في الواجهة
    document.getElementById('app-title').innerText = texts[currentLanguage].title;
    document.getElementById('note-title').placeholder = texts[currentLanguage].placeholderTitle;
    document.getElementById('note-text').placeholder = texts[currentLanguage].placeholderText;
    document.querySelector('button').innerText = texts[currentLanguage].addNote;

    // تحديث التاريخ والوقت
    updateDateTime();
}

function addNote() {
    const title = document.getElementById('note-title').value;
    const text = document.getElementById('note-text').value;

    if (title && text) {
        const note = { title, text, completed: false };
        notes.push(note);
        renderNotes();
        clearInputs();
    }
}

function renderNotes() {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = ''; // Clear existing notes

    notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.innerHTML = `<h3>${note.title}</h3><p>${note.text}</p>`;
        notesContainer.appendChild(noteDiv);
    });
}

function clearInputs() {
    document.getElementById('note-title').value = '';
    document.getElementById('note-text').value = '';
}

// تحديث التاريخ والوقت عند تحميل الصفحة
updateDateTime();
