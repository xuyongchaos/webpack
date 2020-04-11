const marked = require('marked')

const renderer = new marked.Renderer()

renderer.heading = function(text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')

  return `
          <h${level}>
            <a name="${escapedText}" class="anchor" href="#${escapedText}">
              <span class="header-link"></span>
            </a>
            ${text}
          </h${level}>`
}

// Run marked
renderer.hr('## ----- ###')
console.log(marked('# heading++ \n- a', { renderer: renderer }))
