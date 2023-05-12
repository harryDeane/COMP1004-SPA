
const searchForm = document.getElementById('search-form');
const friendsList = document.querySelector('.friends-list');
const blockedUsersList = document.querySelector('.blocked-users-list');

searchForm.addEventListener('submit', (e) => {
e.preventDefault();
const searchText = e.target.search.value.toLowerCase();
const friends = friendsList.querySelectorAll('.friend');
friends.forEach((friend) => {
const name = friend.querySelector('h3').textContent.toLowerCase();
if (name.includes(searchText)) {
friend.style.display = 'flex';
} else {
friend.style.display = 'none';
}
});
});

friendsList.addEventListener('click', (e) => {
if (e.target.classList.contains('remove-friend')) {
const friend = e.target.closest('.friend');
friend.remove();
} else if (e.target.classList.contains('block-user')) {
const friend = e.target.closest('.friend');
const name = friend.querySelector('h3').textContent;
const imgSrc = friend.querySelector('img').src;
const blockedUser = document.createElement('li');
blockedUser.classList.add('blocked-user');
blockedUser.innerHTML = <img src="${imgSrc}" alt="${name}"> <h3>${name}</h3> <button class="unblock-user">Unblock User</button> ;
blockedUsersList.appendChild(blockedUser);
friend.remove();
}
});

blockedUsersList.addEventListener('click', (e) => {
if (e.target.classList.contains('unblock-user')) {
const blockedUser = e.target.closest('.blocked-user');
blockedUser.remove();
}
});

const addFriendForm = document.getElementById('add-friend-form');
addFriendForm.addEventListener('submit', (e) => {
e.preventDefault();
const name = e.target.name.value;
const imageUrl = e.target.image.value;
const friend = document.createElement('li');
friend.classList.add('friend');
friend.innerHTML = <img src="${imageUrl}" alt="${name}"> <h3>${name}</h3> <button class="remove-friend">Remove Friend</button> <button class="block-user">Block User</button> ;
friendsList.appendChild(friend);
addFriendForm.reset();
});