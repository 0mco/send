const html = require('choo/html');

module.exports = function(selected, options, translate, changed) {
  let x = selected;

  return html`
    <select class="appearance-none cursor-pointer border rounded-sm bg-blue-lightest p-1" onchange=${choose}>
      ${options.map(
        i =>
          html`<option value="${i}" ${
            i === selected ? 'selected' : ''
          }>${translate(i)}</option>`
      )}
    </select>`;

  function choose(event) {
    const target = event.target;
    const value = +target.value;

    if (x !== value) {
      x = value;
      changed(value);
    }
  }
};