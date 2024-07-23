const cssx = (event) => {
  const { target, target:  { dataset } } = event
  if (dataset?.cssx === undefined) return
  console.log(dataset.cssx)
  const vars = dataset.cssx.split('|')
  if (!vars) return
  vars.map((e) => {

    const { groups: { on, props, attrs } } = e.match(/^(?<event>\w*)(->(?<attrs>.*))?(=>(?<props>.*))?$/)
    attrs?.split(',').map(p => {
      const [name, isString] = p.split('+')
      const methods = name.split('.')
      let value = event
      methods.map(m => value = value[m])

      if (isString !== undefined) document.documentElement.style.setProperty(`--${target.id}--${name.replace('.', '_')}_2S`, JSON.stringify(value+''))
      document.documentElement.style.setProperty(`--${target.id}--${name.replace('.', '_')}`, value)
    })
  })
}

document.addEventListener('input', cssx)
document.addEventListener('mousemove', cssx)
document.addEventListener('click', cssx)
document.addEventListener('mouseenter', cssx)

const events = [
    "DOMContentLoaded", // Fired when the initial HTML document has been completely loaded and parsed
    "readystatechange", // Fired when the ready state of the document changes
    "load", // Fired when the whole page has loaded, including all dependent resources
    "beforeunload", // Fired when the window, the document and its resources are about to be unloaded
    "unload", // Fired when the document or a resource is being unloaded
    "abort", // Fired when the loading of a resource has been aborted
    "error", // Fired when an error occurs while loading an external file
    "resize", // Fired when the document view (window) has been resized
    "scroll", // Fired when the document view or an element has been scrolled
    "focus", // Fired when the document or an element gains focus
    "blur", // Fired when the document or an element loses focus
    "click", // Fired when a mouse click occurs on the document or an element
    "dblclick", // Fired when a mouse double-click occurs on the document or an element
    "mousedown", // Fired when a mouse button is pressed on the document or an element
    "mouseup", // Fired when a mouse button is released on the document or an element
    "mousemove", // Fired when the mouse pointer is moved over the document or an element
    "mouseover", // Fired when the mouse pointer is moved onto an element
    "mouseout", // Fired when the mouse pointer is moved out of an element
    "keypress", // Fired when a key is pressed down and released
    "keydown", // Fired when a key is pressed down
    "keyup", // Fired when a key is released
    "touchstart", // Fired when a touch point is placed on the touch surface
    "touchmove", // Fired when a touch point is moved along the touch surface
    "touchend", // Fired when a touch point is removed from the touch surface
    "touchcancel" // Fired when a touch point has been disrupted in some way
];

events.forEach(e => document.addEventListener(e, cssx))
