const toggleButton = document.getElementById('toggle-button');
const navLinks = document.getElementById('nav-links');

toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
const friendsList = document.querySelector('.friends-list');

friendsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-friend')) {
    const friend = e.target.closest('.friend');
    friend.remove();
  }
});


const blockedUsersList = document.querySelector('.blocked-users-list');


blockedUsersList.addEventListener('click', (e) => {
  if (e.target.classList.contains('unblock-user')) {
    const blockedUser = e.target.closest('.blocked-user');
    blockedUser.remove();
  }
});
