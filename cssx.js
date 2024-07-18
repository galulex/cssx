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
