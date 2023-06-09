document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('add-contact-form');
    const contactList = document.getElementById('contacts');
    let isEditing = false;
    let editIndex = -1;
  
    // Cargar los contactos al cargar la página
    loadContacts();
  
    // Agregar o editar un contacto
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
  
            if (isEditing) {
              updateContact(contact);
              isEditing = false;
              editIndex = -1;
            } else {
              addContact(contact);
            }
  
            nameInput.value = '';
            emailInput.value = '';
            phoneInput.value = '';
            contactForm.querySelector('button[type="submit"]').textContent = 'Agregar';
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
  
      savedContacts.forEach((contact, index) => {
        displayContact(contact, index);
      });
    }
  
    // Función para agregar un contacto
    function addContact(contact) {
      const savedContacts = getSavedContacts();
  
      savedContacts.push(contact);
      saveContacts(savedContacts);
  
      displayContact(contact, savedContacts.length - 1);
    }
  
    // Función para actualizar un contacto existente
    function updateContact(contact) {
      const savedContacts = getSavedContacts();
  
      savedContacts[editIndex] = contact;
      saveContacts(savedContacts);
  
      refreshContactList();
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
  
      return savedContacts.some((savedContact, index) => {
        if (index !== editIndex) {
          return savedContact.email === email || savedContact.phone === phone;
        }
        return false;
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
    function displayContact(contact, index) {
        const contactItem = document.createElement('li');
        contactItem.classList.add('contact-item');
    
        const contactInfo = document.createElement('div');
        contactInfo.classList.add('contact-info');
    
        const nameElement = document.createElement('h3');
        nameElement.textContent = contact.name;
        contactInfo.appendChild(nameElement);
    
        const emailElement = document.createElement('p');
        emailElement.textContent = `Email: ${contact.email}`;
        contactInfo.appendChild(emailElement);
    
        const phoneElement = document.createElement('p');
        phoneElement.textContent = `Teléfono: ${contact.phone}`;
        contactInfo.appendChild(phoneElement);
    
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => {
          editContact(index);
        });
        contactInfo.appendChild(editButton);
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
          deleteContact(index);
        });
        contactInfo.appendChild(deleteButton);
    
        contactItem.appendChild(contactInfo);
        contactList.appendChild(contactItem);
      }
    
      // Función para editar un contacto
      function editContact(index) {
        const savedContacts = getSavedContacts();
        const contact = savedContacts[index];
    
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
    
        nameInput.value = contact.name;
        emailInput.value = contact.email;
        phoneInput.value = contact.phone;
    
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Actualizar';
        submitBtn.classList.add('update');
    
        isEditing = true;
        editIndex = index;
      }
    });
    
  