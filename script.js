// Lista de contatos com seus ícones e mensagens
const contacts = [
    { name: 'João', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', lastMessage: 'Oi, tudo bem?' },
    { name: 'Maria', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', lastMessage: 'Vamos marcar um café?' },
    { name: 'Pedro', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', lastMessage: 'Oi, estou indo para aí!' },
];

// Função para adicionar contatos na barra lateral
function loadContacts() {
    const contactsList = document.querySelector('.contacts-list');
    contacts.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.classList.add('contact-item');
        contactItem.innerHTML = `
            <img src="${contact.avatar}" alt="${contact.name}">
            <div class="contact-name">${contact.name}</div>
        `;
        contactItem.addEventListener('click', () => selectContact(contact));
        contactsList.appendChild(contactItem);
    });
}

// Função para selecionar um contato e exibir a conversa
function selectContact(contact) {
    const chatHeader = document.querySelector('.chat-header');
    const chatContent = document.querySelector('.chat-content');
    
    // Atualiza o nome do contato no cabeçalho
    chatHeader.textContent = `Conversando com ${contact.name}`;

    // Exibe a mensagem inicial na área de conversa
    chatContent.innerHTML = `
        <div class="message received">
            <span>${contact.name}: ${contact.lastMessage}</span>
        </div>
    `;
    
    // Exibe a área de entrada de mensagens
    document.querySelector('.chat-input').style.display = 'flex';
}

// Função para enviar mensagem
document.getElementById('send-message-btn').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const imageInput = document.getElementById('image-input');
    const message = messageInput.value.trim();
    const imageLink = imageInput.value.trim();

    if (message || imageLink) {
        const chatContent = document.querySelector('.chat-content');

        // Se houver uma mensagem de texto
        if (message) {
            chatContent.innerHTML += `
                <div class="message sent">
                    <span>Você: ${message}</span>
                </div>
            `;
        }

        // Se houver um link de imagem
        if (imageLink && isValidImageUrl(imageLink)) {
            chatContent.innerHTML += `
                <div class="message sent">
                    <img src="${imageLink}" alt="Imagem enviada" style="max-width: 100%; border-radius: 10px;">
                </div>
            `;
        }

        messageInput.value = ''; // Limpa a caixa de texto
        imageInput.value = '';   // Limpa o campo de link da imagem
        chatContent.scrollTop = chatContent.scrollHeight; // Rola a conversa para o fim
    }
});

// Função para verificar se a URL é uma imagem
function isValidImageUrl(url) {
    const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))/i;
    return regex.test(url);
}

// Funcionalidade da barra de emojis
document.getElementById('emoji-btn').addEventListener('click', function() {
    const emojiPicker = document.getElementById('emoji-picker');
    emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block';
});

document.querySelectorAll('.emoji').forEach(emoji => {
    emoji.addEventListener('click', function() {
        const messageInput = document.getElementById('message-input');
        messageInput.value += emoji.textContent; // Adiciona o emoji ao campo de texto
        messageInput.focus(); // Foca no campo de texto
    });
});

// Carregar contatos ao iniciar a página
window.onload = function() {
    loadContacts();
};
