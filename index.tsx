/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- DOM Elements ---
const chatHistory = document.getElementById('chat-history') as HTMLElement;
const messageInput = document.getElementById('message-input') as HTMLInputElement;
const sendButton = document.getElementById('send-button') as HTMLButtonElement;
const chatForm = document.getElementById('chat-form') as HTMLFormElement;
const userSwitcher = document.getElementById('user-switcher') as HTMLButtonElement;
const currentUserIndicator = document.getElementById('current-user-indicator') as HTMLParagraphElement;

// --- App State ---
type User = 'user1' | 'user2';
let currentUser: User = 'user1';

/**
 * Updates the UI to reflect the current user.
 */
function updateCurrentUserUI() {
  const userName = currentUser === 'user1' ? 'User 1' : 'User 2';
  currentUserIndicator.textContent = `আপনি এখন ${userName} হিসাবে চ্যাট করছেন`;
  messageInput.placeholder = `${userName} হিসাবে বার্তা লিখুন...`;

  // Change accent color based on the current user for better UX
  if (currentUser === 'user1') {
      document.documentElement.style.setProperty('--accent-color', '#4CAF50');
      document.documentElement.style.setProperty('--user-msg-bg', '#dcf8c6');
  } else {
      document.documentElement.style.setProperty('--accent-color', '#4285f4');
      document.documentElement.style.setProperty('--user-msg-bg', '#e0e0e0');
  }
}


/**
 * Appends a message to the chat history.
 * @param sender - The user sending the message ('user1' or 'user2').
 * @param message - The message content.
 * @returns The element containing the message content.
 */
function appendMessage(sender: User, message: string): HTMLElement {
  const messageWrapper = document.createElement('div');
  // Messages from the current sender appear on the right ('user-message' style)
  // The other user's messages appear on the left ('friend-message' style)
  const messageType = sender === currentUser ? 'user-message' : 'friend-message';
  
  // To keep alignment consistent, user1 is always 'friend' (left) and user2 is 'user' (right)
  // Let's adjust this to be simpler: user1 is always right, user2 is always left.
  const finalMessageType = sender === 'user1' ? 'user-message' : 'friend-message';
  messageWrapper.classList.add('message', finalMessageType);

  const avatar = document.createElement('div');
  avatar.classList.add('avatar');
  avatar.textContent = sender === 'user1' ? '1' : '2';
  
  const content = document.createElement('div');
  content.classList.add('content');
  content.textContent = message; // Use textContent for security

  messageWrapper.appendChild(avatar);
  messageWrapper.appendChild(content);
  chatHistory.appendChild(messageWrapper);
  
  // Scroll to the bottom
  chatHistory.scrollTop = chatHistory.scrollHeight;

  return content;
}

/**
 * Handles the chat form submission.
 * @param e - The form submission event.
 */
function handleFormSubmit(e: Event) {
  e.preventDefault();
  const userMessage = messageInput.value.trim();

  if (!userMessage) return;

  // 1. Display the message from the current user
  appendMessage(currentUser, userMessage);
  messageInput.value = '';
  sendButton.disabled = true;
  messageInput.focus();
}

/**
 * Toggles the send button's disabled state based on input content.
 */
function toggleSendButton() {
  sendButton.disabled = messageInput.value.trim().length === 0;
}

/**
 * Switches the current user between 'user1' and 'user2'.
 */
function switchUser() {
    currentUser = currentUser === 'user1' ? 'user2' : 'user1';
    updateCurrentUserUI();
    messageInput.focus();
}

// --- Event Listeners ---
chatForm.addEventListener('submit', handleFormSubmit);
messageInput.addEventListener('input', toggleSendButton);
userSwitcher.addEventListener('click', switchUser);

// --- Initial Setup ---
function initializeChat() {
    const initialMessage = document.createElement('div');
    initialMessage.classList.add('initial-message');
    initialMessage.textContent = 'চ্যাটিং শুরু করুন!';
    chatHistory.appendChild(initialMessage);
    updateCurrentUserUI();
}

initializeChat();