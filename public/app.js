// hit verify route when user lands on page
fetch('/api/v1/auth/verify')
  // check if user is loggged in
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Not logged in');
  })
  .then(user => {
    // user logged in
    renderIsLoggedIn(user);
  })
  .catch(() => {
    // not logged in
    const button = document.createElement('button');
    button.textContent = 'Login using GitHub';

    button.addEventListener('click', () => {
      // redirect
      window.location.assign('/api/v1/auth/login');
    });
    const rootDisplay = document.getElementById('root');
    rootDisplay.appendChild(button);
  });

const renderIsLoggedIn = (user) => {
  const rootDisplay = document.getElementById('root');

  // create display name p
  const p = document.createElement('p');
  p.textContent = user.username;
  rootDisplay.appendChild(p);

  // create form for user to add a tweet
  const form = document.createElement('form');
  const textarea = document.createElement('textarea');

  // text area name - used in fd.get('text area name which is text')
  textarea.name = 'text';

  const button = document.createElement('button');
  button.textContent = 'Add Message';

  button.textContent = 'Create Tweet';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const text = fd.get('text');

    fetch('/api/v1/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, username: 'test_user_1' })
    });
  });

  form.appendChild(textarea);
  form.appendChild(button);

  // append form to the root
  rootDisplay.appendChild(form);
};
