  const APP_VERSION = 'v1.3';
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
    //const splashcontent = `<div class="splash-logo-wrapper"><img alt="CloudAware Logo" class="splash-logo" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMTE1bW0iCiAgIGhlaWdodD0iNDVtbSIKICAgdmlld0JveD0iMCAwIDExNC45OTk5OSA0NSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnNSIKICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcwogICAgIGlkPSJkZWZzMiIgLz48ZwogICAgIGlkPSJsYXllcjYiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMuNzA0MTY4NywtMy45OTI4NzAzKSI+PHRleHQKICAgICAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgICAgICBzdHlsZT0iZm9udC1zaXplOjE1Ljg3NXB4O2ZvbnQtZmFtaWx5OidOb3RvIFNlcmlmIEdyYW50aGEnOy1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246J05vdG8gU2VyaWYgR3JhbnRoYSc7ZGlzcGxheTppbmxpbmU7ZmlsbDojNzE5N2I0O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDoxLjUiCiAgICAgICB4PSIyMC45MDYxMyIKICAgICAgIHk9IjI0LjA0ODM5NyIKICAgICAgIGlkPSJ0ZXh0NDI5OSI+PHRzcGFuCiAgICAgICAgIGlkPSJ0c3BhbjQyOTciCiAgICAgICAgIHN0eWxlPSJmaWxsOiM3MTk3YjQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjEuNSIKICAgICAgICAgeD0iMjAuOTA2MTMiCiAgICAgICAgIHk9IjI0LjA0ODM5NyI+Q2xvdWRBd2FyZTwvdHNwYW4+PC90ZXh0PjwvZz48ZwogICAgIGlkPSJsYXllcjEiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUxLjIzODUyLC0xMzkuMTYzNjYpIgogICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZSI+PHRleHQKICAgICAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgICAgICBzdHlsZT0iZm9udC1zaXplOjExLjI4ODlweDtmb250LWZhbWlseTonTm90byBTZXJpZiBHcmFudGhhJzstaW5rc2NhcGUtZm9udC1zcGVjaWZpY2F0aW9uOidOb3RvIFNlcmlmIEdyYW50aGEnO2ZpbGw6IzcxOTdiNDtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MS41IgogICAgICAgeD0iNjYuNzU0MTgxIgogICAgICAgeT0iMTgxLjE5NjIzIgogICAgICAgaWQ9InRleHQ3OTAiPjx0c3BhbgogICAgICAgICBpZD0idHNwYW43ODgiCiAgICAgICAgIHN0eWxlPSJmb250LXNpemU6MTEuMjg4OXB4O2ZpbGw6IzcxOTdiNDtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MS41IgogICAgICAgICB4PSI2Ni43NTQxODEiCiAgICAgICAgIHk9IjE4MS4xOTYyMyI+Q3liZXIgU2VjdXJpdHk8L3RzcGFuPjwvdGV4dD48ZwogICAgICAgaWQ9Imc3NTE0IgogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC41ODI5MjM2OSwwLDAsMC41MjYzMjQ1Miw0NC45NzY4MTYsMTM5LjkxMTgxKSIKICAgICAgIHN0eWxlPSJmaWxsOiNmODRlNDU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLW9wYWNpdHk6MC4yNTMyNjkiPjxwYXRoCiAgICAgICAgIGQ9Im0gMzQsMjMgaCAtMiB2IC00IGMgMCwtMy45IC0zLjEsLTcgLTcsLTcgLTMuOSwwIC03LDMuMSAtNyw3IHYgNCBoIC0yIHYgLTQgYyAwLC01IDQsLTkgOSwtOSA1LDAgOSw0IDksOSB6IgogICAgICAgICBpZD0icGF0aDc0OTYiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmODRlNDU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLW9wYWNpdHk6MC4yNTMyNjkiIC8+PHBhdGgKICAgICAgICAgZD0iTSAzMyw0MCBIIDE3IGMgLTEuNywwIC0zLC0xLjMgLTMsLTMgViAyNSBjIDAsLTEuNyAxLjMsLTMgMywtMyBoIDE2IGMgMS43LDAgMywxLjMgMywzIHYgMTIgYyAwLDEuNyAtMS4zLDMgLTMsMyB6IE0gMTcsMjQgYyAtMC42LDAgLTEsMC40IC0xLDEgdiAxMiBjIDAsMC42IDAuNCwxIDEsMSBoIDE2IGMgMC42LDAgMSwtMC40IDEsLTEgViAyNSBjIDAsLTAuNiAtMC40LC0xIC0xLC0xIHoiCiAgICAgICAgIGlkPSJwYXRoNzQ5OCIKICAgICAgICAgc3R5bGU9ImZpbGw6I2Y4NGU0NTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utb3BhY2l0eTowLjI1MzI2OSIgLz48Y2lyY2xlCiAgICAgICAgIGN4PSIyNSIKICAgICAgICAgY3k9IjI4IgogICAgICAgICByPSIyIgogICAgICAgICBpZD0iY2lyY2xlNzUwMCIKICAgICAgICAgc3R5bGU9ImZpbGw6I2Y4NGU0NTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utb3BhY2l0eTowLjI1MzI2OSIgLz48cGF0aAogICAgICAgICBkPSJtIDI1LjUsMjggaCAtMSBsIC0xLDYgaCAzIHoiCiAgICAgICAgIGlkPSJwYXRoNzUwMiIKICAgICAgICAgc3R5bGU9ImZpbGw6I2Y4NGU0NTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utb3BhY2l0eTowLjI1MzI2OSIgLz48L2c+PC9nPjxnCiAgICAgaWQ9ImczNDA0IgogICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMy43MDQxNjg3LC0zLjk5Mjg3MDMpIj48cGF0aAogICAgICAgc3R5bGU9ImRpc3BsYXk6aW5saW5lO2ZpbGw6bm9uZTtzdHJva2U6IzcxOTdiNDtzdHJva2Utd2lkdGg6MC42Mzk7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJtIDY4LjEzODkzOCwxMC40MzU5NzggLTAuMDA4LC01LjUwNDMxMDQgNDguMzQxOTUyLDAuMDA2IDAuMDEyNCwyNi4wMjQ0OTA0IC00OC4zNDQ4OTIsLTAuMDA3IC0wLjAwOCwtMy4xODc2IgogICAgICAgaWQ9InBhdGgxMDc4IiAvPjwvZz48L3N2Zz4K" /></div><p>security.txt generator</p><p>For sourcecode see <a href="https://github.com/gitaware/securitytxtgenerator">github</a></p><p>${APP_VERSION} (c)2025 <a href="https://cloudaware.eu">CloudAware.eu</a></p>`;
    const footercontent = `${APP_VERSION} (c)2025 <a href="https://cloudaware.eu">CloudAware.eu</a>`;
    document.getElementById('version').textContent = APP_VERSION;

    //splash.innerHTML = splashcontent;
    footer.innerHTML = footercontent.replace('white', '#666'); // Use darker color for footer link

    document.getElementById('keyFile').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const text = await file.text();
      document.getElementById('privateKey').value = text;
    });

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
    const encryptionInput = document.getElementById('encryption').value;
    const policyInput = document.getElementById('policy').value;
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

    let txt = '#Generated by https://github.com/gitaware/securitytxtgenerator\n\n';
    txt += `# If you would like to report a security issue, please contact us at:\n`;
    contacts.forEach(contact => {
      txt += `Contact: ${contact}\n`;
    });
    if (expires) txt += `Expires: ${expires}\n`;
    if (langs) txt += `Preferred-Languages: ${langs}\n`;
    canonicals.forEach(url => {
      txt += `Canonical: ${url}\n`;
    });
    if (encryptionInput) txt += `Encryption: ${encryptionInput}\n`;
    if (policyInput) txt += `Policy: ${policyInput}\n`;

    document.getElementById('securityOutput').value = txt;
  }

  function setFutureDate(years) {
    const future = new Date();
    future.setFullYear(future.getFullYear() + years);
    document.getElementById('expires').value = future.toISOString().slice(0, 16);
  }

  function validateSecurityTxtBeforeSigning() {
    const contacts = Array.from(document.querySelectorAll('#contactContainer input'))
      .map(input => input.value.trim())
      .filter(val => val !== '');
    const encryption = document.getElementById('encryption').value.trim();
    const expires = document.getElementById('expires').value;

    const errors = [];

    // 1. If any email contact, require encryption
    const hasEmail = contacts.some(c => c.startsWith('mailto:'));
    if (hasEmail && !encryption) {
      errors.push("<li>If a <code>mailto:</code> contact is provided, an <code>Encryption</code> field must also be included.</li>");
    }

    // 2. Expires must not be more than 1 year in the future
    if (expires) {
      const expiryDate = new Date(expires);
      const now = new Date();
      const maxDate = new Date(now);
      maxDate.setFullYear(now.getFullYear() + 1);

      if (expiryDate > maxDate) {
        errors.push("<li><code>Expires</code> may not be more than one year into the future.</li>");
      }
    }

    if (errors.length > 0) {
      document.getElementById('helpModalTitle').textContent = "Signing Blocked";
      document.getElementById('helpModalBody').innerHTML = `
        <p>The following issue(s) must be fixed before signing:</p>
        <ul>${errors.join('')}</ul>
      `;
      document.getElementById('helpModal').style.display = 'block';
      return false;
    }

    return true;
  }

  async function signSecurityTxt() {
    if (!validateSecurityTxtBeforeSigning()) {
      return;
    }
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

      // Download encrypted private key
      const keyBlob = new Blob([encryptedKey.armor()], { type: 'text/plain' });
      const keyUrl = URL.createObjectURL(keyBlob);
      const aKey = document.createElement('a');
      aKey.href = keyUrl;
      aKey.download = 'private-key-encrypted.asc';
      aKey.click();
      URL.revokeObjectURL(keyUrl);

      // Download passphrase as separate file
      const passBlob = new Blob([passphrase], { type: 'text/plain' });
      const passUrl = URL.createObjectURL(passBlob);
      const aPass = document.createElement('a');
      aPass.href = passUrl;
      aPass.download = 'private-key-passphrase.asc';
      aPass.click();
      URL.revokeObjectURL(passUrl);

      // Export public key
      const publicKey = await openpgp.readKey({ armoredKey: privateKey.toPublic().armor() });
      const publicArmored = publicKey.armor();
      const pubBlob = new Blob([publicArmored], { type: 'text/plain' });
      const pubUrl = URL.createObjectURL(pubBlob);
      const aPub = document.createElement('a');
      aPub.href = pubUrl;
      aPub.download = 'pgp_pub.asc';
      aPub.click();
      URL.revokeObjectURL(pubUrl);

      // Show confirmation in helpModal
      document.getElementById('helpModalTitle').textContent = "Download Complete";
      document.getElementById('helpModalBody').innerHTML = `
        <p>The following files have been downloaded:</p>
        <ul>
          <li><code>private-key-encrypted.asc</code> – your encrypted PGP private key</li>
          <li><code>private-key-passphrase.asc</code> – the passphrase needed to unlock it</li>
          <li><code>pgp_pub.asc</code> – the matching public key</li>
        </ul>
        <p><strong>Important:</strong> Store both files in a safe and secure location. Do not share them publicly.</p>
        <p>If you do not already have a PGP key published for the email address used in your <code>Contact</code> field, you should upload <em>pgp_pub.asc</em> to your webserver at the location specified in the <code>Encryption</code> field.</p>
      `;
      document.getElementById('helpModal').style.display = 'block';
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
