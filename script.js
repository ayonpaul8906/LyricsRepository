// Initialize an empty array for songs
let songs = [];

// Load songs from localStorage if available
if (localStorage.getItem('songs')) {
    songs = JSON.parse(localStorage.getItem('songs'));
}

// Function to display song titles in grid
function loadSongs() {
    const songList = document.getElementById("song-list");
    songList.innerHTML = "";

    if (songs.length === 0) {
        songList.innerHTML = "<p>No songs added yet. Click 'Add New Song' to get started!</p>";
        return;
    }

    songs.forEach((song, index) => {
        const songItem = document.createElement("div");
        songItem.className = "song-item";
        songItem.innerText = `${song.title}\n(${song.date})`;

        // Add a click event to show lyrics
        songItem.addEventListener("click", () => showLyrics(song));

        // Create and append delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent opening lyrics modal when deleting
            deleteSong(index);
        });

        songItem.appendChild(deleteBtn);
        songList.appendChild(songItem);
    });
}

// Function to delete a song
function deleteSong(index) {
    if (confirm("Are you sure you want to delete this song?")) {
        songs.splice(index, 1);
        localStorage.setItem('songs', JSON.stringify(songs));
        loadSongs(); // Refresh the song list
    }
}

// Function to display lyrics in modal window
function showLyrics(song) {
    const modal = document.getElementById("song-modal");
    document.getElementById("song-title").innerText = song.title;
    document.getElementById("song-date").innerText = `Date: ${song.date}`;
    document.getElementById("song-lyrics").innerText = song.lyrics;
    modal.style.display = "flex";
}

// Function to open Add Song modal
function openAddSongModal() {
    const addModal = document.getElementById("add-song-modal");
    addModal.style.display = "flex";
}

// Function to close Add Song modal
function closeAddSongModal() {
    const addModal = document.getElementById("add-song-modal");
    addModal.style.display = "none";
    document.getElementById("add-song-form").reset();
}

// Function to add a new song
function addNewSong(event) {
    event.preventDefault(); // Prevent form submission

    const title = document.getElementById("song-title-input").value.trim();
    const date = document.getElementById("song-date-input").value;
    const lyrics = document.getElementById("song-lyrics-input").value.trim();

    if (title === "" || date === "" || lyrics === "") {
        alert("Please fill in all fields.");
        return;
    }

    const newSong = { title, date, lyrics };
    songs.push(newSong);

    // Save to localStorage
    localStorage.setItem('songs', JSON.stringify(songs));

    loadSongs(); // Refresh the song list
    closeAddSongModal(); // Close the modal
}

// Event Listeners

// Close song lyrics modal when clicking the close button
document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("song-modal").style.display = "none";
});

// Open Add Song modal when clicking the Add button
document.getElementById("add-song-btn").addEventListener("click", openAddSongModal);

// Close Add Song modal when clicking the close button
document.getElementById("close-add-modal").addEventListener("click", closeAddSongModal);

// Handle form submission for adding new song
document.getElementById("add-song-form").addEventListener("submit", addNewSong);

// Close modals when clicking outside the modal content
window.addEventListener("click", (event) => {
    const songModal = document.getElementById("song-modal");
    const addModal = document.getElementById("add-song-modal");
    if (event.target === songModal) {
        songModal.style.display = "none";
    }
    if (event.target === addModal) {
        addModal.style.display = "none";
        document.getElementById("add-song-form").reset();
    }
});

// Initialize the song list on page load
window.onload = loadSongs;
