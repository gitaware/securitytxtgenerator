  const APP_VERSION = 'v 1.1';
  document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('setFutureDate_1').addEventListener('click', function() {
      setFutureDate(1);
    });
    document.getElementById('addContactField').addEventListener('click', addContactField);
    document.getElementById('addCanonicalField').addEventListener('click', addCanonicalField);
    document.getElementById('generateSecurityTxt').addEventListener('click', generateSecurityTxt);
    document.getElementById('generatePGPKey').addEventListener('click', generatePGPKey);
    document.getElementById('copyPassphrase').addEventListener('click', copyPassphrase);
    document.getElementById('downloadPrivateKey').addEventListener('click', downloadPrivateKey);
    document.getElementById('signSecurityTxt').addEventListener('click', signSecurityTxt);
    document.getElementById('downloadSignedFile').addEventListener('click', downloadSignedFile);
    document.getElementById('togglePassphrase').addEventListener('click', togglePassphrase);

    const splash = document.getElementById('splashModal');
    const footer = document.getElementById('appFooter');
    const splashcontent = `<p>security.txt generator</p><p>For sourcecode see <a href="https://github.com/gitaware/securitytxtgenerator">github</a></p><p>${APP_VERSION} (c)2025 <a href="https://cloudaware.eu">CloudAware.eu</a></p>`;
    const footercontent = `${APP_VERSION} (c)2025 <a href="https://cloudaware.eu">CloudAware.eu</a>`;

    splash.innerHTML = splashcontent;
    footer.innerHTML = footercontent.replace('white', '#666'); // Use darker color for footer link

    splash.addEventListener('click', () => {
      splash.style.display = 'none';
    });

    document.querySelectorAll('.help-icon').forEach(icon => {
      icon.addEventListener('click', (e) => {
        const title = e.currentTarget.dataset.helpTitle || "Help";
        const content = e.currentTarget.dataset.helpContent || "No help available.";
        
        document.getElementById('helpModalTitle').textContent = title;
        document.getElementById('helpModalBody').innerHTML = content;
        document.getElementById('helpModal').style.display = 'block';
      });
    });

    document.getElementById('helpModal').addEventListener('click', () => {
      document.getElementById('helpModal').style.display = 'none';
    });

    addContactField(); // ensure at least one contact exists
    addCanonicalField();
  });

  function generateSecurityTxt() {
    const contacts = Array.from(document.querySelectorAll('#contactContainer input'))
                          .map(input => input.value.trim())
                          .filter(val => val !== '');
    const expiresInput = document.getElementById('expires').value;
    const langs = Array.from(document.getElementById('languages').selectedOptions)
                       .map(opt => opt.value).join(',');

    const canonicals = Array.from(document.querySelectorAll('#canonicalContainer input'))
                            .map(input => input.value.trim())
                            .filter(val => val !== '');

    // Validation
    const errors = [];
    if (contacts.length === 0) errors.push("At least one contact is required.");
    if (!expiresInput) errors.push("Expires is required.");

    canonicals.forEach((url, index) => {
      try {
        const u = new URL(url);
        if (!u.href.endsWith('security.txt')) {
          errors.push(`Canonical URL ${index + 1} must end with "security.txt"`);
        }
      } catch {
        errors.push(`Canonical URL ${index + 1} is not a valid URL.`);
      }
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    const expires = new Date(expiresInput).toISOString().replace(/\.\d+Z$/, 'Z');

    let txt = '';
    contacts.forEach(contact => {
      txt += `Contact: ${contact}\n`;
    });
    if (expires) txt += `Expires: ${expires}\n`;
    if (langs) txt += `Preferred-Languages: ${langs}\n`;
    canonicals.forEach(url => {
      txt += `Canonical: ${url}\n`;
    });

    document.getElementById('securityOutput').value = txt;
  }

  function setFutureDate(years) {
    const future = new Date();
    future.setFullYear(future.getFullYear() + years);
    document.getElementById('expires').value = future.toISOString().slice(0, 16);
  }

  async function signSecurityTxt() {
    const armoredPrivateKey = document.getElementById('privateKey').value.trim();
    const passphrase = document.getElementById('passphrase').value;
    const message = document.getElementById('securityOutput').value;

    if (!armoredPrivateKey || !message) {
      alert("Please provide both a private key and a security.txt message.");
      return;
    }

    try {
      const privateKey = await openpgp.readPrivateKey({ armoredKey: armoredPrivateKey });

      let signingKey = privateKey;
      if (privateKey.isDecrypted() === false) {
        signingKey = await openpgp.decryptKey({
          privateKey,
          passphrase
        });
      }

      const signed = await openpgp.sign({
        message: await openpgp.createCleartextMessage({ text: message }),
        signingKeys: signingKey
      });

      document.getElementById('signedOutput').value = signed;

      document.getElementById('helpModalTitle').textContent = "Document signed";
      document.getElementById('helpModalBody').innerHTML = "The security.txt document has successfully been signed!";
      document.getElementById('helpModal').style.display = 'block';

    } catch (err) {
      alert("Signing failed: " + err.message);
    }
  }

  async function generatePGPKey() {
    const name = prompt("Enter your name or email for the PGP key:", "security@example.com");
    if (!name) return;

    const { privateKey } = await openpgp.generateKey({
      type: 'rsa',
      rsaBits: 4096,
      userIDs: [{ name }],
      passphrase: ''
    });

    document.getElementById('privateKey').value = privateKey;
    showToast("✅ PGP Key generated! You can now sign your security.txt.");
    generatePassphrase();
  }

  async function downloadPrivateKey() {
    const armoredPrivateKey = document.getElementById('privateKey').value.trim();
    const passphrase = document.getElementById('passphrase').value;

    if (!armoredPrivateKey) {
      alert("No private key found to download.");
      return;
    }

    if (!passphrase) {
      alert("Please enter a passphrase to encrypt the exported private key.");
      return;
    }

    try {
      const privateKey = await openpgp.readPrivateKey({ armoredKey: armoredPrivateKey });

      const encryptedKey = await openpgp.encryptKey({
        privateKey,
        passphrase
      });

      const blob = new Blob([encryptedKey.armor()], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'private-key-encrypted.asc';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Encryption failed: " + err.message);
    }
  }

  function generatePassphrase(length = 24) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}<>?';
    let passphrase = '';
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      passphrase += charset[randomValues[i] % charset.length];
    }

    document.getElementById('passphrase').value = passphrase;
  }

  async function copyPassphrase() {
    const passInput = document.getElementById('passphrase');
    const passphrase = passInput.value;

    try {
      await navigator.clipboard.writeText(passphrase);
      showToast("✅ Passphrase copied!");
    } catch (err) {
      showToast("❌ Failed to copy.");
    }
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => {
      toast.className = toast.className.replace("show", "");
    }, 2000);
  }

  function togglePassphrase() {
    const passInput = document.getElementById('passphrase');
    const toggleIcon = document.querySelector('.toggle-visibility');

    if (passInput.type === 'password') {
      passInput.type = 'text';
      toggleIcon.textContent = '🙈'; // hide icon
    } else {
      passInput.type = 'password';
      toggleIcon.textContent = '👁️'; // show icon
    }
  }

  function downloadSignedFile() {
    const signed = document.getElementById('signedOutput').value;
    const blob = new Blob([signed], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'security.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  function addContactField(value = '') {
    const container = document.getElementById('contactContainer');
    const row = document.createElement('div');
    row.className = 'canonical-row'; // reuse same styling

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'mailto:security@example.com';
    //input.value = value;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.innerHTML = '🗑️';
    removeBtn.title = 'Remove';
    removeBtn.className = 'btn-remove-canonical';
    removeBtn.onclick = () => {
      if (container.children.length > 1) {
        container.removeChild(row);
        toggleTrashVisibilityForContacts();
      }
    };

    row.appendChild(input);
    row.appendChild(removeBtn);
    container.appendChild(row);
    toggleTrashVisibilityForContacts();
  }

  function toggleTrashVisibilityForContacts() {
    const rows = document.querySelectorAll('#contactContainer .canonical-row');
    rows.forEach((row, index) => {
      const btn = row.querySelector('button');
      btn.style.visibility = rows.length > 1 ? 'visible' : 'hidden';
    });
  }

  function addCanonicalField(value = '') {
    const container = document.getElementById('canonicalContainer');
    const row = document.createElement('div');
    row.className = 'canonical-row';

    const input = document.createElement('input');
    input.type = 'url';
    input.placeholder = 'https://example.com/.well-known/security.txt';
    //input.value = value;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.innerHTML = '🗑️';
    removeBtn.title = 'Remove';
    removeBtn.className = 'btn-remove-canonical';
    removeBtn.onclick = () => {
      if (container.children.length > 1) {
        container.removeChild(row);
        toggleTrashVisibility();
      }
    };

    row.appendChild(input);
    row.appendChild(removeBtn);
    container.appendChild(row);
    toggleTrashVisibility();
  }

  function toggleTrashVisibility() {
    const rows = document.querySelectorAll('#canonicalContainer .canonical-row');
    rows.forEach((row, index) => {
      const btn = row.querySelector('button');
      btn.style.visibility = rows.length > 1 ? 'visible' : 'hidden';
    });
  }

  document.getElementById('keyFile').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    document.getElementById('privateKey').value = text;
  });

