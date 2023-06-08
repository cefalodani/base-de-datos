document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('add-contact-form');
    const contactList = document.getElementById('contacts');
  
    // Cargar los contactos al cargar la página
    loadContacts();
  
    // Agregar un nuevo contacto
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
  
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
  
      if (name && email && phone) {
        if (!isContactDuplicate(email, phone)) {
          if (phone.length <= 11) {
            const contact = { name, email, phone };
  
            addContact(contact);
            nameInput.value = '';
            emailInput.value = '';
            phoneInput.value = '';
          } else {
            alert('El número de teléfono no puede tener más de 11 dígitos');
          }
        } else {
          alert('El correo electrónico o número de teléfono ya existe');
        }
      }
    });
  
    // Función para cargar los contactos
    function loadContacts() {
      const savedContacts = getSavedContacts();
  
      savedContacts.forEach(contact => {
        displayContact(contact);
      });
    }
  
    // Función para agregar un contacto
    function addContact(contact) {
      const savedContacts = getSavedContacts();
  
      savedContacts.push(contact);
      saveContacts(savedContacts);
  
      displayContact(contact);
    }
  
    // Función para eliminar un contacto
    function deleteContact(contactIndex) {
      const savedContacts = getSavedContacts();
  
      savedContacts.splice(contactIndex, 1);
      saveContacts(savedContacts);
  
      refreshContactList();
    }
  
    // Función para comprobar si un contacto ya existe
    function isContactDuplicate(email, phone) {
      const savedContacts = getSavedContacts();
  
      return savedContacts.some(savedContact => {
        return savedContact.email === email || savedContact.phone === phone;
      });
    }
  
    // Función para obtener los contactos guardados
    function getSavedContacts() {
      const savedContacts = localStorage.getItem('contacts');
  
      return savedContacts ? JSON.parse(savedContacts) : [];
    }
  
    // Función para guardar los contactos
    function saveContacts(contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  
    // Función para refrescar la lista de contactos en la página
    function refreshContactList() {
      contactList.innerHTML = '';
      loadContacts();
    }
  
    // Función para mostrar un contacto en la página
    function displayContact(contact) {
      const contactItem = document.createElement('li');
      contactItem.innerHTML = `
        <span>Nombre: ${contact.name}</span>
        <span>Correo: ${contact.email}</span>
        <span>Teléfono: ${contact.phone}</span>
        <button class="delete-btn">Eliminar</button>
      `;
      contactList.appendChild(contactItem);
  
      const deleteBtn = contactItem.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
        const contactIndex = getSavedContacts().findIndex(savedContact => {
          return savedContact.email === contact.email && savedContact.phone === contact.phone;
        });
  
        deleteContact(contactIndex);
      });
    }
  });
  