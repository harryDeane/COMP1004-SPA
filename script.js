const toggleButton = document.getElementById('toggle-button');
const navLinks = document.getElementById('nav-links');

toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('input[name="search"]');
const friendsList = document.getElementById('friends-list');
const blockedUsersList = document.getElementById('blocked-users-list');
const friendRequestsList = document.getElementById('friend-requests');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  const filteredFriends = friendsDatabase.filter((friend) => friend.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (filteredFriends.length > 0) {
    displayFriends(filteredFriends);
  } else {
    displayErrorMessage('No users found.');
  }
});

function populateFriendsList() {
  friendsList.innerHTML = '';

  friendsDatabase.forEach((friend) => {
    const friendItem = document.createElement('li');
    friendItem.classList.add('friend');

    const friendImage = document.createElement('img');
    friendImage.src = friend.image;
    friendImage.alt = friend.name;

    const friendName = document.createElement('h3');
    friendName.textContent = friend.name;

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-friend');
    removeButton.textContent = 'Remove Friend';

    const blockButton = document.createElement('button');
    blockButton.classList.add('block-user');
    blockButton.textContent = 'Block User';

    blockButton.addEventListener('click', () => {
      blockUser(friend);
    });

    friendItem.appendChild(friendImage);
    friendItem.appendChild(friendName);
    friendItem.appendChild(removeButton);
    friendItem.appendChild(blockButton);

    friendsList.appendChild(friendItem);
  });
}

function populateBlockedUsersList() {
  blockedUsersList.innerHTML = '';

  blockedUsersDatabase.forEach((blockedUser) => {
    const blockedUserItem = document.createElement('li');
    blockedUserItem.classList.add('blocked-user');

    const blockedUserImage = document.createElement('img');
    blockedUserImage.src = blockedUser.image;
    blockedUserImage.alt = blockedUser.name;

    const blockedUserName = document.createElement('h3');
    blockedUserName.textContent = blockedUser.name;

    const unblockButton = document.createElement('button');
    unblockButton.classList.add('unblock-user');
    unblockButton.textContent = 'Unblock User';

    unblockButton.addEventListener('click', () => {
      unblockUser(blockedUser);
    });

    blockedUserItem.appendChild(blockedUserImage);
    blockedUserItem.appendChild(blockedUserName);
    blockedUserItem.appendChild(unblockButton);

    blockedUsersList.appendChild(blockedUserItem);
  });
}
function populateFriendRequestsList() {
  friendRequestsList.innerHTML = '';

  friendRequestsDatabase.forEach((request) => {
    const requestItem = document.createElement('li');
    requestItem.classList.add('friend-request');

    const requestImage = document.createElement('img');
    requestImage.src = request.image;
    requestImage.alt = request.name;

    const requestName = document.createElement('h3');
    requestName.textContent = request.name;

    const acceptButton = document.createElement('button');
    acceptButton.classList.add('accept-request');
    acceptButton.textContent = 'Accept';

    const declineButton = document.createElement('button');
    declineButton.classList.add('decline-request');
    declineButton.textContent = 'Decline';

    acceptButton.addEventListener('click', () => {
      acceptFriendRequest(request);
    });

    declineButton.addEventListener('click', () => {
      declineFriendRequest(request);
    });

    requestItem.appendChild(requestImage);
    requestItem.appendChild(requestName);
    requestItem.appendChild(acceptButton);
    requestItem.appendChild(declineButton);

    friendRequestsList.appendChild(requestItem);
  });
}

friendsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-friend')) {
    const friend = e.target.closest('.friend');
    friend.remove();
  }
});

function blockUser(user) {
  const index = friendsDatabase.indexOf(user);
  if (index > -1) {
    const blockedUser = friendsDatabase.splice(index, 1)[0];
    blockedUsersDatabase.push(blockedUser);
    populateFriendsList();
    populateBlockedUsersList();
  }
}

function unblockUser(user) {
  const index = blockedUsersDatabase.indexOf(user);
  if (index > -1) {
    const unblockedUser = blockedUsersDatabase.splice(index, 1)[0];
    friendsDatabase.push(unblockedUser);
    populateFriendsList();
    populateBlockedUsersList();
  }
}

function acceptFriendRequest(request) {
  const index = friendRequestsDatabase.indexOf(request);
  if (index > -1) {
    const acceptedRequest = friendRequestsDatabase.splice(index, 1)[0];
    friendsDatabase.push(acceptedRequest);
    populateFriendRequestsList();
    populateFriendsList();
  }
}

function declineFriendRequest(request) {
  const index = friendRequestsDatabase.indexOf(request);
  if (index > -1) {
    friendRequestsDatabase.splice(index, 1);
    populateFriendRequestsList();
  }
}

// Placeholder friends database
const friendsDatabase = [
  {
    name: 'John Doe',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Bob Johnson',
    image: 'https://via.placeholder.com/150',
  },
];

// Placeholder blocked users database
const blockedUsersDatabase = [
 {
    name: 'Mary Jane',
    image: 'https://via.placeholder.com/150',
  },
  
 ];
 
// Placeholder friend requests database
const friendRequestsDatabase = [
  {
    name: 'Friend Request 1',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Friend Request 2',
    image: 'https://via.placeholder.com/150',
  },
];

populateFriendRequestsList();
populateFriendsList();
populateBlockedUsersList();


function displayErrorMessage(message) {
  friendsList.innerHTML = `<li class="error-message">${message}</li>`;
}